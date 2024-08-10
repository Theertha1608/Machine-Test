import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Box, Button, Typography, Container, useTheme } from '@mui/material';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const theme = useTheme();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 800,
                    height: 500,
                    display: 'flex',
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden',
                }}
            >
              
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRight: '1px solid',
                        borderColor: theme.palette.grey[300],
                        transition: 'background-color 0.3s',
                        order: isLogin ? 1 : 2,
                    }}
                >
                    {isLogin ? <LoginForm /> : <SignupForm />}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: isLogin ? theme.palette.primary.main : theme.palette.primary.main,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 3,
                        transition: 'background-color 0.3s',
                        order: isLogin ? 2 : 1,
                    }}
                >
                    {isLogin ? (
                        <>
                            <Typography variant="h4" gutterBottom>Login</Typography>
                            <Typography variant="body1">Welcome back! Please log in to your account.</Typography>
                            <Button variant="contained" color="secondary" onClick={toggleForm} sx={{ mt: 2 }}>
                                Don't have an account? Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom>Sign Up</Typography>
                            <Typography variant="body1">Create a new account to get started.</Typography>
                            <Button variant="contained" color="secondary" onClick={toggleForm} sx={{ mt: 2 }}>
                                Already have an account? Login
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default AuthForm;

