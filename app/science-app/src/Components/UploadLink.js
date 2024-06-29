import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

const UploadLink = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [picture, setPicture] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        try {
            const response = await axios.post(
                'http://localhost:4000/api/create-link',
                { name, url, picture },
                { headers: { Authorization: `Bearer ${token}` } } 
            );
            if (response.status === 201) {
                setMessage('¡Documento subido éxitosamente!');
                setName('');
                setUrl('');
                setPicture('');
            } else {
                setMessage('Fallo cargando documento.');
            }
        } catch (error) {
            console.error('Error uploading link:', error);
            setMessage('Fallo cargando documento.');
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
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    );
};

export default UploadLink;
