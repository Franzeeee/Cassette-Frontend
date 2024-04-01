import React from 'react';
import LayoutMP from '../../Layout/LayoutMP';
import "../../assets/css/MusicCards/top-charts.css"; 
import "../../assets/css/Circular.css"; 
import DefImage from "../../assets/img/Cassettelogosq.png";


function TopCharts() {
  const topChartsData = [
    {
      title: 'Chart Hits 1',
      description: 'Description for Chart Hit 1',
      imageUrl:   DefImage, 
    },
    {
      title: 'Chart Hits 2',
      description: 'Description for Chart Hit 2',
      imageUrl: DefImage, 
    },
    {
      title: 'Chart Hits 3',
      description: 'Description for Chart Hit 3',
      imageUrl: DefImage, 
    },
    {
      title: 'Chart Hits 4',
      description: 'Description for Chart Hit 4',
      imageUrl: DefImage, 
    },
    {
      title: 'Chart Hits 5',
      description: 'Description for Chart Hit 5',
      imageUrl: DefImage, 
    },
  ];

  return (
    <LayoutMP activePage="Top Charts">
      <div className="tp-grid-container">
        <div className="tptop-container">
          <h2 className='tph'>Top Charts</h2>
        </div>
        <div className="tpbottom-container">
          <div className="topcharts-cards-container">
            {topChartsData.map((item, index) => (
              <div key={index} className="topcharts-card">
                <div className="tp-image-container">
                  <img src={item.imageUrl} alt={item.title} className="topcharts-image" />
                  <div className="tp-play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg> 
                    </div>
                </div>
                <div className="topcharts-name-container">
                  <h4 className="topcharts-name">{item.title}</h4>
                  <p className="topcharts-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default TopCharts;
