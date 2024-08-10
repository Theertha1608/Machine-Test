import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {
            setError('Username is required.');
            return;
        }

        if (!email) {
            setError('Email is required.');
            return;
        }

        if (!password) {
            setError('Password is required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setLoading(true);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Signup successful:', data);
                alert('Signup successful!');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch(() => {
                setError('Error during signup');
                alert('Error during signup');
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 350 }}>
            <Typography variant="h5" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={() => handleBlur('username')}
                        error={touched.username && !username}
                        helperText={touched.username && !username ? 'Username is required.' : ''}
                    />
                </Box>
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
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        error={touched.confirmPassword && password !== confirmPassword}
                        helperText={touched.confirmPassword && password !== confirmPassword ? 'Passwords do not match.' : ''}
                    />
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </Box>
    );
};

export default SignupForm;
