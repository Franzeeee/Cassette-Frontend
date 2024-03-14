import React from 'react';
import cassette_api from '../api';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.log("User is not logged in");
        return;
      }
      
      await cassette_api.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Clear token from local storage
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user_type');
      // Redirect or display success message
      console.log("Logout successful");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <button className='btn btn-primary ' onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
