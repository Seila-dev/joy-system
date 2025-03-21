import { Link } from "react-router-dom"
import styled from "styled-components"


export const Introduction = () => {

    return (
        <Section>
            <div className="greetings">
                <h2 className="paragraph">Olá, Erick! <br /> O que você quer <span className="yellow">aprender</span> hoje?</h2>
                <span className="lowOpacity afterParagraph">Invista em você para alcançar seus objetivos dia após dia</span>    
                <div className="ctaSection">
                    <Link to="/quests" className="btn cta">Ir para sistema de Quests</Link>
                    <Link to="/quests" className="btn noCta">Ir para anotações</Link>
                </div>
            </div>   
            <div className="highlightedQuests">
                <h2 className="paragraph">Sugestões para você</h2>
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
    margin-bottom: 20px;
    background: var(--background);
    color: white;
    width: 100%;
    min-height: 400px;
    padding: 80px 0 0 50px;

    .lowOpacity{
        opacity: 0.7;
    }

    span.yellow{
        color: #f2d04c;
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
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 10px;
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
        margin-top: 30px;
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
        margin: 0 20px;
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
        .greetings .paragraph{
            font-size: 30px;
        }
        .greetings .afterParagraph{
            font-size: 13px;
        }
        .greetings .btn{
            padding: 10px;
            font-size: 10px;
        }
        .highlightedQuests .paragraph{
            font-size: 18px;
        }
    }
    @media(max-width: 450px){
        padding: 20px;
        .greetings .paragraph{
            font-size: 20px;
        }
        .greetings .afterParagraph{
            font-size: 10px;
        }
        .highlightedQuests .paragraph{
            font-size: 14px;
        }
        .highlightedQuests .item-list .item .title{
            font-size: 14px;
        }
    }
`