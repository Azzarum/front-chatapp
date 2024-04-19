import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme/createTheme';
import ProfilePage from './components/Profil/Profil';
import Register from './components/Login/FormRegister';
import ChatPage from './components/Chat/Chatpage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
      {isAuthenticated && <Navbar />}
        <Routes>
        <Route path="/profil" element={<ProfilePage />} />
          <Route path="/" element={<Register onLogin={handleLogin} />} />
          <Route path="/chat" element={<ChatPage />} />          
          <Route path="/chat" element={isAuthenticated ? (
            <>
              <ProfilePage />
            </>
          ) : (
            <Navigate to="/" />
          )} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
