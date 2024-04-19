import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Grid, Typography, Box, Tabs, Tab } from '@mui/material';
import { baseurl } from '../../utils/requetes.js';
import { useNavigate } from 'react-router-dom'; 

const AuthForm = ({ onLogin }) => {
    const [message, setMessage] = useState("");
    
    const history = useNavigate();
  
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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      // Authentification
      const response = await fetch(
        "http://localhost:8080/loginAndAuthentification/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const accessToken = jsonResponse.token;
        const refreshToken = jsonResponse.refreshToken;
        const nom = jsonResponse.nom;
        const email = jsonResponse.email;
        const prenom = jsonResponse.prenom;
        const phone = jsonResponse.phone;
          
        localStorage.setItem("nom", nom);
        localStorage.setItem("email", email);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("prenom", prenom);
        localStorage.setItem("phone", phone);
        localStorage.setItem("tokenExpiration", Date.now() + 3600000); // 1 heure
        setMessage("Authentification réussie !");
        history("/Profil");
        onLogin();
      } else {
        setMessage("Échec de l'authentification. Veuillez réessayer.");
      }
    } catch (error) {
      setMessage("Échec de l'authentification. Veuillez réessayer.");
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
              <form onSubmit={handleSubmit}>
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