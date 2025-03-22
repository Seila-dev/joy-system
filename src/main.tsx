import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/App.tsx'
import { GlobalStyle } from './styles/GlobalStyle.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { QuestProvider } from './contexts/QuestContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuestProvider >
         <GlobalStyle />
        <AppRoutes />
        </QuestProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
