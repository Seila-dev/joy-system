import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const CalendarButton = () => {
  const navigate = useNavigate();
  
  return (
    <StyledButton onClick={() => navigate('/calendar')}>
      <span className="material-symbols-outlined">calendar_month</span>
      <span className="text">Calendário</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--secondary, #3498db);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  width: fit-content;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  .material-symbols-outlined {
    font-size: 20px;
  }
  
  .text {
    font-size: 14px;
    font-weight: 500;
  }
`;