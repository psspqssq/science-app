//src/Components/user-list.component.js
import React,
{
	useState,
	useEffect
} from "react";
import axios
	from "axios";
import { Table }
	from "react-bootstrap";
import UserTableRow
	from "./UserTableRow";

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:4000/users/")
			.then(({ data }) => {
				setUsers(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const DataTable = () => {
		return users.map((res, i) => {
			return <UserTableRow
				obj={res} key={i} />;
		});
	};

	return (
		<div className="table-wrapper">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Contraseña</th>
						<th>Fecha de Nacimiento</th>
						<th>Ciudad</th>
						<th>País</th>
						<th>Tipo de Usuario</th>
					</tr>
				</thead>
				<tbody>{DataTable()}</tbody>
			</Table>
		</div>
	);
};

export default UserList;
