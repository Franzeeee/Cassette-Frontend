// authApi.js

import { useState } from 'react';
import cassette_api from './api';

export const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const response = await cassette_api.post('/register', formData);
            setResponseMessage(response.data.message);
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage('');
                }, 1500);
            }
            throw error; // Re-throw error to be caught by caller
        }
    };

    const handleLogin = async (formData) => {
        try {
            const response = await cassette_api.post('/login', formData);
            const token = response.data.token;
            localStorage.setItem('jwt_token', token);
            window.location.reload();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { formData, responseMessage, errorMessage, isLoading, handleChange, handleSubmit, handleLogin };
};
