import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --primary: #101320;
        --secondary: rgb(155 135 245);
        --secondary-hover: #ffb938;
        --tertiary: rgb(51 195 240);
        --background: #09090b;
        --color-snow: #131F24;
        --light-background: #1a1a1a;
        --input-background: #09090b;
        --yellow: #FFCE32;
        --blue: #1D63FF;
        --description-fontsize: 14px;
        --description-opacity: 0.6;
        --h3-desktop-fontsize: 18px;
        --h2-desktop-fontsize: 25px;
        --h2-tablet-fontsize: 20px;
        --h2-mobile-fontsize: 15px; 
        --h1-desktop-fontsize: 38px;
        --h1-tablet-fontsize: 30px;
        --h1-mobile-fontsize: 20px; 
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
    }
    a{
        color: black;
    }

    body{
        font-family: "Inter", sans-serif;
        overflow-x: hidden;
        max-width: 100vw;
    }

    textarea, input{
        font-family: "Inter", sans-serif;
    }

    h1{
        font-size: var(--h1-desktop-fontsize);
        @media(max-width: 768px){
            font-size: var(--h1-tablet-fontsize);
        }
        @media(max-width: 450px){
            font-size: var(--h1-mobile-fontsize);
        }
    }

    h2{
        font-size: var(--h2-desktop-fontsize);
        @media(max-width: 768px){
            font-size: var(--h2-tablet-fontsize);
        }
        @media(max-width: 450px){
            font-size: var(--h2-mobile-fontsize);
        }
    }
    
    h3{
        font-size: var(--h3-desktop-fontsize);
    }
    
    p.description{
        font-size: var(--description-fontsize);
        opacity: var(--description-opacity);
    }
    span.secondary{
        color: var(--secondary);
    }
    .error{
        color: red;
        text-align: start;
        font-size: 10px;
    }
    .highlightSpan{
        padding: 5px;
        background: var(--secondary);
        color: black;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-300px)
        }

        to {
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(300px)
        }

        to {
            transform: translateX(0);
        }
    }

    @keyframes downUp {
        0% {
            transform: translateY(0)
        }
        50% {
            transform: translateY(-5px)
        }
        100% {
            transform: translateY(0)
        }
    }
`