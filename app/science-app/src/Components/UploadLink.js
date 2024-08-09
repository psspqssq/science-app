import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";

const UploadLink = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [accessLevel, setAccessLevel] = useState(1); // Default access level
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://science-app-server-df7502eefe68.herokuapp.com/api/create-link",
        { name, url, picture, category, accessLevel }, // Include accessLevel in the POST request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setMessage("¡Documento subido exitosamente!");
        setName("");
        setUrl("");
        setPicture("");
        setCategory("");
        setAccessLevel(1); // Reset access level after successful submission
      } else {
        setMessage("Fallo cargando documento.");
      }
    } catch (error) {
      console.error("Error uploading link:", error);
      setMessage("Fallo cargando documento.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Cargar documento a la base de datos</h2>
      {message && <p>{message}</p>}
      <FormGroup controlId="name">
        <FormLabel>Nombre</FormLabel>
        <FormControl
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup controlId="url">
        <FormLabel>URL</FormLabel>
        <FormControl
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup controlId="picture">
        <FormLabel>URL de imágen (opcional)</FormLabel>
        <FormControl
          type="url"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="category">
        <FormLabel>Categoría</FormLabel>
        <FormControl
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup controlId="accessLevel">
        <FormLabel>Nivel de Acceso</FormLabel>
        <FormControl
          as="select"
          value={accessLevel}
          onChange={(e) => setAccessLevel(Number(e.target.value))}
          required
        >
          <option value={1}>Nivel 1</option>
          <option value={2}>Nivel 2</option>
          <option value={3}>Nivel 3</option>
        </FormControl>
      </FormGroup>
      <Button variant="primary" type="submit">
        Subir
      </Button>
    </Form>
  );
};

export default UploadLink;
