import React, { useEffect, useState } from 'react';
import cassette_api from "./api";

export const Auth = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check user verification when component mounts
    checkUserVerification();
  }, []);

  const checkUserVerification = async () => {
    try {
      // Make a request to check user verification status using cassette_api
      const response = await cassette_api.get('/verifyUser');

      // Assuming the response contains verification information in data. Adjust this based on your actual API response structure.
      const { verified } = response.data;

      // Update state based on verification status
      setIsVerified(true);
    } catch (error) {
      // Handle error
      console.error('Error checking user verification:', error);
    }
  };

  return isVerified;
};
