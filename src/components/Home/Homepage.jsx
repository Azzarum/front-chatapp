import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [signupFormData, setSignupFormData] = useState({
    nom: '',
    prenom: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    created_at: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [tabValue, setTabValue] = useState(0);

  const handleSignupChange = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      
      const updatedFormData = {
        ...signupFormData,
        created_at: currentDateTime
      };

      const response = await fetch('http://localhost:8080/user/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });
      const data = await response.json();
      console.log('User created:', data);
    
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData)
      });
      const data = await response.json();
      console.log('User logged in:', data);
    
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

          {tabValue === 0 && (
            <>
              <Typography variant="h4" gutterBottom>Inscription</Typography>
              <form onSubmit={handleSignupSubmit}>
                <TextField
                  id="prenom"
                  name="prenom"
                  label="Prénom"
                  variant="outlined"
                  value={signupFormData.prenom}
                  onChange={handleSignupChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="nom"
                  name="nom"
                  label="Nom"
                  variant="outlined"
                  value={signupFormData.nom}
                  onChange={handleSignupChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="username"
                  name="username"
                  label="Nom d'utilisateur"
                  variant="outlined"
                  value={signupFormData.username}
                  onChange={handleSignupChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Adresse e-mail"
                  variant="outlined"
                  value={signupFormData.email}
                  onChange={handleSignupChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="Téléphone"
                  variant="outlined"
                  value={signupFormData.phone}
                  onChange={handleSignupChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                <Button type="submit" variant="contained" color="primary">S'inscrire</Button>
              </form>
            </>
          )}
          {tabValue === 1 && (
            <>
              <Typography variant="h4" gutterBottom>Connexion</Typography>
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  id="username"
                  name="username"
                  label="Nom d'utilisateur"
                  variant="outlined"
                  value={loginFormData.username}
                  onChange={handleLoginChange}
                  fullWidth
                  required
                  sx={{ marginBottom: '16px' }}
                />
                {/* Ajouter les autres champs pour le formulaire de connexion ici */}
                <Button type="submit" variant="contained" color="primary">Se connecter</Button>
              </form>
            </>
          )}
          <Button onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}>
            {tabValue === 0 ? "Vous avez un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
