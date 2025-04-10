import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Note, NoteStatus } from "../../types/NoteData";
import { parseCookies } from "nookies";
import { NoteContext } from "../../contexts/NotesContext";
import { Loading } from "../loading";
import styled from "styled-components";

export const DetailedNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [openNav, setOpenNav] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { 'joysystem.token': token } = parseCookies();
  const { deleteNote, loading, updateNote, setStatus } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    async function fetchAsync() {
      try {
        const noteId = Number(id);
        const response = await api.get('/notes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const allNotes: Note[] = response.data;
        const detailedNote = allNotes.find(note => note.id === noteId);
        setNote(detailedNote);
        
        if (detailedNote) {
          setEditedTitle(detailedNote.title);
          setEditedContent(detailedNote.content);
        }
      } catch (error) {
        console.error("Erro ao buscar nota:", error);
      }
    }
    fetchAsync();
  }, [id, token]);

  const saveChanges = async () => {
    if (!note) return;
    
    try {
      const updatedNote = await updateNote(note.id, {
        title: editedTitle,
        content: editedContent
      });
      
     
    if (updatedNote !== null && updatedNote !== undefined) {
      setNote(updatedNote);
      setIsEditing(false);
    }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleStatusChange = async (status: NoteStatus) => {
    if (!note) return;
    
    try {
      await setStatus(note.id, status);
      setNote({...note, status});
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

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

  if (loading) {
    return <Loading>Carregando... Verifique se essa nota realmente existe ou se você está logado.</Loading>;
  }

  if (!note) {
    return <Loading>Carregando... Verifique se essa nota realmente existe ou se você está logado.</Loading>;
  }

  return (
    <NoteDetailContainer>
      {openSidebar && <Overlay onClick={() => handleToggleNav()} />}
      <Sidebar className={openSidebar ? "open" : ""}>
        <Link to="/dashboard/notes" className="backButton">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Voltar</span>
        </Link>

        <SidebarSection>
          <h3>Informações</h3>
          <InfoItem>
            <span className="material-symbols-outlined">calendar_today</span>
            <div>
              <strong>Criado em</strong>
              <p>{new Date(note.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
          </InfoItem>
          <InfoItem>
            <span className="material-symbols-outlined">update</span>
            <div>
              <strong>Atualizado em</strong>
              <p>{new Date(note.updatedAt).toLocaleDateString('pt-BR')}</p>
            </div>
          </InfoItem>
        </SidebarSection>

        <SidebarSection>
          <h3>Categoria</h3>
          <CategoryBadge style={{ backgroundColor: note.color || "#4A5CFF" }}>
            <span className="material-symbols-outlined">bookmark</span>
            {note.category}
          </CategoryBadge>
        </SidebarSection>

        <SidebarSection>
          <h3>Prioridade</h3>
          <PrioritySelector>
            {[0, 1, 2].map(priority => (
              <PriorityButton 
                key={priority}
                className={note.priority === priority ? "active" : ""}
                priority={priority}
                onClick={async () => {
                  if (!note) return;
                  try {
                    const updatedNote = await updateNote(note.id, {
                      id: note.id,
                      priority
                    });
                    if (updatedNote !== null && updatedNote !== undefined) setNote(updatedNote);
                  } catch (error) {
                    console.error("Erro ao alterar prioridade:", error);
                  }
                }}
              >
                {getPriorityLabel(priority)}
              </PriorityButton>
            ))}
          </PrioritySelector>
        </SidebarSection>

        <SidebarSection>
          <h3>Status</h3>
          <StatusSelector>
            <StatusButton
              status="ATIVO"
              className={note.status === "ATIVO" ? "active" : ""}
              onClick={() => handleStatusChange(NoteStatus.ATIVO)}
            >
              <span className="material-symbols-outlined">radio_button_unchecked</span>
              Ativo
            </StatusButton>
            <StatusButton
              status="FIXADO"
              className={note.status === "FIXADO" ? "active" : ""}
              onClick={() => handleStatusChange(NoteStatus.FIXADO)}
            >
              <span className="material-symbols-outlined">push_pin</span>
              Fixado
            </StatusButton>
            <StatusButton
              status="ARQUIVADO"
              className={note.status === "ARQUIVADO" ? "active" : ""}
              onClick={() => handleStatusChange(NoteStatus.ARQUIVADO)}
            >
              <span className="material-symbols-outlined">archive</span>
              Arquivado
            </StatusButton>
          </StatusSelector>
        </SidebarSection>

        <SidebarSection>
          <h3>Ações</h3>
          <ActionButton onClick={() => setIsEditing(!isEditing)}>
            <span className="material-symbols-outlined">
              {isEditing ? "cancel" : "edit"}
            </span>
            {isEditing ? "Cancelar edição" : "Editar nota"}
          </ActionButton>
          {isEditing && (
            <ActionButton primary onClick={saveChanges}>
              <span className="material-symbols-outlined">save</span>
              Salvar alterações
            </ActionButton>
          )}
          <ActionButton className="remove" onClick={() => {deleteNote(note.id); navigate('/notes')}}>
              <span className="material-symbols-outlined">delete</span>
              Deletar nota
            </ActionButton>
        </SidebarSection>
      </Sidebar>

      <MainContent>
        {isEditing ? (
          <>
            <OpenMenu onClick={() => setOpenSidebar(!openSidebar)}>Abrir menu</OpenMenu>
            <TitleInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              maxLength={50}
              placeholder="Título da nota"
            />
            <ContentTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Conteúdo da nota"
            />
          </>
        ) : (
          <>
            <OpenMenu onClick={() => setOpenSidebar(!openSidebar)}>Abrir menu</OpenMenu>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteContent>{note.content}</NoteContent>
          </>
        )}
      </MainContent>
    </NoteDetailContainer>
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
`

const NoteDetailContainer = styled.div`
  display: flex;
  height: 100vh;
  color: white;
  background: transparent;
`;

const Sidebar = styled.aside`
  width: 300px;
  background: #03061a;
  border-right: 1px solid #1e2140;
  padding: 20px;
  overflow-y: auto;

  &.open {
    transform: translateX(0);
  }
  
  .backButton {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    text-decoration: none;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

    @media (max-width: 576px) {
      &.active.toggleMenu{
        display: flex;
        cursor: pointer;
    }
  }
  
  @media (max-width: 768px) {
    width: 240px;
  }
  
  @media (max-width: 576px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 10;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.open {
      transform: translateX(0);
    }
  }
`;

const SidebarSection = styled.section`
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  
  .material-symbols-outlined {
    color: rgba(255, 255, 255, 0.6);
  }
  
  div {
    display: flex;
    flex-direction: column;
    
    strong {
      font-size: 13px;
      font-weight: 500;
    }
    
    p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 2px;
    }
  }
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 18px;
  font-size: 14px;
  
  .material-symbols-outlined {
    font-size: 16px;
  }
`;

const PrioritySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriorityButton = styled.button<{ priority: number }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &.active {
    background: ${props => {
      switch (props.priority) {
        case 0: return 'rgba(33, 150, 83, 0.2)';
        case 1: return 'rgba(242, 201, 76, 0.2)';
        case 2: return 'rgba(235, 87, 87, 0.2)';
        default: return 'rgba(33, 150, 83, 0.2)';
      }
    }};
    border-color: ${props => {
      switch (props.priority) {
        case 0: return '#21965380';
        case 1: return '#F2C94C80';
        case 2: return '#EB575780';
        default: return '#21965380';
      }
    }};
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StatusSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatusButton = styled.button<{ status: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  .material-symbols-outlined {
    font-size: 18px;
  }
  
  &.active {
    background: ${props => {
      switch (props.status) {
        case 'ATIVO': return 'rgba(255, 255, 255, 0.1)';
        case 'FIXADO': return 'rgba(218, 165, 32, 0.1)';
        case 'ARQUIVADO': return 'rgba(136, 136, 136, 0.1)';
        default: return 'rgba(255, 255, 255, 0.1)';
      }
    }};
    border-color: ${props => {
      switch (props.status) {
        case 'ATIVO': return 'rgba(255, 255, 255, 0.3)';
        case 'FIXADO': return '#DAA52050';
        case 'ARQUIVADO': return '#88888850';
        default: return 'rgba(255, 255, 255, 0.3)';
      }
    }};
    color: ${props => {
      switch (props.status) {
        case 'ATIVO': return 'white';
        case 'FIXADO': return '#DAA520';
        case 'ARQUIVADO': return '#888';
        default: return 'white';
      }
    }};
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  margin-bottom: 8px;
  border: 1px solid ${props => props.primary ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 6px;
  background: ${props => props.primary ? 'var(--secondary)' : 'transparent'};
  color: ${props => props.primary ? 'black' : 'white'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &.remove{
    background: rgba(255, 0, 0, 0.5);
    &:hover{
      background: red;
    }
  }
  &:hover {
    background: ${props => props.primary ? 'var(--secondary)' : 'rgba(255, 255, 255, 0.05)'};
  }
  
  .material-symbols-outlined {
    font-size: 18px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #0a0d24;
`;

const NoteTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const OpenMenu = styled.button`
  font-size: 12px;
  margin-bottom: 24px;
  width: fit-content;
  padding: 8px 30px;
  background: var(--secondary);
  border: 1px solid var(--secondary);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: 700;
  display: none;

  @media (max-width: 576px) {
    display: flex;
  }
`;

const NoteContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0 0 8px 0;
  outline: none;
  
  &:focus {
    border-bottom-color: var(--secondary);
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: calc(100vh - 150px);
  font-size: 16px;
  line-height: 1.6;
  background: transparent;
  border: none;
  color: white;
  padding: 0;
  outline: none;
  resize: none;
  font-family: inherit;
`;
