import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Row, Col } from "react-bootstrap";
import UserTableRow from "./UserTableRow";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return users.map((user) => {
            return <UserTableRow key={user._id} obj={user} />;
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
                            <tbody>
                                {DataTable()}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserList;
