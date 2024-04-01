import React from 'react';
import LayoutMP from '../../Layout/LayoutMP';
import "../../assets/css/MusicCards/recommended.css"; // Update CSS import path
import "../../assets/css/Circular.css"; // Update CSS import path
import DefImage from "../../assets/img/Cassettelogosq.png";

function Recommended() {
  const recommendedData = [
    {
      title: 'Recommendation 1',
      description: 'Description for Recommendation 1',
      imageUrl: DefImage, 
    },
    {
      title: 'Recommendation 2',
      description: 'Description for Recommendation 2',
      imageUrl: DefImage, 
    },
    {
      title: 'Recommendation 3',
      description: 'Description for Recommendation 3',
      imageUrl: DefImage, 
    },
    {
      title: 'Recommendation 4',
      description: 'Description for Recommendation 4',
      imageUrl: DefImage, 
    },
    {
      title: 'Recommendation 5',
      description: 'Description for Recommendation 5',
      imageUrl: DefImage, 
    },
  ];

  return (
    <LayoutMP activePage="Recommended"> {/* Update activePage prop */}
      <div className="rc-grid-container">
        <div className="rctop-container">
          <h2 className='rch'>Recommended</h2> {/* Update class name */}
        </div>
        <div className="rcbottom-container">
          <div className="recommended-cards-container"> {/* Update class name */}
            {recommendedData.map((item, index) => (
              <div key={index} className="recommended-card"> {/* Update class name */}
                <div className="rc-image-container"> {/* Update class name */}
                  <img src={item.imageUrl} alt={item.title} className="recommended-image" /> {/* Update class name */}
                  <div className="rc-play-button"> {/* Update class name */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg> 
                  </div>
                </div>
                <div className="recommended-name-container"> {/* Update class name */}
                  <h4 className="recommended-name">{item.title}</h4> {/* Update class name */}
                  <p className="recommended-description">{item.description}</p> {/* Update class name */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default Recommended;
