import React, { useState, useEffect } from 'react';
import LayoutMP from '../Layout/LayoutMP';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
import AlekOlsen from "../assets/mp3/AlekOlsen.mp3";
import TrackImg from "../assets/img/Cassettelogosq.png";
import ArtistImg from "../assets/img/artist-img.jpg";
import styles from '../assets/css/music-player.module.css';

const Tracks = [
  {
    id: 1,
    title: "Jakjak",
    artist: "Emimem",
    album: "Album 1",
    duration: "3:45",
    image: TrackImg 
  },
  {
    id: 2,
    title: "Testiclss",
    artist: "92",
    album: "Album 2",
    duration: "4:20",
    image: TrackImg 
  },
  {
    id: 3,
    title: "Jumpsuit",
    artist: "Artist 3",
    album: "Album 3",
    duration: "4:20",
    image: TrackImg 
  },
  
];

function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentAlbumImage, setCurrentAlbumImage] = useState(Tracks[currentTrackIndex].image);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment points every second while music is playing
      if (showAudioPlayer) {
        setTotalPoints(prevPoints => prevPoints + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showAudioPlayer]);

  useEffect(() => {
    // Store points and music title in local storage
    localStorage.setItem('music_points', JSON.stringify({ music_title: Tracks[currentTrackIndex].title, total_points: totalPoints }));
  }, [currentTrackIndex, totalPoints]);

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setCurrentAlbumImage(Tracks[index].image);
    setTotalPoints(0); // Reset points when changing tracks
  };

  return (
    <LayoutMP activePage={"Music"}>
      <div className={styles.Container}>
        <div className={styles.MainContainer}>
          <div className={styles.TopContainer} onMouseEnter={() => setShowAudioPlayer(true)} onMouseLeave={() => setShowAudioPlayer(false)}>
            <img src={currentAlbumImage} alt="Album Image" className={styles.AlbumImage} />
            <div className={`${styles.AudioPlayerWrapper} ${showAudioPlayer ? styles.Show : styles.Hide}`}>
              <ReactAudioPlayer
                src={AlekOlsen}
                autoPlay={false}
                controls
                style={{
                  width: '58vw',
                  height: '90px',
                  backgroundColor: 'transparent',
                  color: '#fffff',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
                className="react-audio-player"
              />
            </div>
          </div>
        
          <div className={styles.BottomContainer}>
            <div className={styles.PlaylistContainer}>
              {Tracks.map((track, index) => (
                <div className={`${styles.Track} ${styles.HighlightOnHover}`} key={track.id} onClick={() => handleTrackChange(index)}>
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
          {/* Container for Album Image, Title, and Artist */}
          <div className={styles.SidePanelContent}>
            <div className={styles.AlbumImageContainer}>
              <img src={Tracks[currentTrackIndex].image} alt="Album Image" />
            </div>
            <div className={styles.TitleArtistContainer}>
              <h2 style={{ fontWeight: 'bold' }}>{Tracks[currentTrackIndex].title}</h2>
              <p style={{ color: 'gray', marginLeft: '5px' }}>{Tracks[currentTrackIndex].artist}</p>
            </div>
          </div>
          
          {/* Container for Artist Info */}
          <div className={styles.ArtistInfoContainer}>
            <div className={styles.ArtistImageContainer}>
              <img src={ArtistImg} alt="Artist Image" />
            </div>
            <div className={styles.ArtistDetailsContainer}>
              <h3>About the artist</h3>
              <h2 style={{ color: 'lightgray' }}>{Tracks[currentTrackIndex].artist}</h2>
              <button>Follow</button>
              <p style={{margin: '0px 10px 0px 10px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Eu sem integer vitae justo eget magna fermentum iaculis. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Penatibus et magnis dis parturient. </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicPlayer;
