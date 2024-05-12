import React, { useEffect, useState } from "react";
import LayoutMP from "../Layout/LayoutMP";
import styles from '../assets/css/profile.module.css';
import ProfileImg from '../assets/img/artist-img.jpg'; // Imported profile image
import CoverImg from '../assets/img/pattern.jpeg'; // Imported cover image
import TrackImg from '../assets/img/default.png'; // Imported track image
import cassette_api from "../api";
import { toast, ToastContainer } from 'react-toastify'
import { Dialog } from "primereact/dialog";

function Profile() {
  // Dummy data for favorite tracks
  const favoriteTracks = [
    { id: 1, title: "Track 1", artist: "Artist 1", dateUploaded: "2024-04-01", totalListens: 100, duration: "3:45" },
    { id: 2, title: "Track 2", artist: "Artist 2", dateUploaded: "2024-04-02", totalListens: 120, duration: "4:20" },
    { id: 3, title: "Track 2", artist: "Artist 2", dateUploaded: "2024-04-03", totalListens: 90, duration: "3:30" },

    // Add more favorite tracks here
  ];

  // Dummy data for recently played tracks
  const recentlyPlayedTracks = [
    { id: 1, title: "Track 3", artist: "Artist 3", dateUploaded: "2024-04-04", totalListens: 80, duration: "3:10" },
    { id: 2, title: "Track 4", artist: "Artist 4", dateUploaded: "2024-04-05", totalListens: 110, duration: "4:00" },
    { id: 3, title: "Track 2", artist: "Artist 2", dateUploaded: "2024-04-06", totalListens: 95, duration: "3:45" },

    // Add more recently played tracks here
  ];
  
  const [user, setUser] = useState()
  const userId = localStorage.getItem('ID');

  useEffect(() => {
    cassette_api.get(`/getUser/${userId}`)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      })
  }, []);

  const [editName, setEditName] = useState(false);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      cassette_api.put(`/user/${userId}/update-name`, {name: user.name})
        .then(response => {
          console.log(response.data)
          toast.success("Name Successfully Updated")
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        })
        .finally(() => setEditName(false))
    }
  }

  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
};

  const uploadProfile = () => {
    setVisible(false);
    toast.success("Profile Updated")
  }

  return (
    <LayoutMP activePage={"Profile"}>
      <div className={styles.profileContainer}>
        <ToastContainer containerId={"profile"} />
          <Dialog header="Upload Profile Picture" visible={visible} style={{ width: '50vw', background: '#181818', color: 'white', padding: '20px' }} onHide={() => {
            setVisible(false);
          }}
                  className="d-flex flex-column "
          >
                {profile && <img src={URL.createObjectURL(profile)} alt="Uploaded Profile" width={'400px'} />}
            <input type="file" id="imageInput" 
                onChange={handleFileInputChange}  accept="image/*" className="mt-3" name="image" />
                {/* Display the image  */}
                <button onClick={uploadProfile}>Upload</button>
          </Dialog>
        <div className={styles.profileHeader} style={{ backgroundImage: `url(${CoverImg})` }}> 
          <img src={profile && !visible ? URL.createObjectURL(profile) : ProfileImg} onClick={() => {setVisible(true) 
            setProfile(null)}} alt="Profile" className={styles.profilePicture} /> 
          {editName ?
            <input type="text" onKeyDown={handleEnter} 
              className={styles.profileName} value={user.name} onChange={(e) => setUser({...user, name: e.target.value })} 
              onBlur={() => setEditName(false)}
            />
            :
            <h1 className={styles.profileName} onDoubleClick={() => setEditName(true)}>{!!user ? user.name : "Loading..."}</h1>
          }
          <p className={styles.profileBio}>Description</p>
        </div>
        <div className={styles.profileBody}>
          <h2 className={styles.sectionTitle}>Favorite Tracks</h2>
          <ul className={styles.trackList}>
            {favoriteTracks.map(track => (
              <li key={track.id} className={styles.trackItem}>
                <img src={TrackImg} alt={track.title} className={styles.trackImage} />
                <div className={styles.trackInfo}>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <p className={styles.trackArtist}>{track.artist}</p>
                  <div className={styles.trackDetails}>
                    <span>Date Uploaded: {track.dateUploaded}</span>
                    <span>Total Listens: {track.totalListens}</span>
                    <span>Duration: {track.duration}</span>
                    <button className={styles.playButton}>Play</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.profileFooter}>
          <h2 className={styles.sectionTitle}>Recently Played</h2>
          <ul className={styles.trackList}>
            {recentlyPlayedTracks.map(track => (
              <li key={track.id} className={styles.trackItem}>
                <img src={TrackImg} alt={track.title} className={styles.trackImage} />
                <div className={styles.trackInfo}>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <p className={styles.trackArtist}>{track.artist}</p>
                  <div className={styles.trackDetails}>
                    <span>Date Uploaded: {track.dateUploaded}</span>
                    <span>Total Listens: {track.totalListens}</span>
                    <span>Duration: {track.duration}</span>
                    <button className={styles.playButton}>Play</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutMP>
  );
}

export default Profile;
