import { Link } from "react-router-dom"
import { InputField } from "../inputField"
import { SubmitButton } from "../submitButton"
import styled from "styled-components"
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"

interface formTypeProps {
    formType: string
}

const signUpUserFormSchema = z.object({
    username: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("Email Inválido").nonempty("Email é obrigatório"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").nonempty("Senha é obrigatória")
})

const signInUserFormSchema = z.object({
    username: z.string(),
    email: z.string().email("Email Inválido").nonempty("Email é obrigatório"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres").nonempty("Senha é obrigatória")
})

type signInUserFormData = z.infer<typeof signInUserFormSchema>;
type signUpUserFormData = z.infer<typeof signUpUserFormSchema>;

export const AuthForm = ({ formType }: formTypeProps) => {
    const schema = formType === "login" ? signUpUserFormSchema : signInUserFormSchema 

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    const { signIn, registerAccount, isAuthenticated } = useContext(AuthContext)

    async function a(){
        console.log(isAuthenticated)
    }
    a()

    const onSubmit: SubmitHandler<signInUserFormData | signUpUserFormData> = async (data) => {
        try {
            if (formType === "login") {
                console.log('problem')
                console.log(data)
                await signIn(data as signInUserFormData);
            } else {
                console.log("need help")
                await registerAccount(data);
            }
        } catch (error: any) {
            console.error("erro ao submit", error.message)
        }
    };

    return (
        <SignInComponent>
            <div className="flexContainer">
                <h1 className="title"><span className="secondary">Joy</span>{formType === "login" ? "Login" : "Cadastro"}</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {formType === "register" && (
                        <InputField 
                            type="text"
                            name="username"  // Alteração aqui: nome do campo foi alterado de "name" para "username"
                            placeholder="Seu nome"
                            label="Nome"
                            error={errors.username}  // Usando o campo correto de erro
                            register={register}
                        />
                    )}
                    <InputField
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        label="Email"
                        error={errors.email}
                        register={register}
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="******"
                        label="Senha"
                        error={errors.password}
                        register={register}
                    />
                    <SubmitButton
                        text={formType === "login" ? "Entrar" : "Cadastrar"}
                        icon={formType === "login" ? "login" : "person_add"}
                        disabled={isSubmitting}
                    />
                </form>
                <p className="divisor">ou</p>
                <p className="bottomText">
                    {formType === "login" ? (
                        <>
                            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                        </>
                    ) : (
                        <>
                            Já tem uma conta? <Link to="/login">Entrar</Link>
                        </>
                    )}
                </p>
            </div>
        </SignInComponent>
    )
}

const SignInComponent = styled.main`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    .flexContainer{
        display: flex;
        max-width: 500px;
        margin: 20px;
        width: 100%;
        flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
        background: white;
        padding: 30px;
        color: black;
        text-align: center;
        border-radius: 10px;
        border-top: 10px solid var(--secondary);
    }
    .flexContainer .title{
        margin: 20px 0;
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 30px;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    form label{
        margin-top: 15px;
        width: 100%;
        text-align: start;
    }
    form input{
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 5px;
    }
    form button{
        margin: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        border: none;
        gap: 5px;
        background: var(--secondary);
        border-radius: 5px;
        cursor: pointer;
    }
    .flexContainer .divisor{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
    }
    .flexContainer .divisor::before, .flexContainer .divisor::after{
        content: "";
        height: 0;
        width: 50%;
        border: 1px solid #ccc;
    }
    .flexContainer .bottomText{
        font-size: 14px;
    }
    .flexContainer .bottomText a{
        color: var(--tertiary);
        font-weight: 700;
    }
`
