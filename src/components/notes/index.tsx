import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { NoteStatus } from "../../types/NoteData";
import { NoteContext } from "../../contexts/NotesContext";
import { useNavigate } from "react-router-dom";

interface NoteItemProps {
  selectedCategory: string | null;
  filterStatus: NoteStatus | null;
  filterPriority: number | null;
  filterQuantity: number | null;
  searchQuery: string | null;
}

export const NoteItem = ({
  selectedCategory,
  filterStatus,
  filterPriority,
  searchQuery,
  filterQuantity,
}: NoteItemProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { loading, filteredNotes, filterNotes } = useContext(NoteContext);

  useEffect(() => {
    filterNotes(
      selectedCategory as any,
      filterStatus,
      searchQuery,
      filterQuantity
    );
  }, [filterQuantity, selectedCategory, filterStatus, filterPriority, searchQuery])

  const closeCreateForm = () => {
    setOpen(false)
  }

  const navigate = useNavigate()

  const hasNotes = filteredNotes && filteredNotes.length > 0;

  const transformDateToPtbr = (newDate: string | number): string => {
    const dt = DateTime.fromJSDate(new Date(newDate)).setLocale('pt-BR')

    return dt.toFormat('dd/MM/yyyy - HH:mm')
  }

  const truncateNote = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  }

  const getPriorityLabel = (priority: number): string => {
    switch (priority) {
      case 0:
        return "Baixa";
      case 1:
        return "Média";
      case 2:
        return "Alta";
      default:
        return "Baixa";
    }
  };

  const getPriorityClass = (priority: number): string => {
    switch (priority) {
      case 0:
        return "FACIL";
      case 1:
        return "MEDIO";
      case 2:
        return "DIFICIL";
      default:
        return "FACIL";
    }
  };

  if (loading) return <div>Carregando notas...</div>;

  return (
    <>
      {open && <Overlay onClick={() => closeCreateForm()} />}
      <CardsContainer>
        {hasNotes ? (
          filteredNotes?.map((note) => (
            <Card
              key={note.id}
              style={{ borderLeft: `5px solid ${note.color || "#4A5CFF"}` }}
              onClick={() => { navigate(`/notes/${note.id}`) }}
            >
              <div className="header">
                <div className={`category ${note.category}`}>
                  <span className="material-symbols-outlined icon">
                    schedule
                  </span>
                  <p>{note.category}</p>
                </div>
                <div>
                  <span className="material-symbols-outlined icon status">
                    {note.status === 'FIXADO' ? 'push_pin' : note.status === 'ARQUIVADO' ? 'archive' : ''}
                  </span>
                </div>
              </div>
              <div className="body">
                <h3 className="title">{note.title}</h3>
                <p className="description">{truncateNote(note.content, 100)}</p>
                <div className="limit afterDescription">
                  <span className="material-symbols-outlined icon">
                    calendar_month
                  </span>
                  <p>Criado em: {transformDateToPtbr(note.createdAt)}</p>
                </div>
                <div className="priority afterDescription">
                  <div className={`priorityLevel ${getPriorityClass(note.priority)}`}>
                    <p>{getPriorityLabel(note.priority)}</p>
                  </div>
                </div>
              </div>
              <div className="footer">
                <span className="material-symbols-outlined icon">
                  arrow_upward
                </span>
                <p className="description">Clique para expandir</p>
              </div>
            </Card>
          ))
        ) : (
          <span className="warn">Não há notas para o filtro selecionado.</span>
        )}
      </CardsContainer>
    </>
  );
};

const Overlay = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 4;
      pointer-events: all;
    `;

const CardsContainer = styled.section`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      height: 100%;
      width: 100%;
    
      .warn {
        color: white;
      }
    
      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
        .card .footer .status {
          font-size: 12px;
          margin-bottom: 5px;
        }
        .card .footer .setStatus {
          padding: 5px;
        }
      }
      @media (max-width: 580px) {
        grid-template-columns: 1fr;
      }
    `;

const Card = styled.div`
      background: #03061a;
      padding: 25px;
      border: 1px solid #00031a;
      width: 100%;
      min-height: 300px;
      height: 100%;
      cursor: pointer;
      color: white;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      position: relative;
      transition: transform 1.5s ease-out, opacity 1.5s ease-out; 
    
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        color: white;
        width: 100%;
        user-select: none;
      }
      .header .category {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .header .category .icon {
        font-size: 18px;
      }
      .header .icon.status {
        opacity: 0.5;
      }
      .header .options:hover {
        background: #ccc2;
      }
      .body .description {
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: white;
      }
      .body .afterDescription {
        display: flex;
        font-size: 12px;
        align-items: center;
        gap: 5px;
        margin-bottom: 10px;
      }
      .body .afterDescription.limit {
        opacity: 0.6;
      }
      .body .afterDescription.priority {
        justify-content: flex-end;
        margin-top: auto;
      }
      .body .afterDescription .priority {
        display: flex;
        align-items: center;
        gap: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 60%;
      }
      .body .afterDescription .priorityLevel {
        padding: 5px 15px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 12px;
        border: none;
      }
      .body .afterDescription .priority {
        font-size: 13px;
        opacity: 1;
        font-weight: 400;
      }
      .body .limit .icon {
        font-size: 18px;
      }
      .footer {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: auto;
      }
      .footer .status {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: gray;
        margin-bottom: 3px;
        background: transparent;
        padding: 5px 15px;
        border-radius: 10px;
      }

      .footer p.description{
        margin: 0 !important;
      }
    
      .footer .status .circleProgress {
        width: 10px;
        height: 10px;
        background: gray;
        display: flex;
        border-radius: 50%;
        margin-right: 5px;
      }
    
      .footer .setStatus {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border: 1px solid gray;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
        color: gray;
      }
    
      .footer .setStatus .icon {
        font-size: 14px;
        margin-right: 5px;
      }
    
      // Status styling
      .footer.ATIVO .setStatus,
      .footer.ATIVO p {
        color: white;
        font-weight: 700;
      }
    
      .footer.ATIVO .status .circleProgress {
        background: white;
      }
    
      .footer.FIXADO .setStatus,
      .footer.FIXADO p {
        color: #DAA520;
        font-weight: 700;
      }
    
      .footer.FIXADO .status .circleProgress {
        background: #DAA520;
      }
    
      .footer.ARQUIVADO .setStatus,
      .footer.ARQUIVADO p {
        color: #888;
        font-weight: 700;
      }
    
      .footer.ARQUIVADO .status .circleProgress {
        background: #888;
      }
    
      // Prioridade styling
      .body .priorityLevel.FACIL {
        color: var(--greenText);
        background: var(--greenBg);
      }
      .body .priorityLevel.MEDIO {
        color: var(--yellowText);
        background: var(--yellowBg);
      }
      .body .priorityLevel.DIFICIL {
        color: orangered;
        background: black;
      }
    `;