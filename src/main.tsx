import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/App.tsx'
import { GlobalStyle } from './styles/GlobalStyle.ts'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { QuestProvider } from './contexts/QuestContext.tsx'
import { JoysProvider } from './contexts/JoysContext.tsx'
import { ProductProvider } from './contexts/ProductContext.tsx'
import { NoteProvider } from './contexts/NotesContext.tsx'
import { HabitProvider } from './contexts/HabitContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <JoysProvider>
          <NoteProvider>
            <QuestProvider>
              <ProductProvider>
                <HabitProvider>
                <GlobalStyle />
                <AppRoutes />
                </HabitProvider>
              </ProductProvider>
            </QuestProvider>
          </NoteProvider>
        </JoysProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
