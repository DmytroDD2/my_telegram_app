import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({acess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/register', {
                username,
                password,
            });

            if (response.status === 201) {
                setSuccess('Registration successful! You can now log in.');
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password,
            });
            console.log(response.status)
            if (response.status === 200) {
                const token = response.data.access_token; // Отримати токен із відповіді
                localStorage.setItem('access_token', token); // Зберегти токен в Local Storage
                setSuccess('Login successful!');
                setUsername('');
                setPassword('');
                acess()
                
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Authentication</h2>
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="centr-bottom" >
                    <button  type="button" onClick={handleRegister}>
                        Register
                    </button>
                    
                    <button  type="button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AuthForm;
