import React, { useState } from 'react';
import cassette_api from '../api';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LogoutButton() {
  const [isHovered, setIsHovered] = useState(false);

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
      localStorage.removeItem('ID');
      // Redirect or display success message
      console.log("Logout successful");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
      // Handle error, such as displaying an error message
    }
  };

  return (
    <div style={{ position: 'relative', display: 'none' }}>
      <FontAwesomeIcon 
        icon={faPowerOff} 
        onClick={handleLogout} 
        style={{ fontSize: '1.5rem', color: isHovered ? '#c20000' : 'white' }} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '.8rem' }}>
          Logout
        </div>
      )}
    </div>
  );
}

export default LogoutButton;
