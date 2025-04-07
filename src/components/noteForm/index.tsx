import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { Note, NoteCategory, NoteStatus } from "../../types/NoteData";
import { NoteContext } from "../../contexts/NotesContext";

interface NoteFormProps {
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: Note | null;
}

export const NoteForm = ({ onClose, mode, initialData }: NoteFormProps) => {
  const { createNote, updateNote } = useContext(NoteContext);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: NoteCategory;
    status: NoteStatus;
    priority: number;
    color: string;
  }>({
    title: "",
    content: "",
    category: NoteCategory.OUTRO,
    status: NoteStatus.ATIVO,
    priority: 0,
    color: "#4A5CFF",
  });

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        category: initialData.category,
        status: initialData.status,
        priority: initialData.priority,
        color: initialData.color || "#4A5CFF",
      });
    }
  }, [initialData, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "create") {
        await createNote(formData as Note);
      } else if (mode === "edit" && initialData) {
        await updateNote(initialData.id, formData);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar nota:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="formHeader">
          <h2>{mode === "create" ? "Criar Nova Nota" : "Editar Nota"}</h2>
          <span className="material-symbols-outlined close" onClick={onClose}>
            close
          </span>
        </div>

        <div className="formGroup">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="content">Conteúdo</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {Object.values(NoteCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {Object.values(NoteStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label htmlFor="priority">Prioridade</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="0">Baixa</option>
              <option value="1">Média</option>
              <option value="2">Alta</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="color">Cor</label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="buttonGroup">
          <button type="button" className="cancelBtn" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="saveBtn">
            {mode === "create" ? "Criar" : "Salvar"}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: white;

  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .close {
    cursor: pointer;
    font-size: 24px;
    &:hover {
      color: #ccc;
    }
  }

  .formGroup {
    margin-bottom: 15px;
    width: 100%;
  }

  .formRow {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: var(--light-background);
    color: white;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: var(--tertiary);
    }
  }

  textarea {
    resize: vertical;
  }

  .buttonGroup {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s ease;
  }

  .cancelBtn {
    background: transparent;
    border: 1px solid var(--tertiary);
    color: white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .saveBtn {
    background-color: var(--tertiary);
    color: white;
    
    &:hover {
      background-color: #3A49D0;
    }
  }
`;
