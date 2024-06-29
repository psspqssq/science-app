import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const LandingPage = ({ user }) => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/links', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLinks(response.data);
            } catch (error) {
                console.error('Error cargando documentos:', error);
            }
        };
        fetchLinks();
    }, []);

    const deleteLink = async (id) => {
        try {
            if (user.permissions.includes('deletecontent')) {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/api/links/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLinks(links.filter(link => link._id !== id));
            } else {
                alert('No tienes permiso para borrar documentos.');
            }
        } catch (error) {
            console.error('Error borrando el documento:', error);
        }
    };

    return (
        <Container>
            <h2 className="mt-4 mb-4">Contenido Científico</h2>
            <Row>
                {links.map(link => (
                    <Col key={link._id} md={4} className="mb-4">
                        <Card>
                            {link.picture && <Card.Img variant="top" src={link.picture} />}
                            <Card.Body>
                                <Card.Title>{link.name}</Card.Title>
                                <Card.Text>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                                </Card.Text>
                                {user.permissions.includes('deletecontent') && (
                                    <Button variant="danger" onClick={() => deleteLink(link._id)}>Borrar</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default LandingPage;
