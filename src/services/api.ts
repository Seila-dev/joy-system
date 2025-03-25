import axios from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: "http://localhost:3000/"
})

const { 'joysystem.token': token } = parseCookies()

if (token) {
    fetch('http://localhost:3000/users', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
}

export default api