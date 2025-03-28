import { useContext, useEffect } from "react"
import styled from "styled-components"
import { JoysContext } from "../../contexts/JoysContext"
import { DateTime } from "luxon"
import { ThemeContext, themes } from "../../contexts/ThemeContext"

export const Transactions = () => {
    const { theme } = useContext(ThemeContext)
    const { joyTransactions, getTransactions } = useContext(JoysContext)
    useEffect(() => {
        getTransactions(50)
    }, [])

    const transformDateToPtbr = (newDate: string | number): string => {
        const dt = DateTime.fromJSDate(new Date(newDate)).setLocale('pt-BR')

        return dt.toFormat('dd/MM/yyyy - HH:mm')
    }

    return (
        < >
            {joyTransactions && joyTransactions.length > 0 ? (
                joyTransactions.map(item => (
                    <UserTransaction className="transactionItem" key={item.id} $black_to_white={themes[theme].black_to_white} $background={themes[theme].background} $object={themes[theme].object}>
                        <div className="header">
                            <p className="transactionDate">{transformDateToPtbr(item.createdAt)}</p>
                            <span className="material-symbols-outlined icon">
                                {item.type === 'GANHO' || item.type === 'BONUS' ? 'check_circle'
                                    : (item.type === 'PENALIDADE' || item.type === 'GASTO' ? 'close' : '')}
                            </span>
                        </div>
                        <p className="description">{item.description}</p>
                        <p><strong>Quantia</strong>: {item.amount}</p>
                        <p><strong>Tipo de Transação</strong>: {item.type}</p>
                    </UserTransaction>
                ))
            ) : (
                <p>Nenhum histórico foi encontrado.</p>
            )}
        </>
    )
}

const UserTransaction = styled.div<{ $black_to_white: string, $background: string, $object: string }>`
    background: ${({ $object }) => $object};
    border-radius: 5px;
    padding: 10px 20px;
    width: 100%;
    .header{
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    p{
        margin-bottom: 10px;
    }
    p.description{
        margin-bottom: 30px;
    }
    .transactionDate{
        margin: 0;
    }

    @media(max-width: 550px){
        nav{
            width: 100%;
        }
        ul{
            width: 100%;
            grid-template-columns: 1fr;
            align-items: center;
        }
        ul .transactionItem{
            max-width: 100%;
            width: 100%;
        }
    }
`