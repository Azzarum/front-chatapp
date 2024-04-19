import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MuiAlert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    margin: '0 auto',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AddContactForm = ({ onAddContact }) => {
  const classes = useStyles();
  const [contactIdentifier, setContactIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/contact/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactIdentifier }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
  
      setIsSnackbarOpen(true);
      setErrorMessage('Contact ajouté avec succès');
    } catch (error) {
      setIsSnackbarOpen(true);
      setErrorMessage('Erreur lors de l\'ajout du contact');
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Ajouter un contact</Typography>
      <form className={classes.form} onSubmit={handleAddContact}>
        <TextField
          className={classes.textField}
          label="E-mail ou téléphone"
          variant="outlined"
          value={contactIdentifier}
          onChange={(e) => setContactIdentifier(e.target.value)}
          required
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Ajouter
        </Button>
      </form>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={errorMessage ? 'error' : 'success'}
        >
          {errorMessage ? errorMessage : 'Contact ajouté avec succès'}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddContactForm;
