import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './globalstyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import QuestSection from './QuestSection';
import JoyStore from './JoyStore';
import AIPrompt from './AiPrompt';
import Calendar from './Calendar';
import Footer from './Footer';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />
        <Hero />
        <Features />
        <QuestSection />
        <JoyStore />
        <AIPrompt />
        <Calendar />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;