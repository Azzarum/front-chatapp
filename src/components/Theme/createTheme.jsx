import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#222831', // Utilisez cette couleur comme couleur principale
    },
    secondary: {
      main: '#393E46', // Utilisez cette couleur comme couleur secondaire
    },
    info: {
      main: '#00ADB5', // Utilisez cette couleur pour des informations ou des actions spéciales
    },
    background: {
      default: '#00FFF5', // Utilisez cette couleur comme couleur de fond par défaut
    },
  },
});

export default theme;
