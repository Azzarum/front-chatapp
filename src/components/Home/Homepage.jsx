import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Grid, Typography, Box, Tabs, Tab } from '@mui/material';
import { baseurl } from '../../utils/requetes.js';
import { useNavigate } from 'react-router-dom'; 

const AuthForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toISOString();   
      const formDataWithDate = { ...formData, created_at: currentDate };   
      const response = await fetch(baseurl + 'loginAndAuthentification/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithDate)
      });
      const data = await response.json();
      console.log('User created:', data);
      onLogin(); // Appel de la fonction onLogin lorsque l'inscription est réussie
      navigate('/chat'); // Navigation vers la page de chat après l'inscription
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/loginAndAuthentification/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User logged in:', data);
  
        
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('nom', data.nom);
        localStorage.setItem('id', data.id);
        localStorage.setItem('isAuthenticated', data.isAuthenticated);
        localStorage.setItem('token', data.token);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('prenom', data.prenom);
  
        // Appel de la fonction onLogin lorsque la connexion est réussie
        onLogin();
  
        // Navigation vers la page de chat après la connexion
        navigate('/chat');
      } else {
        const jsonResponse = await response.json();
        console.error('Error logging in:', jsonResponse);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <img src="https://source.unsplash.com/random" alt="Random" style={{ width: '100%', height: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ p: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Connexion" />
            <Tab label="Inscription" />
          </Tabs>
          <motion.div
            key={tabValue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tabValue === 0 ? (
              <form onSubmit={handleLoginSubmit}>
                <Typography variant="h4" gutterBottom>Connexion</Typography>
                <TextField
                  id="email"
                  name="email"
                  label="Adresse e-mail"
                  variant="outlined"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Mot de passe"
                  variant="outlined"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <Button type="submit" variant="contained" color="primary">Se connecter</Button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <Typography variant="h4" gutterBottom>Inscription</Typography>
                <TextField
                  id="username"
                  name="username"
                  label="Nom d'utilisateur"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="firstName"
                  name="firstName"
                  label="Prénom"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Nom de famille"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Adresse e-mail"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Téléphone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Mot de passe"
                  variant="outlined"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <Button type="submit" variant="contained" color="primary">S'inscrire</Button>
              </form>
            )}
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
