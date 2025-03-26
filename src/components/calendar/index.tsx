import { useEffect, useState } from "react"
import styled from "styled-components"

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState<string>('');
    const [days, setDays] = useState<number[]>([])
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    } 


    let date = new Date;
    const today = date.getDate()
    const currentMonthDate = date.getMonth()

    const getDaysInMonth = (month: number, year: number) => {
        const lastDateofMonth = new Date(year, month + 1, 0).getDate()
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        let daysArray = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(0);
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            daysArray.push(i);
        }
        return daysArray;
    }

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    function prevMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    useEffect(() => {
        const actualDate = `${months[currentMonth]} ${currentYear}`;
        setCurrentDate(actualDate)
        setDays(getDaysInMonth(currentMonth, currentYear))
    }, [currentMonth, currentYear])

    return (
        <>
            <CalendarContainer active={openMenu}>
                <div className="calendar-container">
                    <header>
                        <p className="currentDate">{currentDate}</p>
                        <div className="icons">
                            <span className="material-symbols-outlined" id="prev" onClick={() => prevMonth()} >
                                chevron_left
                            </span>
                            <span className="material-symbols-outlined" id="next" onClick={() => nextMonth()}>
                                chevron_right
                            </span>
                        </div>
                    </header>
                    <div className="calendar">
                        <ul className="weeks">
                            <li>Dom</li>
                            <li>Seg</li>
                            <li>Ter</li>
                            <li>Qua</li>
                            <li>Qui</li>
                            <li>Sex</li>
                            <li>Sab</li>
                        </ul>
                        { }
                        <ul className="days">
                            {days.map((day, index) => (
                                day === 0 ? (
                                    <li key={index} className="inactive"></li>
                                ) : (
                                    <li key={index} className={day === today && currentMonth === currentMonthDate ? 'active' : ''}>
                                        {day}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                    <div className="tasks">
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>

                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>

                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>

                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <div className="task">
                            <div className="time">10:30</div>
                            <div className="taskBody">
                                <div className="flexContainer alignCenter">
                                    <span className="material-symbols-outlined icon" >
                                        person
                                    </span>
                                    <div className="taskInfo">
                                        <h3 className="title">Estudar mátematica</h3>
                                        <p className="description">10:30 - <span className="status pending">Pendente</span></p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined infoIcon">
                                    more_vert
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            <ToggleCalendar onClick={toggleMenu} openMenu={openMenu}>
                <span className="material-symbols-outlined">
                    calendar_month
                </span>
            </ToggleCalendar>
            </CalendarContainer>

        </>
    )
}

const CalendarContainer = styled.div<{ active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 450px;
    background: #fcfcfc;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    height: 600px;
    border-radius: 10px;
    transform: ${props => (props.active ? 'translateX(0%)' : 'translateX(103%)')};
    user-select: none;
    transition: 0.35s ease-in-out;
    position: fixed;
    right: 10px;
    top: 80px;
    margin: 0 0 0 50px;
    .calendar-container{
        overflow-y: auto;
        margin-bottom: 50px;
    }
    .calendar-container::-webkit-scrollbar {
        width: 50px;
    }

    .flexContainer{
        display: flex;
    }
    .alignCenter{
        align-items: center;
    }
    header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 30px 10px;
        width: 100%;
    }
    header .currentDate{
        font-size: 1.45rem;
        font-weight: 500;
    }
    header .icons span{
        width: 38px;
        height: 38px;
        color: #878787;
        font-size: 1.9rem;
        margin: 0 1px;
        text-align: center;
        line-height: 38px;
        border-radius: 50%;
        cursor: pointer;
        &:hover{
            background: #f2f2f2
        }
    }
    header .icons span:last-child{
        margin-right: -10px;
    }
    .calendar{
        padding: 20px;
    }
    .calendar ul{
        display: flex;
        flex-wrap: wrap;
        text-align: center;
    }
    .calendar .days{
        margin-bottom: 20px;
    }
    .calendar .weeks li{
        font-weight: 500;
    }
    .calendar ul li{
        position: relative;
        width: calc(100% / 7);
    }
    .calendar .days li{
        cursor: pointer;
        margin-top: 30px;
        z-index: 1;
    }
    .days li.inactive{
        color: #aaa;
    }
    .days li.active{
        color: #fff;
    }
    .calendar .days li::before{
        position: absolute;
        content: "";
        height: 40px;
        width: 40px;
        top: 50%;
        left: 50%;
        z-index: -1;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    .days li:hover::before{
        background: #f2f2f2;
    }
    .days li.active::before{
        background: var(--secondary);
    }
    .tasks{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px;
    }
    .tasks .task{
        display: flex;
        flex-direction: column;
        background: white;
        margin-bottom: 15px;
        
    }
    .tasks .task .time{
        padding: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        
    }
    .tasks .task .time::after{
        content: "";
        width: 100%;
        height: 0;
        margin-left: 10px;
        border: 1px dashed black;
        display: flex;
        flex-direction: row;
    }
    .tasks .task .icon{
        margin: 10px 20px 10px 10px;
    }
    .tasks .task .taskBody{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tasks .task .taskBody .taskInfo .title{
        font-size: 15px;
    }
    .tasks .task .taskBody .taskInfo .description{
        font-size: 12px;
        opacity: 0.5;
    }
    .tasks .task .infoIcon{
        cursor: pointer;
    }

    @media(max-width: 450px){
        height: 100%;
        position: fixed;
        top: 50px;
        margin: 0;
        right: 0;

        .calendar-container{
            //height: 800px;
            height: 800px;
            border: 1px solid black;
        }
        .tasks{
            height: fit-content;
        }
    }
`

const ToggleCalendar = styled.div<{ openMenu: boolean }>`
    width: 60px;
    height: 80px;
    z-index: -1;
    background: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: -13.5%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    overflow-y: visible;
    overflow: visible;
    border: 1px solid black;

    
    @media(max-width: 450px){
        top: ${({ openMenu }) => (openMenu ? "-40px" : "35%")};
        width: ${({ openMenu }) => (openMenu ? "80px" : "40px")};
        height: 40px;
        overflow: visible;
        left: ${({ openMenu }) => (openMenu ? "50%" : "0")};
        transform: ${({ openMenu }) => (openMenu ? "translateX(-50%)" : "translateX(-100%)")};
    }
`