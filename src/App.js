// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import ChatPage from './components/Chat/Chatpage';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme/createTheme'; // Import du thème Material UI

const App = () => {
  return (
    <ThemeProvider theme={theme}> {/* Envelopper toute l'application avec le thème */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
