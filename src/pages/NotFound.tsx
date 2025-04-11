import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";

export const NotFound = () =>  {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Element>
      <h1>404 - Page Not Found</h1>
      <p>A Página que você está procurando não existe.</p>
      { isAuthenticated ? (
        <Link to="/dashboard">Voltar para dashboard</Link>
      ) : (
        <Link to="/">Voltar para página principal</Link>
      )}
      
    </Element>
  );
}

const Element = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    
    h1 {
        color: white;
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    p {
        font-size: 1.5rem;
        color: #666;
        margin-bottom: 2rem;
    }

    a{
        color: black;
        text-decoration: none;
        font-size: 1rem;
        padding: 15px 30px;
        border-radius: 5px;
        background-color: var(--tertiary);
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #0090a3;
        }
    }

`