import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --primary: #101320;
        --secondary: rgb(155 135 245);
        --secondary-hover: #9b87f533;
        --tertiary: rgb(51 195 240);
        --tertiary-hover: #33c3f033;
        --background: #09090b;
        --color-snow: #131F24;
        --light-background: #1a1a1a;
        --input-background: #09090b;
        --yellow: #FFCE32;
        --blue: #1D63FF;
        --greenText: rgb(34 197 94);
        --greenBg: #22c55e33;
        --red: rgb(220 38 38);
        --yellowText: rgb(234 179 8);
        --yellowBg: #eab30833;
        --description-fontsize: 14px;
        --description-opacity: 0.6;
        --h3-desktop-fontsize: 16px;
        --h2-desktop-fontsize: 20px;
        --h2-tablet-fontsize: 16px;
        --h2-mobile-fontsize: 14px; 
        --h1-desktop-fontsize: 25px;
        --h1-tablet-fontsize: 20px;
        --h1-mobile-fontsize: 18px; 
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
    }
    a{
        color: white;
    }

    body{
        font-family: "Inter", sans-serif; 
        background: linear-gradient(to right top, #000, #00043a);
        overflow-x: hidden;
        max-width: 100vw;
        min-height: 100vh;
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
        font-weight: 400;
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
            transform: translateX(-2%);
            opacity: 0;
        }

        to {
            transform: translateX(0);
            opacity: 1;
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