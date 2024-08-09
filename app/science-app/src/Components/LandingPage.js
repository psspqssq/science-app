import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

const LandingPage = ({ user }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://science-app-server-df7502eefe68.herokuapp.com/api/links",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Filter links based on user access level
        const filteredLinks = response.data.filter((link) => {
          if (user.permissions.includes("contentlevel3")) {
            return true; // Show all links
          } else if (user.permissions.includes("contentlevel2")) {
            return link.accessLevel === 1 || link.accessLevel === 2;
          } else if (user.permissions.includes("contentlevel1")) {
            return link.accessLevel === 1;
          } else {
            return false;
          }
        });
        setLinks(filteredLinks);
      } catch (error) {
        console.error("Error loading documents:", error);
      }
    };
    fetchLinks();
  }, [user]); // Re-fetch links when user changes

  const deleteLink = async (id) => {
    try {
      if (user.permissions.includes("deletecontent")) {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://science-app-server-df7502eefe68.herokuapp.com/api/links/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLinks(links.filter((link) => link._id !== id));
      } else {
        alert("No tienes permiso para borrar documentos.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleAccessLevelChange = async (linkId, newAccessLevel) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `https://science-app-server-df7502eefe68.herokuapp.com/api/links/${linkId}/accesslevel`,
        { accessLevel: newAccessLevel },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const updatedLinks = links.map((link) =>
          link._id === linkId ? { ...link, accessLevel: newAccessLevel } : link
        );
        setLinks(updatedLinks);
      } else {
        console.error("Failed to update access level");
      }
    } catch (error) {
      console.error("Error updating access level:", error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Contenido Científico</h2>
      <Row>
        {links.map((link) => (
          <Col key={link._id} md={4} className="mb-4">
            <Card>
              {link.picture && <Card.Img variant="top" src={link.picture} />}
              <Card.Body>
                <Card.Title>{link.name}</Card.Title>
                <Card.Text>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </Card.Text>
                <p>Nivel de Acceso: {link.accessLevel}</p>{" "}
                {/* Display access level */}
                {user.permissions.includes("deletecontent") && (
                  <Button variant="danger" onClick={() => deleteLink(link._id)}>
                    Borrar
                  </Button>
                )}
                {user.permissions.includes("admin") && (
                  <Form.Group
                    controlId={`accessLevel-${link._id}`}
                    className="mt-3"
                  >
                    <Form.Label>Cambiar Nivel de Acceso:</Form.Label>
                    <Form.Control
                      as="select"
                      value={link.accessLevel}
                      onChange={(e) =>
                        handleAccessLevelChange(
                          link._id,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </Form.Control>
                  </Form.Group>
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
