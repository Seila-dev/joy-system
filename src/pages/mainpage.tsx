import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import ErrorBoundary from "../components/ErrorBoundary"
export const MainPage = () => {
    
    return (
        <>
            <Header />
            <ErrorBoundary>
            <Outlet />
            </ErrorBoundary>
        </>
    )
}