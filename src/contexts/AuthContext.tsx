import { createContext, useState, useEffect, useCallback } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";



type FormData = {
    email: string
    password: string
}

type FormDataRegister = {
    email: string
    password: string
    username: string
}

type User = {
    id: number
    email: string
    username: string
}

type authContextType = {
    isAuthenticated: boolean
    user: User | null
    signIn: (data: FormData) => Promise<void>
    registerAccount: (data: FormDataRegister) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as authContextType)

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'joysystem.token': token } = parseCookies()

        if(token) {
            fetch('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
            }).then((response) => response.json())
            .then((userData) => setUser(userData))
            .catch((error) => {
                console.error('Error during user data', error)
            })
        }
    }, [])

    const navigate = useNavigate()

    const signIn = async ({ email, password }: FormData) => {
        const url = 'http://localhost:3000/users/login'
 
        try {
            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
    
            if(!request.ok) {
                const error = await request.json()
                throw new Error(error.message || "Invalid email or password")
            }
    
            const response = await request.json()
    
            setCookie(response, 'joysystem.token', response.token, {
                maxAge: 60 * 60 * 1 // 1h
            })
    
            setUser(response.user)
    
            navigate("/")
    
        } catch (error: any) {
            console.error('Something went wrong on sign up', error)
            throw error;
        }
    }

    const registerAccount = async ({ email, password, username }: FormDataRegister) => {
        const url = 'http://localhost:3000/users/'

        try {
            const request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username })
            })
    
            if(!request.ok) {
                const error = await request.json()
                throw new Error(error)
            }
    
            const response = await request.json()
    
            setCookie(response, 'joysystem.token', response.token, {
                maxAge: 60 * 60 * 1 // 1h
            })
    
            setUser(response.user)
    
            navigate("/login")
    
        } catch (error: any) {
            console.error('Error on sign up', error)
        }
    }

    const signOut = useCallback(() => {
        destroyCookie(null, 'joysystem.token')
        setUser(null)

        window.location.reload()
    }, [])


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, registerAccount, signOut }}>
            { children }
        </AuthContext.Provider>
    )
}