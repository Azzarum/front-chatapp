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
    const fetchUserInfo = async () => {
      try {
        // Remplacez cet appel fetch par votre requête à la base de données
        const response = await fetch('http://localhost:8080/user/getuser/{id}');
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SlideConnect
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/chat" color="inherit">Chat</Button>
        <Button component={Link} to="/profil" color="inherit">logout</Button>
        {/* Afficher les informations de l'utilisateur si l'utilisateur est connecté */}
        {Object.keys(userInfo).length > 0 && ( // Vérifie si userInfo contient des données
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
