import { Link } from "react-router-dom";
import styled from "styled-components"

export const Notes = () => {
    const truncateDescription = (text: string, limit: number) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    }

    return (
        <NotesComponent>
            <div className="header">
                <h2>Notas recentes</h2>

                <div className="flexContainer">
                    <Link to="/quests" className="btn viewAllBtn">
                        <span className="material-symbols-outlined viewAllIcon icon">
                            stack
                        </span>
                        <span className="text viewAllText">View all</span>
                    </Link>
                    <Link to="/quests" className="btn editBtn" >
                        <span className="material-symbols-outlined editIcon icon">
                            edit_square
                        </span>
                        <span className="text editText">Edit</span>
                    </Link>
                </div>
            </div>
            <div className="notes">
                <div className="note">
                    <div className="flexContainer top">
                        <h3 className="title">Hoje foi um dia.. Incrível.</h3>
                        <p className="description">{truncateDescription("Então, hoje acabou tendo um interclasse muito legal na minha escola, eu até procurei saber se teria no próximo ano mas não tive informações", 150)}</p>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="createdAt">16 de Fevereiro de 2018</span>
                    </div>
                </div>
                <div className="note">
                    <div className="flexContainer top">
                        <h3 className="title">Que complicado.</h3>
                        <p className="description">{truncateDescription("Então, hoje acabou tendo um interclasse muito legal na minha escola, eu até procurei saber se teria no próximo ano mas não tive informações, eu espero realmente que tenha. Sério. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum accusamus quam, harum dignissimos voluptates quo, ut quas perspiciatis aspernatur blanditiis nam! Temporibus maxime laudantium nihil libero, harum fuga eius delectus?", 150)}</p>
                    </div>
                    <div className="flexContainer bottom">
                        <span className="createdAt">16 de Março de 2024</span>
                    </div>
                </div>
            </div>
            
        </NotesComponent>
    )
}

const NotesComponent = styled.div`
    width: 100%;
    .btn{
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .header .btn{
        opacity: 0.7;
        gap: 5px;
        margin-left: 10px;
        font-size: 12px;
        &:hover{
            opacity: 1;
        }
    }
    .header .btn .icon{
        font-size: 18px;
    }

    .flexContainer{
        display: flex;
        align-items: center;
    }

    .notes{
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        padding: 20px 0;
        border-radius: 10px;
        background: white;
    }

    .note{
        background: white;
        color: black;
        height: 100%;
        min-height: 250px;
        min-width: 250px;
        max-width: 300px;
        width: 100% ;
        display: flex;
        flex-direction: column;
        padding: 15px;
        cursor: pointer;
        margin-right: 10px;
        flex-shrink: 0;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
        border: 1px solid var(--tertiary);
        border-radius: 5px;
    }

    .note .top{
        flex-direction: column;
    }
    .note .bottom{
        height: 100%;
        margin-top: auto;
        border-top: 1px solid var(--tertiary);
        padding: 5px 0;
    }
    .note .title{
        font-size: 16px;
        width: 100%;
        font-weight: 600;
    }
    .note .description{
        margin-top: 6px;
        font-size: 14px;
        opacity: 0.58;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .note .createdAt{
        font-size: 13px;
    }
    @media(max-width: 768px){
        .header h2{
            font-size: 20px;
        } 
    }
    @media(max-width: 450px){
        .header h2{
            font-size: 15px;
        }
        .header .btn{
            font-size: 10px;
        }
        .header .btn .text{
            display: none;
        }
    }
`

