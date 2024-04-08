import React from 'react';
import LayoutMP from '../Layout/LayoutMP';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
import AlekOlsen from "/workspaces/Cassette-Frontend/src/assets/mp3/AlekOlsen.mp3";
import TrackImg from "/workspaces/Cassette-Frontend/src/assets/img/Cassettelogosq.png";
import styles from '../assets/css/music-player.module.css';

const Tracks = [
  {
    id: 1,
    title: "EMEM",
    artist: "Artist 1",
    album: "Album 1",
    duration: "3:45",
    image: TrackImg 
  },
  {
    id: 2,
    title: "Track 2",
    artist: "Artist 2",
    album: "Album 2",
    duration: "4:20",
    image: TrackImg 
  },
  {
    id: 3,
    title: "Track 2",
    artist: "Artist 2",
    album: "Album 2",
    duration: "4:20",
    image: TrackImg 
  },
  {
    id: 4,
    title: "Track 2",
    artist: "Artist 2",
    album: "Album 2",
    duration: "4:20",
    image: TrackImg 
  },
];

function MusicPlayer() {
  return (
    <LayoutMP activePage={"Music"}>
      <div className={styles.Container}>
        <div className={styles.MainContainer}>
          <div className={styles.TopContainer}>
            <div className={styles.AudioPlayerWrapper}>
              <ReactAudioPlayer
                src={AlekOlsen}
                autoPlay={false}
                controls
                style={{
                  width: '58vw',
                  height: '90px',
                  backgroundColor: '#000', // Set background color to black
                  color: '#fff', // Set text color to white
                  padding: '10px', // Add padding
                  boxSizing: 'border-box', // Include padding and border in the total width/height
                }}
                className="react-audio-player" // Add className if needed
              />
            </div>
          </div>
        
          <div className={styles.BottomContainer}>
            <div className={styles.PlaylistContainer}>
              {Tracks.map(track => (
                <div className={styles.Track} key={track.id}>
                  <div className={styles.TrackInfo}>
                    <div className={styles.TrackImage}>
                      <img src={track.image} alt="Album Image" />
                    </div>
                    <div className={styles.TrackTitle}>
                      <p>{track.title}</p>
                      <p>{track.artist}</p>
                    </div>
                  </div>
                  <div className={styles.Album}>
                    <p>{track.album}</p>
                  </div>
                  <div className={styles.Duration}>
                    <span role="img" aria-label="Duration Icon">🕒</span>
                    <p>{track.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Side Panel Container */}
        <div className={styles.SidePanelContainer}>
          {/* Side Panel Content Goes Here */}
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicPlayer;
