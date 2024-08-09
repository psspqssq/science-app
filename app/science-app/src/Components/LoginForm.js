import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://science-app-server-df7502eefe68.herokuapp.com/login",
        { email, password }
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        handleLogin(user, token);
        navigate("/dashboard");
      } else {
        setError(
          "Inicio de sesión fallido, por favor checa tu usuario y contraseña."
        );
      }
    } catch (error) {
      console.error("Error iniciando sesión: ", error);
      setError(
        "Inicio de sesión fallido, por favor checa tu usuario y contraseña."
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Inicio de Sesión</h2>
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
        <FormLabel>Contraseña</FormLabel>
        <FormControl
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default LoginForm;
