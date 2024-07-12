import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Row, Col } from "react-bootstrap";
import UserTableRow from "./UserTableRow";

const UserList = (user) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:4000/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const DataTable = () => {
        return users.map((helpuser) => {
            return <UserTableRow key={helpuser._id} obj={helpuser} user={user}/>;
        });
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={10}>
                    <div className="table-wrapper">
                        <h2 className="mb-4">Lista de Usuarios</h2>
                        <Table striped bordered hover className="text-center">
                            <thead className="table-header">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Ciudad</th>
                                    <th>País</th>
                                    <th>Permisos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>{DataTable()}</tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserList;
