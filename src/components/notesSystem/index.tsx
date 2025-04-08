// src/pages/Notes/index.tsx
import styled from "styled-components";
import { useState } from "react";
import { NoteItem } from "../../components/notes";
import { NoteForm } from "../../components/noteForm";
import { NoteStatus } from "../../types/NoteData";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";

export const NotesSystem = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<NoteStatus | null>(null);
  const [filterPriority, _] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [editNoteData, setEditNoteData] = useState(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value || null);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleStatusChange = (status: NoteStatus | null) => {
    setFilterStatus(status === filterStatus ? null : status);
  };

  // const handlePriorityChange = (priority: number | null) => {
  //   setFilterPriority(priority === filterPriority ? null : priority);
  // };

  const openCreateForm = () => {
    setEditNoteData(null);
    setShowForm(true);
  };

  const closeCreateForm = () => {
    setShowForm(false);
  };

  return (
    <NotesContainer>
      <Toaster theme="dark" />
      <Link to="/" className="prevPage">
        <span className="material-symbols-outlined arrowBack">
          arrow_back
        </span>
        <p>Voltar para Home</p>
      </Link>
      
      <Header>
        <div className="leftSide">
          <h1 className="title">Sistema de Notas</h1>
          <p className="description">Organize suas ideias e pensamentos</p>
        </div>
        <div className="rightSide">
          <button className="addNote btn cta" onClick={openCreateForm}>
            <span className="material-symbols-outlined icon">add</span>
            <span className="removeResponsive">Nova nota</span>
          </button>
        </div>
      </Header>

      <FiltersSection>
        <div className="filterCategories">
          <button
            className={`filterItem ${selectedCategory === null ? "selected" : ""}`}
            onClick={() => handleCategoryChange(null)}
          >
            Todas
          </button>
          <button
            className={`filterItem ${selectedCategory === "Pessoal" ? "selected" : ""}`}
            onClick={() => handleCategoryChange("Pessoal")}
          >
            <span className="material-symbols-outlined icon">person</span>
            Pessoal
          </button>
          <button
            className={`filterItem ${selectedCategory === "Trabalho" ? "selected" : ""}`}
            onClick={() => handleCategoryChange("Trabalho")}
          >
            <span className="material-symbols-outlined icon">work</span>
            Trabalho
          </button>
          <button
            className={`filterItem ${selectedCategory === "Estudo" ? "selected" : ""}`}
            onClick={() => handleCategoryChange("Estudo")}
          >
            <span className="material-symbols-outlined icon">school</span>
            Estudo
          </button>
        </div>

        <div className="filtersByStatus">
          <button
            className={`statusFilter ${filterStatus === null ? "selected" : ""}`}
            onClick={() => handleStatusChange(null)}
          >
            Todos
          </button>
          <button
            className={`statusFilter ${filterStatus === NoteStatus.ATIVO ? "selected" : ""}`}
            onClick={() => handleStatusChange(NoteStatus.ATIVO)}
          >
            <span className="material-symbols-outlined icon">radio_button_unchecked</span>
            Ativos
          </button>
          <button
            className={`statusFilter ${filterStatus === NoteStatus.FIXADO ? "selected" : ""}`}
            onClick={() => handleStatusChange(NoteStatus.FIXADO)}
          >
            <span className="material-symbols-outlined icon">push_pin</span>
            Fixados
          </button>
          <button
            className={`statusFilter ${filterStatus === NoteStatus.ARQUIVADO ? "selected" : ""}`}
            onClick={() => handleStatusChange(NoteStatus.ARQUIVADO)}
          >
            <span className="material-symbols-outlined icon">archive</span>
            Arquivados
          </button>
        </div>

        <div className="searchFilter">
          <span className="material-symbols-outlined icon">search</span>
          <input
            type="text"
            id="searchQuery"
            placeholder="Pesquisar Notas..."
            name="search"
            value={searchQuery || ""}
            onChange={handleSearch}
          />
        </div>
      </FiltersSection>
      
      {showForm && <Overlay onClick={closeCreateForm} />}
      {showForm && (
        <NoteForm
          onClose={closeCreateForm}
          initialData={editNoteData}
          mode="create"
        />
      )}
      
      <NoteItem
        selectedCategory={selectedCategory}
        filterStatus={filterStatus}
        filterPriority={filterPriority}
        searchQuery={searchQuery}
        filterQuantity={null}
      />
    </NotesContainer>
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

const NotesContainer = styled.main`
  padding: 10px 50px;
  min-height: 100vh;
  height: 100%;
  transition: 0.25s ease-in-out;
  background: transparent;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  color: #fff;
  
  .prevPage {
    width: fit-content;
    margin: 20px 0;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.15s ease-out;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    
    &:hover {
      border-bottom: 1px solid var(--secondary);
    }
  }
  
  .prevPage span {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    padding: 5px 50px;
  }
  
  @media (max-width: 450px) {
    padding: 5px 10px;
    padding-bottom: 30px;
  }
`;

const Header = styled.header`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  
  .description {
    margin-right: 20px;
    opacity: 0.8;
  }

  .rightSide {
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
  }
  
  .btn {
    padding: 12px 16px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 130px;
    border-radius: 5px;
    background: var(--secondary);
    color: black;
    font-weight: 500;
  }
  
  .btn .icon {
    font-size: 20px;
    margin-right: 5px;
  }

  @media (max-width: 530px) {
    flex-direction: column;
    
    .title {
      font-size: 25px;
    }
    
    .description {
      margin-top: 5px;
    }
    
    .btn {
      width: fit-content;
    }
    
    .rightSide {
      margin-top: 10px;
      width: 100%;
    }
    
    .removeResponsive {
      display: none;
    }
  }
`;

const FiltersSection = styled.div`
  width: 100%;
  margin-top: 20px;

  .filterCategories,
  .filtersByStatus {
    display: flex;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    color: white;
    flex-wrap: wrap;
  }
  
  .filterItem,
  .statusFilter {
    width: fit-content;
    background: transparent;
    border: none;
    color: white;
    padding: 15px;
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.7;
    transition: 0.2s ease;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  .filterItem .icon,
  .statusFilter .icon {
    font-size: 16px;
  }
  
  .filterItem.selected,
  .statusFilter.selected {
    opacity: 1;
    color: var(--secondary);
  }

  .searchFilter {
    border: 1px solid #ccc3;
    border-radius: 5px;
    display: flex;
    padding: 10px;
    margin: 20px 0;
    
    .icon {
      font-size: 20px;
      opacity: 0.6;
      margin-right: 10px;
    }
    
    #searchQuery {
      border: none;
      width: 100%;
      outline: none;
      background: transparent;
      color: white;
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    .filterCategories,
    .filtersByStatus {
      overflow-x: auto;
      padding: 5px 0;
      
      &::-webkit-scrollbar {
        height: 0;
      }
    }
    
    .filterItem,
    .statusFilter {
      padding: 10px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
`;
