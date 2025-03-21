import { AuthForm } from "./authForm";

export const SignIn = () => {

    return (
        // <SignInComponent>
        //     <div className="flexContainer">
        //         <h1 className="title"><span className="secondary">Joy</span>Login</h1>

        //         <form>
        //             <label htmlFor="email">Email</label>
        //             <input
        //                 type="email"
        //                 name="email"
        //                 id="email"
        //                 placeholder="seu@email.com"
        //             />
        //             <label htmlFor="password">Senha</label>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 id="password"
        //                 placeholder="******"
        //             />
        //             <button type="submit"><span className="material-symbols-outlined icon">login</span>Entrar</button>
        //         </form>
        //         <p className="divisor">ou</p>
        //         <p className="bottomText">Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
        //     </div>

        // </SignInComponent>
        <AuthForm formType="login" />
    )
}

// const SignInComponent = styled.main`
//     width: 100%;
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: #f2f2f2;
//     .flexContainer{
//         display: flex;
//         max-width: 500px;
//         margin: 20px;
//         width: 100%;
//         flex-direction: column;
//         box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
//         background: white;
//         padding: 30px;
//         color: black;
//         text-align: center;
//         border-radius: 10px;
//         border-top: 10px solid var(--secondary);
//     }
//     .flexContainer .title{
//         margin: 20px 0;
//         display: flex;
//         justify-content: center;
//         width: 100%;
//         font-size: 30px;
//     }
//     form{
//         display: flex;
//         flex-direction: column;
//     }
//     form label{
//         margin-top: 15px;
//         width: 100%;
//         text-align: start;
//     }
//     form input{
//         padding: 10px;
//         margin: 5px 0;
//         border: 1px solid #ccc;
//         outline: none;
//         border-radius: 5px;
//     }
//     form button{
//         margin: 30px 0;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: 8px;
//         border: none;
//         gap: 5px;
//         background: var(--secondary);
//         border-radius: 5px;
//         cursor: pointer;
//     }
//     .flexContainer .divisor{
//         display: flex;
//         align-items: center;
//         gap: 10px;
//         margin-bottom: 30px;
//     }
//     .flexContainer .divisor::before, .flexContainer .divisor::after{
//         content: "";
//         height: 0;
//         width: 50%;
//         border: 1px solid #ccc;
//     }
//     .flexContainer .bottomText{
//         font-size: 14px;
//     }
//     .flexContainer .bottomText a{
//         color: var(--tertiary);
//         font-weight: 700;
//     }
// `