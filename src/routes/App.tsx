import { Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/mainpage"
import { Home } from "../components/home"
import { QuestSystem } from "../components/quest-system"
import { SignIn } from "../components/signin"
import { SignUp } from "../components/signUp"

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="/quests" element={<QuestSystem />} />
      </Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}

export default AppRoutes
