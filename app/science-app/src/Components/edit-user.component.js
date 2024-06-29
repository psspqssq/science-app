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

const EditUser = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        dob: '',
        city: '',
        country: '',
        permissions: []
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/update-user/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { name, email, dob, city, country, permissions } = response.data;
                setFormValues({ name, email, dob, city, country, permissions });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [params.id]);

    const onSubmit = async (userObject) => {
        try {
            const token = localStorage.getItem('token');
            const { password, ...rest } = userObject; // Exclude password from update
            const response = await axios.put(
                `http://localhost:4000/update-user/${params.id}`,
                rest,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                alert("User successfully updated");
                navigate("/user-list");
            } else {
                alert("Failed to update user");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to update user");
        }
    };

    return (
        <UserForm
            initialValues={formValues}
            onSubmit={onSubmit}
            isNewUser={false}
            enableReinitialize
        >
            Update User
        </UserForm>
    );
};

export default EditUser;
