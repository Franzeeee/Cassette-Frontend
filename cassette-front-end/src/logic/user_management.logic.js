import { useEffect, useState } from "react";
import cassette_api from "../api";

export default function users() {

    const [userData, setUserData] = useState();

    useEffect(() => {
        cassette_api.get('/user_management/all')
            .then(response => {
                
                 if (Array.isArray(response.data)) {
                    // Map over each object in the response data and process it
                    const mappedData = response.data.map(item => ({
                        name: item.name,
                        registrationDate: formatDate(item.created_at), // Format registrationDate
                        userType: item.user_type === 'Verified' ? 'Active' : item.user_type,
                        status: item.status
                    }));
                    setUserData(mappedData);
                } else {
                    console.error("Invalid response data:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching user data: ", error);
            })
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return userData;
}
