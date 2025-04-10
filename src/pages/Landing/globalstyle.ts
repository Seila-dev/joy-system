import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }
  
  section {
    padding: 80px 0;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      padding: 60px 0;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      padding: 40px 0;
    }
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;