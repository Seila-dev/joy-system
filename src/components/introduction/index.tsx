import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../../contexts/AuthContext"
import { DateTime } from "luxon"


export const Introduction = () => {
    const { user, isAuthenticated } = useContext(AuthContext)

    const formattedDate = DateTime.now()
        .setLocale('pt-BR')
        .toLocaleString({ weekday: 'long', day: 'numeric', month: 'long' });

    const quickStarters = [
        {
            id: 1,
            title: "Gestão de hábitos",
            description: "Comece um novo hábito",
            icon: "person",
            link: "habits",
            background: "#1B4332", // Verde escuro
            color: "#D8F3DC",       // Verde claro suave
            new: true
        },
        {
            id: 2,
            title: "Painel de tarefas",
            description: "Crie seu próximo desafio!",
            icon: "stack",
            link: "quests",
            background: "#5C2A2A", // Vermelho escuro terroso
            color: "#FAD2D2",       // Rosa claro neutro
            new: false
        },
        {
            id: 3,
            title: "Anotações",
            description: "Algo em mente? Anote aqui!",
            icon: "edit_square",
            link: "notes",
            background: "#1A2A40", // Azul escuro profundo
            color: "#D0E7FF",       // Azul claro suave
            new: false
        },
        {
            id: 4,
            title: "Loja",
            description: "Defina uma recompensa para suas conquistas",
            icon: "workspace_premium",
            link: "store",
            background: "#5C2A2A", // Vermelho escuro terroso
            color: "#FAD2D2",        // Azul claro suave
            new: false
        },
        {
            id: 5,
            title: "Calendário",
            description: "Coloque seus planos em dia",
            icon: "calendar_today",
            link: "notes",
            background: "#1A2A40", // Azul escuro profundo
            color: "#D0E7FF",       // Azul claro suave
            new: false
        }
    ];


    return (
        <Section>
            <div className="greetings">
                <h1 className="paragraph">Olá, {user?.username ? user?.username : "seja bem vindo"}!</h1>
                <span className="lowOpacity afterParagraph">{formattedDate}</span>
                {user ? (
                    <>
                        <h2 className="paragraph h2">O que você quer <span className="secondary">aprender</span> hoje?</h2>
                        <span className="lowOpacity afterParagraph">Invista em você para alcançar seus objetivos dia após dia</span>
                    </>
                ) : (
                    <div className="ctaSection">
                        <p>Para usar o site, é necessário fazer login</p>
                        <Link to="/login" className="btn noCta">Fazer login</Link>
                    </div>
                )}
            </div>
            {isAuthenticated && (
                <QuickStart>
                    <Title>Começo rápido</Title>
                    <Description className="description"><strong>Escolha</strong> o que deseja fazer primeiro. Temos diversos tipos de <strong>organização</strong> para você melhorar sua <strong>produtividade</strong>.</Description>
                    <GridContainer>
                        {quickStarters.map((starter) => (

                            <QuickStartItem to={starter.link} key={starter.id} $iconBg={starter.background} $iconColor={starter.color}>
                                <span className="material-symbols-outlined icon" >
                                    {starter.icon}
                                </span>
                                <ItemContent>
                                    <SubTitle>
                                        {starter.title}
                                        {starter.new && <span className="new green">New</span>}
                                    </SubTitle>

                                    <SubDescription>{starter.description}</SubDescription>
                                </ItemContent>
                            </QuickStartItem>

                        ))}
                    </GridContainer>
                </QuickStart>
            )}
        </Section>
    )
}

const QuickStart = styled.section`
    display: flex;
    flex-direction: column;
    grid: 10px;
`

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media(max-width: 768px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 540px){
        
    }
`

const Title = styled.h2`
    font-weight: 500;
    margin-bottom: 10px;
`

const Description = styled.p`
    opacity: 0.8;
    margin-bottom: 20px;
`

const QuickStartItem = styled(Link) <{ $iconBg: string, $iconColor: string }>`
    background: #224;
    padding: 20px;
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    display: flex;
    transition: 0.15s ease-out;
    height: 100%;

    span.icon{
        padding: 10px;
        background: ${props => props.$iconBg};
        margin-right: 15px;
        border-radius: 5px;
        color: ${props => props.$iconColor};
    }
    span.new{
        margin-left: 5px;
        padding: 4px;
        margin: 10px;
        border-radius: 5px;
        font-size: 10px;
        background: var(--greenText);
    }

    &:hover{
        transform: scale(1.02);
        background: #229;
    }

    @media(max-width: 768px){
        width: 100%;
        padding: 10px;
        align-items: center;
        margin: 0;
    }

    @media(max-width: 590px){
        flex-direction: column;
        padding: 30px;
        text-align: center;
        gap: 15px;
        padding: 15px 10px;

        span.icon{
            margin: 0;
            font-size: 15px;
        }
        span.new{
            margin: 2px;
            font-size: 10px;
        }
    }
`

const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const SubTitle = styled.h3`
    margin-bottom: 5px;

    @media(max-width: 590px){
        flex-direction: column;
        display: flex;
        align-items: center;
        gap: 5px;

        span.new{
            width: fit-content;
        }
    }
`

const SubDescription = styled.p`
    color: #b2b2b2;
    font-size: 14px;

    @media(max-width: 590px){
        font-size: 12px;
    }
`

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: transparent;
    color: #e0e4ff;
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
        margin: 10px 0;
        background: var(--tertiary);
    }
    .greetings .btn.noCta{
        background: transparent;
        margin-left: 10px;
        border: 1px solid var(--tertiary);
        transition: 0.15s ease-out;
        &:hover{
            background: var(--tertiary);
        }
    }
    .greetings .ctaSection{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .highlightedQuests{
        display: flex;
        width: 100%;
        //margin: 0 20px;
        margin-top: 10px;
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