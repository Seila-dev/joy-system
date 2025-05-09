import styled from "styled-components";
import { Habit, HabitMethod, HabitProgress } from "../../types/habitData";
import { formatDate } from "../../utils/dateUtils";
import { Accordion } from "../Accordion";

interface ProgressHistoryProps {
  progress: HabitProgress[];
  currentHabit: Habit;
}

export const ProgressHistory = ({ progress, currentHabit }: ProgressHistoryProps) => {
  const accordionItems = progress.map((item, index) => ({
    id: index,
    label: formatDate(item.date),
    toggled: false,
    isSuccess: item.isSuccess,
    renderContent: () => (
      <AccordionContent>
        <p>
          Tempo:{" "}
          {currentHabit.method === HabitMethod.INSTANTANEO
            ? item.value === 1
              ? "Sim"
              : "Não"
            : `${item.value}${currentHabit.method === HabitMethod.QUANTIDADE ? " min" : ""}`}
        </p>
        <StatusBadge $isSuccess={item.isSuccess}>
          {item.isSuccess ? "Sucesso" : "Falha"}
        </StatusBadge>
        {item.habitId && <Notes>Anotação do hábito</Notes>}
      </AccordionContent>
    ),
  }));

  return (
    <ProgressSection>
      <SectionTitle>Histórico de Progresso</SectionTitle>
      {progress.length > 0 ? (
        <AccordionContainer>
          <Accordion items={accordionItems} />
        </AccordionContainer>
      ) : (
        <NoData>Nenhum progresso registrado ainda.</NoData>
      )}
    </ProgressSection>
  );
};

const ProgressSection = styled.section`
  background-color: var(--background);
  grid-area: RecordProgressComponent;
  width: 100%;
  padding: 20px;
  min-width: 430px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 25px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AccordionContent = styled.div`
  background-color: var(--lightGray);
  padding: 15px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StatusBadge = styled.span<{ $isSuccess: boolean }>`
  align-self: flex-start;
  background-color: ${({ $isSuccess }) => ($isSuccess ? "#4caf50" : "#f44336")};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Notes = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
`;

const NoData = styled.p`
  color: #999;
  font-style: italic;
`;
