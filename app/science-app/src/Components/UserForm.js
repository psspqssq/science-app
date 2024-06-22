import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button, Row, Col } from "react-bootstrap";

const permissionsOptions = [
    { value: 'addpermissions', label: 'Agregar Permisos' },
    { value: 'removepermissions', label: 'Remover Permisos' },
    { value: 'deletecontent', label: 'Borrar Contenido' },
    { value: 'blockusers', label: 'Bloquear Usuarios' },
    { value: 'deleteusers', label: 'Borrar Usuarios' },
];

const UserForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        dob: Yup.date().required('Required'),
        city: Yup.string(),
        country: Yup.string().required('Required'),
        permissions: Yup.array().of(Yup.string())
    });

    return (
        <div className="form-wrapper">
            <Formik
                {...props}
                validationSchema={validationSchema}
                initialValues={{
                    ...props.initialValues,
                    permissions: props.initialValues.permissions || []
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Nombre de Usuario</FormLabel>
                                    <Field name="name" type="text" className="form-control" />
                                    <ErrorMessage name="name" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Contraseña</FormLabel>
                                    <Field name="password" type="password" className="form-control" />
                                    <ErrorMessage name="password" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Confirmar Contraseña</FormLabel>
                                    <Field name="passwordConfirm" type="password" className="form-control" />
                                    <ErrorMessage name="passwordConfirm" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>E-mail</FormLabel>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage name="email" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Fecha de Nacimiento</FormLabel>
                                    <Field name="dob" type="date" className="form-control" />
                                    <ErrorMessage name="dob" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Ciudad</FormLabel>
                                    <Field name="city" type="text" className="form-control" />
                                    <ErrorMessage name="city" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>País</FormLabel>
                                    <Field name="country" type="text" className="form-control" />
                                    <ErrorMessage name="country" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <FormLabel>Permisos</FormLabel>
                                    {permissionsOptions.map(option => (
                                        <div key={option.value} className="form-check">
                                            <Field
                                                type="checkbox"
                                                id={option.value}
                                                name="permissions"
                                                value={option.value}
                                                checked={values.permissions.includes(option.value)}
                                                onChange={handleChange}
                                                className="form-check-input"
                                            />
                                            <FormLabel htmlFor={option.value} className="form-check-label">{option.label}</FormLabel>
                                        </div>
                                    ))}
                                    <ErrorMessage name="permissions" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
						<Row>
							<Button variant="danger" size="lg" block type="submit" style={{ marginTop: "20px" }}>
								{props.children}
							</Button>
						</Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UserForm;
