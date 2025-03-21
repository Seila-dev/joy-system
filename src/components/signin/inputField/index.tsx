import { FieldError } from "react-hook-form"

interface InputProps{
    type: string
    name: string
    placeholder: string
    label: string
    register: any
    error?: FieldError
}

export const InputField = ({ type, name, placeholder, label, register, error}: InputProps) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input 
            type={type} 
            id={name}
            placeholder={placeholder}
            {...register(name)}
            />
            {error && <p className="error">{error.message}</p>}
        </>
    )
}