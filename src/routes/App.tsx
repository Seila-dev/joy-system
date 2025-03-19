import { Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/mainpage"
import { Home } from "../components/home"

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
