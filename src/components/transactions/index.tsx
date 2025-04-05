import { useContext, useEffect } from "react"
import styled from "styled-components"
import { JoysContext } from "../../contexts/JoysContext"
import { DateTime } from "luxon"

interface transactionProps {
    limit: number;
}

export const Transactions = ({ limit }: transactionProps) => {
    const { joyTransactions, getTransactions } = useContext(JoysContext)
    useEffect(() => {
        getTransactions(limit)
    }, [])

    const transformDateToPtbr = (newDate: string | number): string => {
        const dt = DateTime.fromJSDate(new Date(newDate)).setLocale('pt-BR')

        return dt.toFormat('dd/MM/yyyy - HH:mm')
    }

    return (
        <TransactionHistoryElement>
            <h3 className="title">Histórico de Transações</h3>
            <p className="description">Histórico de ganhos e gastos de seus Joys</p>
            {joyTransactions && joyTransactions.length > 0 ? (
                joyTransactions.map(item => (
                    <UserTransaction
                        key={item.id}
                        $transactionType={item.type} >
                        <div className="leftSide">
                            <span className="material-symbols-outlined icon">
                            {item.type === 'GANHO' || item.type === 'BONUS' ? 'arrow_upward'
                                : (item.type === 'PENALIDADE' || item.type === 'GASTO' || item.type === 'COMPRA' ? 'arrow_downward' : '')}
                            </span>
                        </div>
                        <div className="center">
                            <h3 className="title">{item.description}</h3>
                            <p className="description">{transformDateToPtbr(item.createdAt)}</p>
                        </div>
                        <div className="rightSide">
                            <p className="quantity">{item.type === 'GANHO' || item.type === 'BONUS' ? '+'
                                : (item.type === 'PENALIDADE' || item.type === 'GASTO' ? '-' : '')}
                                {item.amount}
                            </p>
                        </div>
                        {/* <div className="header">
                            <p className="transactionDate">{transformDateToPtbr(item.createdAt)}</p>
                            <span className="material-symbols-outlined icon">
                                {item.type === 'GANHO' || item.type === 'BONUS' ? 'check_circle'
                                    : (item.type === 'PENALIDADE' || item.type === 'GASTO' ? 'close' : '')}
                            </span>
                        </div>
                        <p className="description">{item.description}</p>
                        <p className="quantity">{item.type === 'GANHO' || item.type === 'BONUS' ? '+'
                                    : (item.type === 'PENALIDADE' || item.type === 'GASTO' ? '-' : '')}
                            {item.amount} {item.type}
                        </p> */}
                    </UserTransaction>
                ))
            ) : (
                <p>Nenhum histórico foi encontrado.</p>
            )}
        </TransactionHistoryElement>
    )
}

const TransactionHistoryElement = styled.section`
    border: 1px solid #fff93d30;
    width: fit-content;
    padding: 20px;
    border-radius: 10px;
    .description{
        margin: 5px 0 20px 0;
    }
`

const UserTransaction = styled.div<{
    $transactionType: string,
}>`
    border-radius: 5px;
    padding: 15px 20px;
    width: 100%;
    max-width: 350px;
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    background: transparent;
    border: 1px solid #fff93d1c;

    .leftSide span{
        padding: 5px;
        font-size: 15px;
        border-radius: 50%;
        background: ${({ $transactionType }) => $transactionType === 'GANHO' || $transactionType === 'BONUS' ? '#008a2070' :'#e6000f70'};
        margin-right: 15px;
        
    }
    .center {
        width: 100%;
    }
    .center .title{
        font-size: 14px;
        opacity: 0.8;
        width: 100%;
    }
    p.description{
        margin: 10px 0 0 0;
        font-size: 12px;
    }
    .rightSide{
        color: ${({ $transactionType }) => $transactionType === 'GANHO' || $transactionType === 'BONUS' ? '#008a20' : 'red'};
        font-weight: 600;
        margin-left: 30px;
    }


    @media(max-width: 550px){
        padding: 10px;
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
        .rightSide{
            margin: 0 0 0 10px;
        }
    }
`