import styled from "styled-components"
import Joyce from '../../assets/joyce-hello.jpeg'
import { useState } from "react"

export const JoyceInteractionSignup = () => {
    const [activeInteraction, setActiveInteraction] = useState<boolean>(true)

    const toggleActive = () => {
        setActiveInteraction(!activeInteraction)
    }

    return (
        <>
            {activeInteraction && <Overlay />}
            <JoyceComponent>
                <div className="joyceImage">
                        <img src={Joyce} alt="joyce imagem" className="joyce" />
                  
                    <div className="dialog">
                        <div className="joyceDialog">
                            <p>Antes de cadastrar sua conta, um segundo! Eu sou o Joyce, o mascote do Joy System! Prazer!</p>
                        </div>

                        <div className="borderDiv"><img src="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/d19d8e1b8c087398958b9475ee6101cb.svg" alt="teste" className="borderBottom" /></div>
                    </div>
                </div>
                <Confirm>
                    <button>Próximo</button>
                </Confirm>
            </JoyceComponent>
        </>
    )
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); 
    z-index: 4; 
    pointer-events: all; 
`

const JoyceComponent = styled.div`
    display: flex;
    z-index: 5;
    position: fixed;
    left: 10vw;
    top: 5vh;
    margin: 20px;
    animation-name: slideInLeft;

    .joyceImage{
        display: flex;
        flex-direction: row;
    }
    .joyceImage .imagesContainer{
        position: relative;
    }
    .joyceImage .joyce{
        width: 200px;
        animation: slideInLeft 1s ease-out, downUp 4s ease-in-out 2s infinite;
        /* animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-duration: 1s;
        animation-name: downUp;
        animation-timing-function: ease-in-out;
        animation-delay: 2s;
        animation-iteration-count: infinite;
        animation-duration: 1.5s; */
    }
    .joyceImage .dialog .joyceDialog{

    }
    .joyceImage .dialog .joyceDialog p{
    }

    @keyframes typing {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    .joyceImage .dialog{
        background: var(--color-snow);
        border: 4px solid #37464f;
        padding: 15px;
        color: white;
        border-radius: 10px;
        animation-name: slideInLeft;
        animation-timing-function: ease-in-out;
        animation-duration: 1.5s;
        position: relative;
        bottom: 30px;
        left: 20px;
       
        height: fit-content;
    }
    .borderDiv{
        position: absolute;
        left: 0;
        bottom: 10px;
        transform: translate(-100%, 20%);
    }
    .borderDiv img{
        width: 30px;
    }
`

const Confirm = styled.div`
    display: flex;
    animation-name: slideInRight;
    animation-duration: 2s;
    z-index: 5;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 50px;
    button{
        padding: 20px 100px;
        width: 100%;
        cursor: pointer;
        border: none;
        background-color: greenyellow;
        border-radius: 20px;
        font-weight: 700;
        font-size: 18px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    }
`