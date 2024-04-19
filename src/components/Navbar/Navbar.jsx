import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:6060/loginAndAuthentification/verifyToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUserInfo(userData);
          } else {
            console.error('Erreur lors de la vérification du token:', response.status);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du token:', error);
        }
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SlideConnect
        </Typography>
        <Button component={Link} to="/chat" color="inherit">Chat</Button>
        <Button component={Link} to="/profil" color="inherit">mon profil</Button>
     
        {Object.keys(userInfo).length > 0 && ( 
          <>
            <Avatar alt="Avatar" src={userInfo.avatar} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {userInfo.fullName}
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
