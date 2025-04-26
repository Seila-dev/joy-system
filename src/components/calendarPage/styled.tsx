import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 50px;
  padding: 10px 50px;
  color: #e0e4ff;
  
  .prevPage{
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
        &:hover{
            border-bottom: 1px solid var(--secondary);
        }
    }
    .prevPage span{
        font-size: 20px;
    }

    @media (max-width: 768px) {
        padding: 15px;
    }

`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  background: rgba(15, 20, 60, 0.5);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 10, 50, 0.35);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(100, 120, 255, 0.18);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  
  .description {
    margin-right: 20px;
    opacity: 0.8;
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

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 10px 15px;
  border-bottom: 1px solid rgba(100, 150, 255, 0.25);
  margin-bottom: 20px;

  .currentDate {
    font-size: 1.4rem;
    font-weight: bold;
    color: #b8c0ff;
    letter-spacing: 1px;
  }

  .icons {
    display: flex;
    gap: 15px;
    
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      background: rgba(70, 90, 150, 0.3);
      color: #b8c0ff;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(100, 130, 255, 0.4);
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(100, 150, 255, 0.5);
      }
    }
  }
`;

export const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const DaysHeader = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 10px 0;
  width: 100%;
  font-weight: 600;
  text-align: center;
  color: #8a96ff;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;

  @media(max-width: 380px){
    font-size: 0.6rem;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%;
  margin-top: 5px;
`;

export const DayItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 50%;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  background: rgba(30, 40, 100, 0.3);
  color: #d0d5ff;
  border: 1px solid rgba(80, 100, 200, 0.1);

  &.has-quest::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #64ffda;
    box-shadow: 0 0 8px rgba(100, 255, 218, 0.7);
  }

  &:hover {
    background: rgba(60, 80, 180, 0.4);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(50, 70, 200, 0.3);
  }

  &.today {
    background: linear-gradient(135deg, #4d54e8, #8086ff);
    color: white;
    font-weight: bold;
    box-shadow: 0 0 15px rgba(100, 110, 255, 0.6);
    border: none;
  }

  &.selected {
    background: linear-gradient(135deg, #7742e6, #a57bff);
    color: white;
    transform: scale(1.1);
    font-weight: bold;
    box-shadow: 0 0 20px rgba(140, 100, 255, 0.7);
    border: none;
    z-index: 1;
  }

  &.inactive {
    background: rgba(20, 30, 70, 0.2);
    color: #555;
    border: none;
    cursor: default;

    &:hover {
      background: rgba(20, 30, 70, 0.2);
      transform: none;
      box-shadow: none;
    }
  }
`;

export const DayDetails = styled.div`
  margin-top: 40px;
  background: rgba(15, 20, 60, 0.5);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 10, 50, 0.35);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(100, 120, 255, 0.18);
  width: 100%;
  max-width: 800px;
  margin: 40px auto 0;
`;

export const DayHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8c0ff;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(100, 150, 255, 0.25);
  margin-bottom: 20px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const EventsSection = styled.section`
  p {
    color: #a0a8e0;
    font-style: italic;
  }

  h3 {
    font-size: 1.3rem;
    color: #8a96ff;
    margin-bottom: 15px;
    font-weight: 600;
  }

  @media(max-width: 530px) {
    h3 {
      font-size: 0.9rem;
    } 
    p{
      font-size: 0.7rem;
    }
  }
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const QuestItem = styled.div<{ status: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${({ status }) =>
    status === "Completed" ? "rgba(100, 255, 150, 0.3)" : 
    status === "In Progress" ? "rgba(255, 210, 100, 0.3)" : 
    "rgba(255, 100, 100, 0.3)"};
  
  background: ${({ status }) =>
    status === "Completed" ? "rgba(30, 100, 60, 0.2)" : 
    status === "In Progress" ? "rgba(100, 80, 20, 0.2)" : 
    "rgba(100, 30, 30, 0.2)"};
  
  box-shadow: 0 5px 15px ${({ status }) =>
    status === "Completed" ? "rgba(70, 200, 120, 0.15)" : 
    status === "In Progress" ? "rgba(200, 170, 70, 0.15)" : 
    "rgba(200, 70, 70, 0.15)"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${({ status }) =>
      status === "Completed" ? "rgba(70, 200, 120, 0.25)" : 
      status === "In Progress" ? "rgba(200, 170, 70, 0.25)" : 
      "rgba(200, 70, 70, 0.25)"};
  }
`;

export const EventContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const EventTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #e0e4ff;
  margin: 0;
`;

export const QuestStatus = styled.p<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 5px 0;
  
  background: ${({ status }) =>
    status === "Completed" ? "rgba(40, 167, 69, 0.2)" : 
    status === "In Progress" ? "rgba(255, 193, 7, 0.2)" : 
    "rgba(220, 53, 69, 0.2)"};
  
  color: ${({ status }) =>
    status === "Completed" ? "#4ade80" : 
    status === "In Progress" ? "#fbbf24" : 
    "#f87171"};
  
  border: 1px solid ${({ status }) =>
    status === "Completed" ? "rgba(40, 167, 69, 0.3)" : 
    status === "In Progress" ? "rgba(255, 193, 7, 0.3)" : 
    "rgba(220, 53, 69, 0.3)"};
`;

export const EventDescription = styled.p`
  font-size: 0.95rem;
  color: #a0a8e0;
  margin: 5px 0;
`;

export const QuestReward = styled.p`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #ffd700;
  margin: 5px 0;
  
  &:before {
    content: "✨";
    margin-right: 5px;
  }
`;

export const ViewButton = styled.button`
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  border: none;
  padding: 12px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(50, 80, 200, 0.3);
  margin-left: 15px;

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 20px rgba(70, 100, 255, 0.5);
    background: linear-gradient(135deg, #4895ef, #4361ee);
  }

  span {
    font-size: 1.3rem;
  }

  @media(max-width: 530px) {
    width: 30px;
    height: 30px;
    
    span{
      font-size: 1rem;
    }
  }
`;