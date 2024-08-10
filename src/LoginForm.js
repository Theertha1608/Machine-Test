import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        setError('');
        setLoading(true);
        fetch('http://localhost:5000/users')
            .then((response) => response.json())
            .then((data) => {
                const user = data.find(
                    (user) => user.email === email && user.password === password
                );
                if (user) {
                    console.log('Login successful:', user);
                    alert('Login successful!');
                    setEmail('');
                    setPassword('');
                } else {
                    setError('Invalid email or password');
                    alert('Invalid email or password');
                }
            })
            .catch(() => {
                setError('Error during login');
                alert('Error during login');
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 350 }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        error={touched.email && !email}
                        helperText={touched.email && !email ? 'Email is required.' : ''}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        error={touched.password && !password}
                        helperText={touched.password && !password ? 'Password is required.' : ''}
                    />
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
