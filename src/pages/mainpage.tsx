import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import ErrorBoundary from "../components/ErrorBoundary";
import styled from "styled-components";
import { Toaster } from "sonner";
import { MenuBurguer } from "../components/menuburguer";
import { useEffect, useState, useCallback } from "react";

export const MainPage = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle window resize with debounce
    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width <= 670) {
            setIsMobile(true);
            setCollapsed(false);
            setMenuOpen(false);
        } else if (width <= 900) {
            setIsMobile(false);
            setCollapsed(true);
            setMenuOpen(true);
        } else {
            setIsMobile(false);
            setCollapsed(false);
            setMenuOpen(true);
        }
    }, []);

    useEffect(() => {
        handleResize();
        
        // Debounced resize handler to improve performance
        let resizeTimer: number;
        const debouncedResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 100);
        };
        
        window.addEventListener("resize", debouncedResize);
        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", debouncedResize);
        };
    }, [handleResize]);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    const toggleCollapse = useCallback(() => {
        setCollapsed(prev => !prev);
    }, []);

    // For Header component to toggle menu on mobile
    const handleMenuButtonClick = useCallback(() => {
        if (isMobile) {
            toggleMenu();
        }
    }, [isMobile, toggleMenu]);

    return (
        <>
            <Toaster />
            <PageContainer>
                <SideNavContainer 
                    $collapsed={collapsed} 
                    $menuOpen={menuOpen}
                    $isMobile={isMobile}
                >
                    <MenuBurguer
                        active={true} // Always active, visibility controlled by container
                        toggleCollapse={toggleCollapse}
                        collapsed={collapsed}
                    />
                </SideNavContainer>
                
                {isMobile && menuOpen && (
                    <Overlay onClick={toggleMenu} />
                )}
                
                <ContentArea 
                    $collapsed={collapsed} 
                    $menuOpen={menuOpen}
                    $isMobile={isMobile}
                >
                    <Header 
                        showMenuButton={isMobile} 
                        onMenuClick={handleMenuButtonClick}
                    />
                    <ErrorBoundary>
                        <AnimationSlideIn>
                            <Outlet />
                        </AnimationSlideIn>
                    </ErrorBoundary>
                </ContentArea>
            </PageContainer>
        </>
    );
};

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    pointer-events: all;
`;

const SideNavContainer = styled.div<{ 
    $collapsed: boolean;
    $menuOpen: boolean;
    $isMobile: boolean;
}>`
    width: ${props => {
        if (!props.$menuOpen) return '0';
        if (props.$collapsed) return '80px';
        return '300px';
    }};
    max-width: ${props => props.$isMobile ? '85%' : '300px'};
    transition: width 0.3s ease, transform 0.3s ease;
    background-color: #1e1e2f;
    color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;
    transform: ${props => (!props.$menuOpen && props.$isMobile) ? 'translateX(-100%)' : 'translateX(0)'};
    box-shadow: ${props => (props.$menuOpen && props.$isMobile) ? '2px 0 8px rgba(0,0,0,0.2)' : 'none'};

    @media(max-width: 670px) {
        z-index: 9999;
    }
`;

const ContentArea = styled.div<{ 
    $collapsed: boolean;
    $menuOpen: boolean;
    $isMobile: boolean;
}>`
    margin-left: ${props => {
        if (props.$isMobile) return '0';
        if (!props.$menuOpen) return '0';
        if (props.$collapsed) return '80px';
        return '300px';
    }};
    transition: margin-left 0.3s ease;
    flex-grow: 1;
    overflow-y: auto;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const AnimationSlideIn = styled.div`
    animation: slideInLeft 0.75s ease-out;

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-10%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;