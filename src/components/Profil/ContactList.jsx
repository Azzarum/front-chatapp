import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Effectue une requête HTTP vers votre backend pour récupérer les contacts
    fetch('http://localhost:6060/contact/all')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>Liste de contacts</Typography>
      <List>
        {contacts.map(contact => (
          <React.Fragment key={contact.id}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt={contact.name} src={contact.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.email}
                primaryTypographyProps={{ variant: 'subtitle1' }} 
                secondaryTypographyProps={{ variant: 'body2' }} 
              />
              
              <ListItemText
                primary={contact.phone} 
                primaryTypographyProps={{ variant: 'subtitle1', color: 'textSecondary' }} 
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default ContactList;
