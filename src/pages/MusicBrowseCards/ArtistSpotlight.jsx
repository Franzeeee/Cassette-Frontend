import React from 'react';
import LayoutMP from '../../Layout/LayoutMP';
import "../../assets/css/MusicCards/artist-spotlight.css"; 
import "../../assets/css/Circular.css"; 
import DefImage from "../../assets/img/Cassettelogosq.png";

function ArtistSpotlight() {
  const artistSpotlightData = [
    {
      title: 'Artist 1',
      description: 'Description for Artist 1',
      imageUrl: DefImage, 
    },
    {
      title: 'Artist 2',
      description: 'Description for Artist 2',
      imageUrl: DefImage, 
    },
    {
      title: 'Artist 3',
      description: 'Description for Artist 3',
      imageUrl: DefImage, 
    },
    {
      title: 'Artist 4',
      description: 'Description for Artist 4',
      imageUrl: DefImage, 
    },
    {
      title: 'Artist 5',
      description: 'Description for Artist 5',
      imageUrl: DefImage, 
    },
  ];

  return (
    <LayoutMP activePage="Artist Spotlight">
      <div className="as-grid-container">
        <div className="astop-container">
          <h2 className='ash'>Artist Spotlight</h2>
        </div>
        <div className="asbottom-container">
          <div className="artist-spotlight-cards-container">
            {artistSpotlightData.map((item, index) => (
              <div key={index} className="artist-spotlight-card">
                <div className="as-image-container">
                  <img src={item.imageUrl} alt={item.title} className="artist-spotlight-image" />
                  <div className="as-play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg> 
                  </div>
                </div>
                <div className="artist-spotlight-name-container">
                  <h4 className="artist-spotlight-name">{item.title}</h4>
                  <p className="artist-spotlight-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default ArtistSpotlight;
