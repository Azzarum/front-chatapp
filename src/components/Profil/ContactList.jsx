import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';

const ContactList = () => {
  const contacts = [
    { id: 1, name: 'Alice', email: 'alice@example.com', imageUrl: 'https://source.unsplash.com/random', phone: '123456789' },
    { id: 2, name: 'Bob', email: 'bob@example.com', imageUrl: 'https://source.unsplash.com/random', phone: '987654321' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', imageUrl: 'https://source.unsplash.com/random', phone: '555555555' },
  ];

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
