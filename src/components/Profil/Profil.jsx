import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button, Grid, Paper, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContactList from './ContactList';
import { useNavigate } from 'react-router-dom';
import { Phone } from '@mui/icons-material';
import AddContactForm from '../Contact/AddContactForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  addContactForm: {
    marginTop: theme.spacing(4),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (!isAuthenticated) {
      navigate('/'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    } else {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convertir en secondes

      if (tokenExpiration && currentTimestamp >= tokenExpiration) {
        // Le jeton a expiré, renouveler le jeton
       
      } else {
        // Le jeton est encore valide, récupérer les informations de l'utilisateur depuis le local storage
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storedNom = localStorage.getItem('nom');
        const storedId = localStorage.getItem('id');
        const phone = localStorage.getItem('phone');
        const prenom = localStorage.getItem('prenom');

        setUserInfo({
          username: storedUsername,
          email: storedEmail,
          nom: storedNom,
          id: storedId,
          isAuthenticated: isAuthenticated,
          phone: phone,
          prenom: prenom,
        });
      }
    }
  }, [navigate]);


  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} alt="Profile Picture" src={userInfo.avatar} />
            <Typography variant="h4">{userInfo.username}</Typography>
            <Typography variant="body1" color="textSecondary">{userInfo.email}</Typography>
            <Typography variant="body1" color="textSecondary"><Phone /> {userInfo.phone}</Typography>
            <Typography variant="body1">{userInfo.prenom + ' ' + userInfo.nom}</Typography>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => navigate('/profil')}>Modifier le profil</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <ContactList />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} className={classes.addContactForm}>
          <Card className={classes.card}>
            <CardContent>
              <AddContactForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
