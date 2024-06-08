//src/Components/create-user.component.js
// CreateUser Component for add new user

// Import Modules
import React,
{
	useState,
	useEffect
} from "react";
import axios from 'axios';
import UserForm
	from "./UserForm";

// CreateUser Component
const CreateUser = () => {
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
			})
	// onSubmit handler
	const onSubmit =
		userObject => {
			axios.post(
                'http://localhost:4000/users/create-user',
				userObject)
				.then(res => {
					if (res.status === 200)
						alert('User successfully created')
					else
						Promise.reject()
				})
				.catch(err => alert('Something went wrong'))
		}

	// Return user form
	return (
		<UserForm initialValues={formValues}
			onSubmit={onSubmit}
			enableReinitialize>
			Crear Usuario
		</UserForm>
	)
}

// Export CreateUser Component
export default CreateUser
