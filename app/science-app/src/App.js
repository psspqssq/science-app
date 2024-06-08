//App.js
// Import React
import React from "react";
 
// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
    from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
 
// Import Custom CSS
import "./App.css";
 
// Import from react-router-dom
import {
    BrowserRouter as Router, Routes,
    Route, Link
} from "react-router-dom";
 
// Import other React Component
import CreateUser from
    "./Components/create-user.component";
import EditUser from
    "./Components/edit-user.component";
import UserList from
    "./Components/user-list.component";
 
// App Component
const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>
                                <Link to={"/create-user"}
                                    className="nav-link">
                                    Biblioteca de la Cienciología
                                </Link>
                            </Navbar.Brand>
 
                            <Nav className="justify-content-end">
                                <Nav>
                                    <Link to={"/create-user"}
                                        className="nav-link">
                                        Crear Usuario
                                    </Link>
                                </Nav>
 
                                <Nav>
                                    <Link to={"/user-list"}
                                        className="nav-link">
                                        Lista de Usuarios
                                    </Link>
                                </Nav>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
 
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="wrapper">
                                <Routes>
                                    <Route exact path="/"
                                        element={<CreateUser/>} />
                                    <Route path="/create-user"
                                        element={<CreateUser/>} />
                                    <Route path="/edit-user/:id"
                                        element={<EditUser/>} />
                                    <Route path="/user-list"
                                        element={<UserList/>} />
                                </Routes>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    );
};
 
export default App;