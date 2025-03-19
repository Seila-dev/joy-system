import styled from "styled-components"


export const Introduction = () => {

    return (
        <Section>
            <div className="greetings">
                <h2 className="paragraph">Olá, nomeDaPessoa! <br /> O que você quer <span className="yellow">aprender</span> hoje?</h2>
                <span className="lowOpacity afterParagraph">Invista em você para alcançar seus objetivos dia após dia</span>    
            </div>   
            <div className="highlightedQuests">
                <div className="item">
                    <div className="image-prompt flexContainer">
                        <h3 className="logo">🚀</h3>
                    </div>
                    <h3 className="title">Data Research</h3>
                    <span className="lowOpacity madeby">Erick Rodrigues</span>
                </div>
                <div className="item">
                    <div className="image-prompt flexContainer">
                        <h3 className="logo">🏋️‍♂️</h3>
                    </div>
                    <h3 className="title">Academia</h3>
                    <span className="lowOpacity madeby">Erick Rodrigues</span>
                </div>
            </div>     
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    }
    .greetings .paragraph{
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .highlightedQuests{
        display: flex;
        max-height: 200px;
        width: 100%;
        justify-content: flex-end;
    }
    .highlightedQuests .item{
        height: 100%;
        width: 100%;
        max-width: 250px;
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        background: #ccc6;
        cursor: pointer;
        transition: 0.15s ease-out;
        &:hover{
            background: #b3b3b3;
        }
    }
    .highlightedQuests .item .image-prompt{
        height: 50%;
        background: #ccc;
        opacity: 0.5;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
    }
    .highlightedQuests .item .image-prompt .logo{
        font-size: 50px;
    }
    .highlightedQuests .item .title{
        font-size: 16px;
    }
    .highlightedQuests .item span.madeby{
        font-size: 12px;
    }
`