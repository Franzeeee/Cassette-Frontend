import React from 'react';
import artistProfile from '../../assets/img/artist-img.jpg';
import styles from '../../assets/css/ArtistStudio/artist-sidebar.module.css';
import { useNavigate } from 'react-router-dom'

function SideBar({ active }) {

  const navigate = useNavigate();

  return (
    <div className='col-2 bg-light m-0 p-0'>
      <div className={`row d-flex flex-column m-0 p-0 h-100 text-light bg-dark ${styles['sidenav-container']}`}>
        <div className="col-7 h-25 w-100 d-flex flex-column align-items-center justify-content-center p-2 gap-1">
          <img src={artistProfile} width={"40%"} className={styles['user-image']} alt="" />
          <h6 className='m-0 mt-2 '>Your Artist Page</h6>
          <p className='m-0'>John Doe</p>
        </div>
        <div className="col-3 h-50 w-100">
          <div className="row h-100 d-flex flex-column justify-content-start pt-3 align-items-start ">
            <div className={`col ${styles['sidenav-links']} ${active === 'Dashboard' ? styles['active'] : ''}`} onClick={() => navigate('/studio/dashboard')}>
              <div>Dashboard</div>
            </div>
            <div className={`col ${styles['sidenav-links']} ${active === 'Upload' ? styles['active'] : ''}`} onClick={() => navigate('/studio/upload')}>
              <div>Upload</div>
            </div>
            <div className={`col ${styles['sidenav-links']} ${active === 'Content' ? styles['active'] : ''}`} onClick={() => navigate('/studio/content')}>
              <div>Content</div>
            </div>
            <div className={`col ${styles['sidenav-links']} ${active === 'Earn' ? styles['active'] : ''}`}>
              <div>Earn</div>
            </div>
          </div>
        </div>
        <div className="col-2 h-25 w-100">
            <div className="row h-100 d-flex flex-column justify-content-center align-items-start ">
                <div className={`col ${styles['sidenav-links']}`}>
                    <div>Settings</div>
                </div>
                <div className={`col ${styles['sidenav-links']}`}>
                    <div>Send feedback</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
