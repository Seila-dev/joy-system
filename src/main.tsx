import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/App.tsx'
import { GlobalStyle } from './styles/GlobalStyle.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { QuestProvider } from './contexts/QuestContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { JoysProvider } from './contexts/JoysContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JoysProvider>
          <QuestProvider >
            <ThemeProvider>
              <GlobalStyle />
              <AppRoutes />
            </ThemeProvider>
          </QuestProvider>
        </JoysProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
