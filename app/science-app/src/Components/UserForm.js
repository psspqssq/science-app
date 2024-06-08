//src / Components / UserForm.js
import React from "react";
import * as Yup from "yup";
import {
	Formik, Form,
	Field, ErrorMessage
} from "formik";
import {
	FormGroup,
	FormControl, Button
} from "react-bootstrap";

const UserForm = (props) => {
	const validationSchema =
		Yup.object().shape({
			name: Yup.string().required("Requerido"),
			password: Yup.string().required("Requerido"),
			email: Yup.string()
				.email(`Esta dirección de e-mail es inválida`)
				.required("Requerido"),
			dob: Yup.date().required("Requerido"),
			city: Yup.string(),
			country: Yup.string().required("Test de requerido"),
			userType: Yup.string().required("Tipo de usuario requerido")
		});
	return (
		<div className="form-wrapper">
			<Formik {...props}
				validationSchema={validationSchema}>
				<Form>
					<FormGroup>
                        Nombre de Usuario
						<Field name="name" type="text"
							className="form-control" />
						<ErrorMessage
							name="name"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        Contraseña
						<Field name="password" type="text"
							className="form-control" />
						<ErrorMessage
							name="password"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        Confirmar Contraseña
						<Field name="passwordConfirm" type="text"
							className="form-control" />
						<ErrorMessage
							name="passwordConfirm"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        E-mail
						<Field name="email"
							type="text"
							className="form-control" />
						<ErrorMessage
							name="email"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        Fecha de Nacimiento
						<Field name="dob"
							type="date"
							className="form-control" />
						<ErrorMessage
							name="dob"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        Ciudad
						<Field name="city"
							type="string"
							className="form-control" />
						<ErrorMessage
							name="city"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        País
						<Field name="country"
							type="string"
							className="form-control" />
						<ErrorMessage
							name="country"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<FormGroup>
                        Tipo de Usuario
						<Field name="userType"
							type="string"
							className="form-control" />
						<ErrorMessage
							name="userType"
							className="d-block 
								invalid-feedback"
							component="span"
						/>
					</FormGroup>
					<Button style={{marginTop: "20px"}}variant="danger" size="lg"
						block="block" type="submit">
						{props.children}
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default UserForm;
