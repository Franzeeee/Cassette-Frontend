import React from 'react';
import googleLogo from '../assets/img/google-logo.png';
import facebookLogo from '../assets/img/facebook-logo.png';
import instaLogo from '../assets/img/instagram-logo.png';
import websiteLogo from '../assets/img/Cassette-logo.png';
import '../assets/css/custom.css';

function SocialMediaButton({ logo, text }) {
  let logoImage;

  // Conditionally set the logoImage based on the logo prop
  switch (logo) {
    case 'google':
      logoImage = googleLogo;
      break;
    case 'facebook':
      logoImage = facebookLogo;
      break;
    case 'instagram':
      logoImage = instaLogo;
      break;
    case 'website':
      logoImage = websiteLogo;
      break;
    default:
      logoImage = null;
  }

  return (
    <button className="socmed-btn d-flex align-items-center justify-content-center gap-2 w-100 bg-white ">
      {logoImage && <img src={logoImage} alt="Social Media Logo" className="social-media-logo logo social-logo" />}
      <span className="social-media-text text-dark">{text}</span>
    </button>
  );
}

export default SocialMediaButton;
