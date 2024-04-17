import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Supprimez useNavigate
import HomePage from './components/Home/Homepage';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme/createTheme';
import ProfilePage from './components/Profil/Profil';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage onLogin={handleLogin} />} />
          <Route path="/chat" element={isAuthenticated ? <ProfilePage/> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
