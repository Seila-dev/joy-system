import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../../contexts/AuthContext"
import { DateTime } from "luxon"


export const Introduction = () => {
    const { user } = useContext(AuthContext)

    const formattedDate = DateTime.now()
  .setLocale('pt-BR')  // Set locale to Brazilian Portuguese
  .toLocaleString({ weekday: 'long', day: 'numeric', month: 'long' });


    return (
        <Section >
            <div className="greetings">
                <h1 className="paragraph">Olá, {user?.username ? user?.username : "seja bem vindo"}!</h1>
                <span className="lowOpacity afterParagraph">{formattedDate}</span>    
                <h2 className="paragraph h2">O que você quer <span className="secondary">aprender</span> hoje?</h2>
                <span className="lowOpacity afterParagraph">Invista em você para alcançar seus objetivos dia após dia</span>
                <div className="ctaSection">
                    <Link to="/quests" className="btn cta">Ir para sistema de Quests</Link>
                    <Link to="/notes" className="btn noCta">Ir para anotações</Link>
                </div>
            </div>   
            <div className="highlightedQuests">
                <h2 className="paragraph">Sugestões para você (In Dev.)</h2>
                <div className="item-list">
                    <div className="item">
                        <div className="image-prompt flexContainer">
                            <h3 className="logo">🚀</h3>
                        </div>
                        <h3 className="title">Data Research</h3>
                        <span className="lowOpacity madeby">Estudos</span>
                    </div>
                    <div className="item">
                        <div className="image-prompt flexContainer">
                            <h3 className="logo">🏋️‍♂️</h3>
                        </div>
                        <h3 className="title">Academia</h3>
                        <span className="lowOpacity madeby">Esportes</span>
                    </div>
                </div>
            </div>     
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: transparent;
    color: white;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;
    max-width: 1200px;
    padding: 30px 0 0 50px;

    .lowOpacity{
        opacity: 0.7;
    }
    .afterParagraph{
        margin-bottom: 30px;    
        font-weight: 300;
    }

    span.secondary{
        color: var(--secondary);
    }
    .flexContainer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .greetings{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .greetings .paragraph{
        font-weight: 600;
        margin-bottom: 10px;
    }
    .greetings .paragraph.h2{
        font-weight: 400;
    }
    .greetings .btn{
        padding: 12px 20px;
        font-size: 0.8rem;
        border: none;
        border-radius: 5px;
        width: fit-content;
        color: white;
        font-weight: 700;
        cursor: pointer;
        margin-top: 5px;
        background: var(--tertiary);
    }
    .greetings .btn.noCta{
        background: transparent;
        border: 1px solid var(--tertiary);
        transition: 0.15s ease-out;
        &:hover{
            background: var(--tertiary);
        }
    }
    .greetings .ctaSection{
        display: flex;
        gap: 20px;
    }
    .highlightedQuests{
        display: flex;
        width: 100%;
        //margin: 0 20px;
        margin-top: 30px;
        flex-direction: column;
    }
    .highlightedQuests .item-list{
        width: 100%;
        display: flex;
        min-height: 100%;
    }
    .highlightedQuests .item{
        height: 100%;
        min-height: 150px;
        width: 100%;
        max-width: 150px;
        margin: 30px 10px 0 0;
        padding: 10px;
        border-radius: 5px;
        background: transparent;
        color: white;
        border: 1px solid var(--secondary);
        cursor: pointer;
        transition: 0.25s ease-out;
        &:hover{
            background: var(--secondary);
            color: black;
        }
    }
    .highlightedQuests .item .image-prompt{
        height: 50%;
        background: #ccc;
        opacity: 0.5;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
        transition: 0.15s ease-out;
    }
    .highlightedQuests .item:hover .image-prompt{
        opacity: 1;
    }
    .highlightedQuests .item .image-prompt .logo{
        font-size: 30px;
    }
    .highlightedQuests .item .title{
        font-size: 16px;
    }
    .highlightedQuests .item span.madeby{
        font-size: 12px;
    }

    @media(max-width: 768px){
        display: flex;
        flex-direction: column;
        padding: 50px;
        .highlightedQuests{
            margin: 40px 0;
        }
        .greetings .btn{
            padding: 10px;
            font-size: 10px;
        }
        
    }
    @media(max-width: 450px){
        padding: 20px;
        
        .greetings .afterParagraph{
            font-size: 10px;
        }
    }
`