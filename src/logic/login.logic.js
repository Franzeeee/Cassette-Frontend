// loginLogic.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cassette_api from '../api';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const useLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        cassette_api.post('/login', formData)
            .then(response => {
                // Store token to local storage
                const token = response.data.token;
                const user_type = response.data.user_type;
                const user_id = response.data.user_id;
                localStorage.setItem('jwt_token', token);
                localStorage.setItem('user_type', user_type);
                localStorage.setItem('ID', user_id);
                window.location.reload();
            })
            .catch(error => {
                toast.error('Incorrect Email or Password');
                setIsLoading(false);
            }); 
    };

    return { formData, isLoading, handleChange, handleSubmit };
};

export default useLogin;
