import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const permissionsMap = {
  deletecontent: "Borrar Contenido",
  deleteusers: "Borrar Usuarios",
  removepermissions: "Remover Permisos",
  blockusers: "Bloquear Usuarios",
  addpermissions: "Agregar Permisos",
  editusers: "Editar Usuarios",
  admin: "Administrador",
  contentlevel1: "Ver contenido nivel 1",
  contentlevel2: "Ver contenido nivel 2",
  contentlevel3: "Ver contenido nivel 3",
  viewcontent: "Ver contenido",
};

const UserTableRow = (props) => {
  const { _id, name, email, dob, city, country, permissions } = props.obj;
  const userPermissions = props.user.user.permissions;
  const deleteUser = () => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from local storage
    axios
      .delete(
        `https://science-app-server-df7502eefe68.herokuapp.com/delete-user/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include JWT token in headers
        }
      )
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
      <td>
        {format(new Date(dob.replaceAll("-", "/").split("T")[0]), "d/M/yyyy")}
      </td>
      <td>{city}</td>
      <td>{country}</td>
      <td>
        <ul>
          {permissions.map((permission) => (
            <li key={permission}>
              {permissionsMap[permission]}
              <br />
            </li>
          ))}
        </ul>
      </td>
      <td>
        {userPermissions.includes("editusers") && (
          <Link className="edit-link" to={`/edit-user/${_id}`}>
            Editar
          </Link>
        )}
        {userPermissions.includes("deleteusers") && (
          <Button
            onClick={deleteUser}
            size="sm"
            variant="danger"
            className="ml-2"
          >
            Borrar
          </Button>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;
