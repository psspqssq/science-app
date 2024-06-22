import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { useParams, useNavigate } from "react-router-dom";

const permissionsOptions = [
    { value: 'deletecontent', label: 'Delete Content' },
    { value: 'deleteusers', label: 'Delete Users' },
    { value: 'removepermissions', label: 'Remove Permissions' },
    { value: 'blockusers', label: 'Block Users' },
    { value: 'addpermissions', label: 'Add Permissions' },
];

const EditUser = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        dob: '',
        city: '',
        country: '',
        permissions: []
    });

    const onSubmit = (userObject) => {
        axios.put(
            `http://localhost:4000/update-user/${params.id}`,
            userObject
        ).then((res) => {
            if (res.status === 200) {
                alert("User successfully updated");
                navigate("/user-list");
            } else {
                Promise.reject();
            }
        }).catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/update-user/${params.id}`)
            .then((res) => {
                const { name, email, dob, city, country, permissions } = res.data;
                setFormValues({ name, email, dob, city, country, permissions });
            }).catch((err) => {
                console.log(err);
            });
    }, [params.id]);

    return (
        <UserForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            Update User
        </UserForm>
    );
};

export default EditUser;
