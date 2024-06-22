// src/Components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name);
                handleLogin(response.data);
                navigate('/user-list'); // Redirect to user list or dashboard
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className="text-danger">{error}</p>}
            <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </FormGroup>
            <FormGroup controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </FormGroup>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default LoginForm;
