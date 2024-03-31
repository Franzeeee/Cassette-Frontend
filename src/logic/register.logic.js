import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import cassette_api from '../api';
import { toast } from 'react-toastify'

const useRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigateTo = useNavigate();
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);;
    const [isChecked, setIsChecked] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [disagree, setDisagree] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckbox = (e) => {
        setIsChecked(!isChecked)
    }

    
    const handleCloseModal = () => {
        setIsChecked(false)
    }

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        if(!isChecked){
            toast.error("You must agree to the terms and condition to continue.");
            setIsLoading(false);
            setDisagree(false)
            return;
        }
        setDisagree(true);
        cassette_api.post('/register', formData)
            .then((response) => {
                setIsLoading(false);
                
                // Automatically go to login
                cassette_api.post('/login', formData)
                .then(response => {
                    // Store token to local storage
                    const token = response.data.token;
                    const user_type = response.data.user_type;
                    const storedId = response.data.user_id
                    console.log(user_type);
                    localStorage.setItem('jwt_token', token);
                    localStorage.setItem('user_type', user_type);
                    localStorage.setItem('ID', storedId);
                    window.location.reload()
                    // navigateTo('/');
                }).catch(error => {
                    toast.error(error.message)
                });
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    const errors = error.response.data.errors;
                    console.log(error)
                    if (errors.email) {
                        toast.error(errors.email[0]);
                        setEmailError(true);
                    }
                    
                    if (errors.password) {
                        toast.error(errors.password[0]);
                        setPasswordError(true);
                    }
                }
            });
    };

    return { formData, responseMessage, errorMessage, isLoading, isChecked, setIsChecked, showModal, showModal, emailError, passwordError, disagree, handleChange, handleSubmit, handleCloseModal, handleCheckbox };
};

export default useRegister;
