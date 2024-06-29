import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button, Row, Col } from "react-bootstrap";
import {format} from 'date-fns';

const permissionsOptions = [
    { value: 'addpermissions', label: 'Agregar Permisos' },
    { value: 'removepermissions', label: 'Remover Permisos' },
    { value: 'deletecontent', label: 'Borrar Contenido' },
    { value: 'blockusers', label: 'Bloquear Usuarios' },
    { value: 'deleteusers', label: 'Borrar Usuarios' },
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const UserForm = (props) => {
    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Requerido"),
        email: Yup.string()
            .email('Dirección de e-mail inválida')
            .required('Requerido'),
        dob: Yup.date().required('Requerido'),
        city: Yup.string(),
        country: Yup.string().required('Requerido'),
        permissions: Yup.array().of(Yup.string())
    });

    if (props.isNewUser) {
        validationSchema = validationSchema.shape({
            ...validationSchema.fields,
            password: Yup.string().required("Requerido"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required('Requerido'),
        });
    }

    return (
        <div className="form-wrapper">
            <Formik
                {...props}
                validationSchema={validationSchema}
                initialValues={{
                    ...props.initialValues,
                    dob: formatDate(props.initialValues.dob),
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
                                    <FormLabel>E-mail</FormLabel>
                                    <Field name="email" type="email" className="form-control" />
                                    <ErrorMessage name="email" className="invalid-feedback" component="div" />
                                </FormGroup>
                            </Col>
                        </Row>
                        {props.isNewUser && (
                                    <>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <FormLabel>Contraseña</FormLabel>
                                                    <Field name="password" type="password" className="form-control" />
                                                    <ErrorMessage name="password" className="invalid-feedback" component="div" />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <FormLabel>Confirmar Contraseña</FormLabel>
                                                    <Field name="passwordConfirm" type="password" className="form-control" />
                                                    <ErrorMessage name="passwordConfirm" className="invalid-feedback" component="div" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </>
                                    )}
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
