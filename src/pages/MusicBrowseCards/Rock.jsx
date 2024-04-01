import React from 'react';
import LayoutMP from '../../Layout/LayoutMP';
import "../../assets/css/MusicCards/rock.css"; 
import "../../assets/css/Circular.css"; 
import DefImage from "../../assets/img/Cassettelogosq.png";

function RockPage() {
  const rockData = [
    {
      title: 'Rock Album 1',
      description: 'Description for Rock Album 1',
      imageUrl: DefImage, 
    },
    {
      title: 'Rock Album 2',
      description: 'Description for Rock Album 2',
      imageUrl: DefImage, 
    },
    {
      title: 'Rock Album 3',
      description: 'Description for Rock Album 3',
      imageUrl: DefImage, 
    },
    {
      title: 'Rock Album 4',
      description: 'Description for Rock Album 4',
      imageUrl: DefImage, 
    },
    {
      title: 'Rock Album 5',
      description: 'Description for Rock Album 5',
      imageUrl: DefImage, 
    },
  ];

  return (
    <LayoutMP activePage="Rock">
      <div className="rock-grid-container">
        <div className="rocktop-container">
          <h2 className='rockh'>Rock</h2>
        </div>
        <div className="rockbottom-container">
          <div className="rock-cards-container">
            {rockData.map((item, index) => (
              <div key={index} className="rock-card">
                <div className="rock-image-container">
                  <img src={item.imageUrl} alt={item.title} className="rock-image" />
                  <div className="rock-play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg> 
                  </div>
                </div>
                <div className="rock-name-container">
                  <h4 className="rock-name">{item.title}</h4>
                  <p className="rock-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default RockPage;
