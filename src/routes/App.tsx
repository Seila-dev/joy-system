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

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="/quests" element={<QuestSystem />} />
        <Route path="/notes" element={<NotesSystem />} />
        <Route path="/notes/:id" element={<DetailedNote />} />
        <Route path="/store" element={<JoysStore />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
