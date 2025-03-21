import { Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/mainpage"
import { Home } from "../components/home"
import { QuestSystem } from "../components/quest-system"

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="/quests" element={<QuestSystem />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
