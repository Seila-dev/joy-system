import { Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/mainpage"
import { Home } from "../components/home"
import { QuestSystem } from "../components/quest-system"
import { SignIn } from "../components/signin"
import { SignUp } from "../components/signUp"
import { UserPage } from "../components/userPage"
import { JoysStore } from "../components/joysStore"
import { NotFound } from "../pages/NotFound"
import { NotesSystem } from "../components/notesSystem"
import { DetailedNote } from "../components/detailedNote"
import CalendarPage from "../components/calendarPage"
import App from "../pages/Landing/app"
import { HabitPage } from "../components/habitPage"
import { HabitDetail } from "../components/habitDetail"

function AppRoutes() {

  return (
    <Routes>
      <Route path="/dashboard" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="quests" element={<QuestSystem />} />
        <Route path="notes" element={<NotesSystem />} />
        <Route path="notes/:id" element={<DetailedNote />} />
        <Route path="store" element={<JoysStore />} />
        <Route path="user" element={<UserPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="habits" element={<HabitPage />} />
        <Route path="habits/:id" element={<HabitDetail />} />
      </Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
