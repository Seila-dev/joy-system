import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
        --secondary: #f2d04c;
        --secondary-hover: #ffb938;
        --tertiary: #6a93f8;
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
    }
`