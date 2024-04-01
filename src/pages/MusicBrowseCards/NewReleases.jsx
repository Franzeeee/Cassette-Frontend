import React from 'react';
import LayoutMP from '../../Layout/LayoutMP';
import "../../assets/css/MusicCards/new-releases.css"; 
import "../../assets/css/Circular.css"; 
import DefImage from "../../assets/img/Cassettelogosq.png";

function NewReleases() {
  const newReleasesData = [
    {
      title: 'New Release 1',
      description: 'Description for New Release 1',
      imageUrl: DefImage, 
    },
    {
      title: 'New Release 2',
      description: 'Description for New Release 2',
      imageUrl: DefImage, 
    },
    {
      title: 'New Release 3',
      description: 'Description for New Release 3',
      imageUrl: DefImage, 
    },
    {
      title: 'New Release 4',
      description: 'Description for New Release 4',
      imageUrl: DefImage, 
    },
    {
      title: 'New Release 5',
      description: 'Description for New Release 5',
      imageUrl: DefImage, 
    },
  ];

  return (
    <LayoutMP activePage="New Releases">
      <div className="nr-grid-container">
      <div className="nrtop-container">
          <h2 className='nrh'>New Releases</h2>
        </div>
        <div className="nrbottom-container">
          <div className="new-releases-cards-container">
            {newReleasesData.map((item, index) => (
              <div key={index} className="new-releases-card">
                <div className="nr-image-container">
                  <img src={item.imageUrl} alt={item.title} className="new-releases-image" />
                  <div className="nr-play-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg> 
                  </div>
                </div>
                <div className="new-releases-name-container">
                  <h4 className="new-releases-name">{item.title}</h4>
                  <p className="new-releases-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default NewReleases;
