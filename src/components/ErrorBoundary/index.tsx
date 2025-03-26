import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Atualiza o estado para que o próximo renderizado mostre a UI de fallback
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Você pode logar o erro para um serviço externo
        console.error("Erro capturado por ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // UI de fallback quando ocorre um erro
            return <h1>Algo deu errado. Tente novamente mais tarde.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
