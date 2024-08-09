import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill out all fields');
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
                } else {
                    setError('Invalid email or password');
                }
            })
            .catch(() => setError('Error during login'))
            .finally(() => setLoading(false));
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
