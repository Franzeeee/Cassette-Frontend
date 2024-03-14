import { useEffect, useState } from "react";
import cassette_api from '../api'; // Make sure to import cassette_api

function useHome() {
    const [name, setName] = useState('');
    const [isVerified, setIsVerified] = useState(null);
    const [id, setId] = useState(null);
    const link = 'http://localhost/api/resend/' + id;
    const [loadResend, setLoadResend] = useState(false);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data with authorization token
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    throw new Error('JWT token not found');
                }

                const response = await cassette_api.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setName(response.data.user.name);
                if(response.data.user.email_verified_at !== null){
                    setIsVerified(true);
                }
                setId(response.data.user.id);
                setEmail(response.data.user.email);
                console.log(isVerified);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array to run the effect only once

    const handleResend = (e) => {
        e.preventDefault();
        setLoadResend(true);
    
        fetch(link, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                console.log('Request sent successfully');
            } else {
                console.error('Error sending request');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoadResend(false);
        });
    }
    
    // Return the state value you want to use in your component
    return {name, isVerified, id, link, loadResend, email, handleResend};
}

export default useHome;
