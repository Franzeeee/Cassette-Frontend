import React from 'react';
import '../assets/css/artist-management.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

function ArtistRequestCard({ img, name, realname, genre }) {
  return (
    <div className="card">
      <div className="card-header">
        <h5>{name}</h5>
      </div>
      <div className="card-body gap-3">
        <img src={img} className='artist-profile' alt="" />
        <div className="artist-detail px-3 w-75">
          <div className="artist-text w-100">
            <p>Real Name: {realname}</p>
            <p>Genre: {genre}</p>
            <p className='more-info text-primary'>View More</p>
            <p>
              <a href="#"><FontAwesomeIcon icon={faInstagram} style={{ fontSize: '25px', color: '#C20000', margin: '5px' }} /></a>
              <a href="#"><FontAwesomeIcon icon={faYoutube} style={{ fontSize: '25px', color: '#C20000', margin: '5px' }} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} style={{ fontSize: '25px', color: '#C20000', margin: '5px' }} /></a>
            </p>
          </div>
        </div>
        <div class="btn-group" role="group" aria-label="Artist Approval Buttons">
    <button type="button" class="btn btn-success">Approve</button>
    <button type="button" class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
</div>



      </div>
    </div>
  );
}

export default ArtistRequestCard;
