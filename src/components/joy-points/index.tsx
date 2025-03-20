import styled from "styled-components"

export const JoyPoints = () => {

    return (
        <JoyPointComponent>
            <div className="header">
                <h2>Sistema de Salários</h2>
            </div>
            <div className="body">
                <div className="budget">
                    <h3 className="title">Current Joys</h3>
                    <div className="info">
                        <p className="quantity">257</p>
                        <span className="logo">Joys</span>
                    </div>
                </div>
            </div>
            
        </JoyPointComponent>
    )
}

const JoyPointComponent = styled.section`
    max-width: 800px;
    width: 100%;
    background: var(--secondary);
    padding: 20px;
    height: 100%;
    min-width: 200px;
    color: white;
    display: none;
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .body .budget{
        background: white;
        color: black;
        max-width: 250px;
        border-radius: 5px;
        padding: 20px;
        min-height: 100px;
        display: flex;
        flex-direction: column;
    }
    .body .budget .title{
        font-weight: 500;
    }
    .body .budget .info{
        height: 100%;
        display: flex;
        margin-top: 20px;
        font-size: 25px;
    }
    .body .budget .info p, .budget .info span{
        font-weight: 700;
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
    }
`

