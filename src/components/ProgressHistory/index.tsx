import styled from "styled-components";
import { Habit, HabitMethod } from "../../types/habitData";
import { formatDate } from "../../utils/dateUtils";
import { Accordion } from "../Accordion";
import useHabit from "../../contexts/hooks/useHabit";

interface ProgressHistoryProps {
  currentHabit: Habit;
}

export const ProgressHistory = ({ currentHabit }: ProgressHistoryProps) => {
  const { habitProgress } = useHabit();
  const progress = habitProgress[currentHabit.id] || [];
  console.log("Progress:", progress);

  const accordionItems = progress.map((item, index) => ({
    id: index,
    label: formatDate(item.date),
    toggled: false,
    notes: item.notes,
    isSuccess: item.isSuccess,
    renderContent: () => (
      <AccordionContent>
        <ContentHeader>
          {currentHabit.method === HabitMethod.INSTANTANEO
            ? 'Resultado' : 'Contagem'}:{" "}
          {currentHabit.method === HabitMethod.INSTANTANEO
            ? item.value === 1
              ? "Sim"
              : "Não"
            : `${item.value}`}
        </ContentHeader>
        <StatusBadge $isSuccess={item.isSuccess}>
          {item.isSuccess ? "Sucesso" : "Falha"}
        </StatusBadge>
        {item.notes ? (
          <Notes>{item.notes}</Notes>
        ) : (
          <Notes>Sem observações</Notes>
        )}
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
  max-width: 500px;
  padding: 20px;

  @media(max-width: 768px) {
    *{
    font-size: 12px !important;
  }
`;

const ContentHeader = styled.p`

`

const SectionTitle = styled.h2`
  margin-bottom: 25px;
  font-weight: 600;
  font-size: 25px;
  gap: 10px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AccordionContent = styled.div`
  background-color: var(--lightGray);
  padding: 15px;
    max-width: inherit;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
    width: 100%;
    box-sizing: border-box;
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
  color: #a9a9a9;
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
`;

const NoData = styled.p`
  color: #999;
  font-style: italic;
`;
