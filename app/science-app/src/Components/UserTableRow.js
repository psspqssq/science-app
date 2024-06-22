import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const permissionsMap = {
    deletecontent: 'Borrar Contenido',
    deleteusers: 'Borrar Usuarios',
    removepermissions: 'Remover Permisos',
    blockusers: 'Bloquear Usuarios',
    addpermissions: 'Agregar Permisos',
};

const UserTableRow = (props) => {
    const {
        _id,
        name,
        email,
        dob,
        city,
        country,
        permissions
    } = props.obj;

    const deleteUser = () => {
        axios
            .delete("http://localhost:4000/users/delete-user/" + _id)
            .then((res) => {
                if (res.status === 200) {
                    alert("User successfully deleted");
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{format(dob.replaceAll('-', '/').split('T')[0], 'd/M/yyyy')}</td>
            <td>{city}</td>
            <td>{country}</td>
            <td>
                <ul>
                {permissions.map(permission => (
                    <li key={permission}>
                        {permissionsMap[permission]}
                        <br />
                    </li>
                ))}
                </ul>
            </td>
            <td>
                <Link className="edit-link" to={"/edit-user/" + _id}>
                    Edit
                </Link>
                <Button onClick={deleteUser} size="sm" variant="danger" className="ml-2">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default UserTableRow;
