import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuestContext } from "../../contexts/QuestContext";
import {
  PageContainer,
  CalendarWrapper,
  CalendarHeader,
  Header,
  CalendarGrid,
  DaysHeader,
  DaysGrid,
  DayItem,
  DayDetails,
  DayHeader,
  EventsSection,
  EventsList,
  QuestItem,
  EventContent,
  EventTitle,
  QuestStatus,
  EventDescription,
  QuestReward,
  ViewButton
} from "./styled";
import { DateTime } from "luxon";

export default function CalendarPage() {
  const navigate = useNavigate();
  const { quests } = useContext(QuestContext);

  const [currentDate, setCurrentDate] = useState<string>("");
  const [days, setDays] = useState<number[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Get current date
  const date = new Date();
  const today = date.getDate();
  const currentMonthDate = date.getMonth();

  // Function to get days in a month
  const getDaysInMonth = (month: number, year: number) => {
    const lastDateofMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(0);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };

  // Navigation functions
  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  // Get quests for selected day
  const getQuestsForDay = (day = selectedDay) => {
    if (!day) return [];

    return quests?.filter(quest => {
      if (!quest.validation) return false;
      const questDate = new Date(quest.validation);
      return (
        questDate.getDate() === day &&
        questDate.getMonth() === currentMonth &&
        questDate.getFullYear() === currentYear
      );
    }) || [];
  };

  // Check if a day has any quests
  const dayHasQuests = (day: number) => {
    if (day === 0) return false;
    return getQuestsForDay(day).length > 0;
  };

  // Handle day selection
  const handleDayClick = (day: number) => {
    if (day === 0) return;
    setSelectedDay(day);
  };

  // Update current date and days array
  useEffect(() => {
    const actualDate = `${months[currentMonth]} ${currentYear}`;
    setCurrentDate(actualDate);
    setDays(getDaysInMonth(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  // Get filtered quests for the selected day
  const dayQuests = getQuestsForDay();

      const transformDateToPtbr = (newDate: string | number): string => {
          const dt = DateTime.fromJSDate(new Date(newDate)).setLocale('pt-BR')
  
          return dt.toFormat('HH:mm')
      }

  return (
    <PageContainer>
      <Link to="/dashboard" className="prevPage">
        <span className="material-symbols-outlined arrowBack">
          arrow_back
        </span>
        <p>Voltar para Home</p>
      </Link>
      <Header>
        <div className="leftSide">
          <h1 className="title">Calendário</h1>
          <p className="description">Todas as suas quests pendentes apareceram aqui</p>
        </div>
      </Header>

      <CalendarWrapper>
        <CalendarHeader>
          <p className="currentDate">{currentDate}</p>
          <div className="icons">
            <span className="material-symbols-outlined" onClick={prevMonth}>
              chevron_left
            </span>
            <span className="material-symbols-outlined" onClick={nextMonth}>
              chevron_right
            </span>
          </div>
        </CalendarHeader>

        <CalendarGrid>
          <DaysHeader>
            <li>Dom</li>
            <li>Seg</li>
            <li>Ter</li>
            <li>Qua</li>
            <li>Qui</li>
            <li>Sex</li>
            <li>Sab</li>
          </DaysHeader>

          <DaysGrid>
            {days.map((day, index) => (
              <DayItem
                key={index}
                className={`
                  ${day === 0 ? 'inactive' : ''}
                  ${day === today && currentMonth === currentMonthDate ? 'today' : ''}
                  ${day === selectedDay ? 'selected' : ''}
                  ${dayHasQuests(day) ? 'has-quest' : ''}
                `}
                onClick={() => handleDayClick(day)}
              >
                {day !== 0 && day}
              </DayItem>
            ))}
          </DaysGrid>
        </CalendarGrid>
      </CalendarWrapper>

      {selectedDay && (
        <DayDetails>
          <DayHeader>
            <h2>{selectedDay} de {months[currentMonth]}, {currentYear}</h2>
          </DayHeader>

          <EventsSection>
            {dayQuests.length === 0 ? (
              <p>Nenhuma quest para este dia.</p>
            ) : (
              <div>
                <h3>Quests</h3>
                <EventsList>
                  {dayQuests.map(quest => (
                    <QuestItem key={quest.id} status={quest.status}>
                      <EventContent>
                        <EventTitle>{quest.title} - {transformDateToPtbr(quest.validation)}</EventTitle>
                        <QuestStatus status={quest.status}>{quest.status}</QuestStatus>
                        {quest.description && <EventDescription>{quest.description}</EventDescription>}
                        <QuestReward>Recompensa: {quest.joys} joys</QuestReward>
                      </EventContent>
                      <ViewButton onClick={() => navigate(`/quests/${quest.id}`)}>
                        <span className="material-symbols-outlined">visibility</span>
                      </ViewButton>
                    </QuestItem>
                  ))}
                </EventsList>
              </div>
            )}
          </EventsSection>
        </DayDetails>
      )}
    </PageContainer>
  );
}