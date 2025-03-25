import React, { useContext, useState } from 'react';
import { QuestContext } from '../../contexts/QuestContext';
import { Quest, QuestCategory, Difficulty, QuestStatus } from '../../types/questData';
import styled from 'styled-components';

interface QuestFormProps {
    onClose?: () => void;
}

export const QuestForm: React.FC<QuestFormProps> = ({ onClose }) => {
    const { addQuest } = useContext(QuestContext);
    
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeline, setTimeline] = useState<QuestCategory>('DIARIO');
    const [difficulty, setDifficulty] = useState<Difficulty>('FACIL');
    const [validation, setValidation] = useState('');
    const [joys, setJoys] = useState(0);
    const [highlight, setHighlight] = useState(false);
    const [status, setStatus]  = useState<QuestStatus>('PENDENTE');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!title || !description) {
            alert('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        const newQuest: Omit<Quest, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
            title,
            description,
            timeline,
            difficulty,
            validation: validation || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
            joys,
            highlight,
            status: status || 'PENDENTE' 
        };

        try {
            await addQuest(newQuest as Quest);
            
            // Reset form
            setTitle('');
            setDescription('');
            setTimeline('DIARIO');
            setDifficulty('FACIL');
            setValidation('');
            setJoys(0);
            setHighlight(false);
            setStatus('PENDENTE')

            console.log(status)

            // Close form if onClose is provided
            onClose?.();
        } catch (error) {
            console.error('Erro ao adicionar quest:', error);
            alert('Erro ao adicionar quest');
        }
    };

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <div className="header">
                <h2>Create New Quest</h2>
                <p className='description'>Crie uma nova quest para sua nova jornada.</p>
            </div>
            <div className='item'>
                <label htmlFor="title">Título da Quest</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className='item'>
                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="flexContainer">
                <div className='item'>
                    <label htmlFor="timeline">Timeline</label>
                    <select
                        id="timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value as QuestCategory)}
                    >
                        <option value="DIARIO">Diário</option>
                        <option value="SEMANAL">Semanal</option>
                        <option value="MENSAL">Mensal</option>
                        <option value="ANUAL">Anual</option>
                    </select>
                </div>
                <div className='item'>
                    <label htmlFor="difficulty">Dificuldade</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    >
                        <option value="FACIL">Fácil</option>
                        <option value="MEDIO">Médio</option>
                        <option value="DIFICIL">Difícil</option>
                        <option value="MUITO_DIFICIL">Muito Difícil</option>
                    </select>
                </div>
                <div className='item'>
                    <label htmlFor="validation">Data de Validação</label>
                    <input
                        id="validation"
                        type="date"
                        placeholder="DD/MM/YYYY"
                        value={validation}
                        onChange={(e) => setValidation(e.target.value)}
                    />
                </div>
                <div className='item'>
                    <label htmlFor="joys">Joys</label>
                    <input
                        id="joys"
                        type="text"
                        value={joys}
                        onChange={(e) => setJoys(Number(e.target.value))}
                    />
                </div>
                <div className='item'>
                    <label htmlFor="highlight">Em Destaque</label>
                    <input
                        id="highlight"
                        type="checkbox"
                        checked={highlight}
                        onChange={(e) => setHighlight(e.target.checked)}
                    />
                </div>
            </div>

            <button type="submit">Criar Quest</button>
        </Form>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
     padding: 0 15px;
    position: relative;
`

const Form = styled.form`
    display: flex;
    z-index: 100;
    position: fixed;
     max-width: 700px; 
     margin: 15px 0;
    width: 100%;
    margin: 15px;
    background: var(--background);
    padding: 30px 15px;
    flex-direction: column;
    border-radius: 10px;

    .header .description{
        margin: 5px 0 20px 0;
    }
    input, select, textarea{
        background: black;
        resize: none;
        color: white;
        border-radius: 5px;
        border: 1px solid var(--light-background);
        outline: none;
        padding: 10px;
        font-size: 15px;
        width: 100%;
    }
    
    select{
        cursor: pointer;
    }
    label{
        margin: 10px 0;
    }

    .flexContainer{
        gap: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .item{
        display: flex;
        flex-direction: column;
    }

        @media (max-width: 768px) {
        /* Quando a tela for menor que 768px, a flexContainer se tornará uma coluna */
        .flexContainer {
            grid-template-columns: 1fr; /* Alinha todos os campos em uma coluna */
        }

        .header h2 {
            font-size: 20px; /* Reduz o tamanho da fonte do título */
        }

        .header .description {
            font-size: 14px; /* Ajuste o tamanho da descrição */
        }

        button {
            width: 100%; /* Faz o botão ocupar toda a largura disponível */
        }
    }

     @media (max-width: 480px) {
        padding: 20px; /* Diminui o padding para telas menores */
        .flexContainer {
            grid-template-columns: 1fr; /* Garante que os campos fiquem empilhados */
        }
    }
`

