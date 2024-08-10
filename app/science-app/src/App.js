import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

// Import Components
import CreateUser from "./Components/create-user.component";
import EditUser from "./Components/edit-user.component";
import UserList from "./Components/user-list.component";
import LoginForm from "./Components/LoginForm";
import LandingPage from "./Components/LandingPage";
import UploadLink from "./Components/UploadLink";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch(
        "https://science-app-server-df7502eefe68.herokuapp.com/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>
                <Link to={user ? "/dashboard" : "/login"} className="nav-link">
                  Biblioteca de la Cienciología
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  {user ? (
                    <>
                      <Nav>
                        <Link to="/dashboard" className="nav-link">
                          Documentos
                        </Link>
                      </Nav>
                      <Nav>
                        <Link to="/upload-link" className="nav-link">
                          Subir Enlace
                        </Link>
                      </Nav>
                      {user.permissions.includes("admin") && (
                        <Nav>
                          <Link to="/user-list" className="nav-link">
                            Lista de Usuarios
                          </Link>
                        </Nav>
                      )}
                      <Nav>
                        <Link onClick={handleLogout} className="nav-link">
                          Cerrar Sesión {user.name}
                        </Link>
                      </Nav>
                    </>
                  ) : (
                    <>
                      <Nav>
                        <Link to="/create-user" className="nav-link">
                          Crear Usuario
                        </Link>
                      </Nav>
                      <Nav>
                        <Link to="/login" className="nav-link">
                          Iniciar Sesión
                        </Link>
                      </Nav>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Routes>
            <Route path="/create-user" element={<CreateUser user={user} />} />
            <Route
              exact
              path="/login"
              element={
                user ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginForm handleLogin={handleLogin} />
                )
              }
            />
            {user && (
              <>
                <Route
                  path="/edit-user/:id"
                  element={<EditUser user={user} />}
                />
                <Route path="/user-list" element={<UserList user={user} />} />
                <Route
                  path="/dashboard"
                  element={<LandingPage user={user} />}
                />
                <Route path="/upload-link" element={<UploadLink />} />
                <Route path="/" element={<LandingPage user={user} />} />
              </>
            )}
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
