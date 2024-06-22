// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Import Components
import CreateUser from './Components/create-user.component';
import EditUser from './Components/edit-user.component';
import UserList from './Components/user-list.component';
import LoginForm from './Components/LoginForm';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .post('http://localhost:4000/verify-token', { token })
                .then((response) => {
                    if (response.status === 200) {
                        setUser(response.data.user);
                    }
                })
                .catch((err) => {
                    console.error('Token verification failed:', err);
                });
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                <Link to={user ? '/user-list' : '/login'} className="nav-link">
                                    Biblioteca de la Cienciología
                                </Link>
                            </Navbar.Brand>

                            <Nav className="justify-content-end">
                                {user ? (
                                    <>
                                        <Nav>
                                            <Link to="/user-list" className="nav-link">
                                                Usuarios
                                            </Link>
                                        </Nav>
                                        <Nav>
                                            <Link to="/create-user" className="nav-link">
                                                Crear Usuario
                                            </Link>
                                        </Nav>
                                        <Nav>
                                            <Link onClick={handleLogout} className="nav-link">
                                                Cerrar Sesión {user.name}
                                            </Link>
                                        </Nav>
                                    </>
                                ) : (
                                    <Nav>
                                        <Link to="/login" className="nav-link">
                                            Iniciar Sesión
                                        </Link>
                                    </Nav>
                                )}
                            </Nav>
                        </Container>
                    </Navbar>
                </header>

                <Container>
                    <Routes>
                        <Route
                            exact
                            path="/login"
                            element={<LoginForm handleLogin={handleLogin} />}
                        />
                        {user && (
                            <>
                                <Route path="/create-user" element={<CreateUser />} />
                                <Route path="/edit-user/:id" element={<EditUser />} />
                                <Route path="/user-list" element={<UserList />} />
                                <Route path="/" element={<UserList />} />
                            </>
                        )}
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

export default App;
