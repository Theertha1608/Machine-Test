import React from 'react';
import AuthForm from './AuthForm';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', 
    },
    secondary: {
      main: '#c2185b', 
    },
  },
  components: {

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#00796b',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#004d40', 
          },
        },
        containedSecondary: {
          backgroundColor: '#c2185b',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#880e4f', 
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <div className="App">
        <AuthForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
