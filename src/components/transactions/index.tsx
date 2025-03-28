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
        <UserTransactions $black_to_white={themes[theme].black_to_white} $background={themes[theme].background} $object={themes[theme].object}>
            <nav>
                <ul>
                    {joyTransactions ? (
                        joyTransactions.map(item => (
                            <li className="transactionItem" key={item.id}>
                                <div className="header">
                                    <p>{transformDateToPtbr(item.createdAt)}</p>
                                    <span className="material-symbols-outlined icon">
                                        {item.type === 'GANHO'  || item.type === 'BONUS' ? 'check_circle'
                                        : (item.type === 'PENALIDADE' || item.type === 'GASTO' ? 'close' : '')}
                                    </span>
                                </div>
                                <p className="description">{item.description}</p>
                                <p><strong>Quantia</strong>: {item.amount}</p>
                                <p><strong>Tipo de Transação</strong>: {item.type}</p>
                            </li>
                        ))
                    ) : (
                        <p>compreendo</p>
                    )}
                </ul>
            </nav>
        </UserTransactions>
    )
}

const UserTransactions = styled.div<{ $black_to_white: string, $background: string, $object: string }>`
    background: ${({ $background}) => $background};
    display: flex;
    max-width: 800px;
    width: 100%;
    height: 100%;

    ul{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
    .transactionItem{
        background: ${({ $object }) => $object};
        border-radius: 5px;
        margin: 5px;
        padding: 10px 20px;
        max-width: 400px;
        width: 100%;
    }
    .transactionItem .header{
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .transactionItem p{
        margin-bottom: 10px;
    }
    .transactionItem p.description{
        margin-bottom: 30px;
    }
`