import { Outlet } from "react-router-dom"
import { Header } from "../components/header"
import ErrorBoundary from "../components/ErrorBoundary"
import styled from "styled-components"
import { Toaster } from "sonner"
export const MainPage = () => {
    
    return (
        <>
            <Toaster />
            <Header />
            <ErrorBoundary>
            <AnimationSlideIn>
            <Outlet />
            </AnimationSlideIn>
            
            </ErrorBoundary>
        </>
    )
}

const AnimationSlideIn = styled.div`
    animation: slideInLeft 0.75s ease-out;
`