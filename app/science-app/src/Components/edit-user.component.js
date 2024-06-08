//src/Components/edit-user.component.js
// EditUser Component for update user data

// Import Modules
import React,
{
	useState,
	useEffect
} from "react";
import axios from "axios";
import UserForm
	from "./UserForm";

import { useParams, useNavigate } from "react-router-dom";
// EditUser Component
const EditUser = (props) => {
	const params = useParams();
	const navigate = useNavigate();
	const [formValues, setFormValues] =
		useState(
			{
				name: '',
				email: '',
				password: '',
				dob: '',
				city: '',
				country: '',
				userType: ''
			}
		);

	//onSubmit handler
	const onSubmit = (userObject) => {
		axios
			.put(
            "http://localhost:4000/users/update-user/" +
				params.id,
				userObject
			)
			.then((res) => {
				if (res.status === 200) {
					alert("User successfully updated");
					navigate("/user-list");
				} else Promise.reject();
			})
			.catch(
				(err) =>{
					console.log(err);
					alert("Something went wrong")}
			);
	};

	// Load data from server and reinitialize user form
	useEffect(() => {
		axios
			.get(
				"http://localhost:4000/users/update-user/"
				+ params.id
			)
			.then((res) => {
				const {
					name,
					password,
					email,
					dob,
					city,
					country,
					userType
				} = res.data;
				setFormValues(
					{
						name,
						password,
						email,
						dob,
						city,
						country,
						userType
					});
			})
			.catch(
				(err) =>
					console.log(err)
			);
	}, []);

	// Return user form
	return (
		<UserForm
			initialValues={formValues}
			onSubmit={onSubmit}
			enableReinitialize>
			Update User
		</UserForm>
	);
};

// Export EditUser Component
export default EditUser;
