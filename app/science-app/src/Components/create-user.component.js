// src/Components/CreateUser.js
import React, { useState } from "react";
import axios from 'axios';
import UserForm from "./UserForm";

const isAdmin = (user) =>{
    if(!user) return false;
    if(!user.permissions) return false;
    if(user.permissions.includes('admin')) return true;
    return false;
}

const CreateUser = ({ user }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        city: '',
        country: '',
        permissions: []
    });
    // onSubmit handler
    const onSubmit = (userObject) => {
        axios.post(
            'http://localhost:4000/create-user',
            userObject
        )
            .then(res => {
                if (res.status === 200) {
                    alert('User successfully created');
                } else {
                    Promise.reject();
                }
            })
            .catch(err => {
                console.error('Error creating user:', err);
                alert('Something went wrong');
            });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFormValues(prevState => {
            const newPermissions = checked
                ? [...prevState.permissions, name]
                : prevState.permissions.filter(permission => permission !== name);
            return { ...prevState, permissions: newPermissions };
        });
    };

    return (
        <div>
            <UserForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize isNewUser={true} user={user} isAdmin={isAdmin(user)} >
                Crear Usuario
            </UserForm>
        </div>
    );
};

export default CreateUser;
