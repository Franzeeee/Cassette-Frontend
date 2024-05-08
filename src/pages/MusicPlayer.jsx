import React, { useState, useEffect } from 'react';
import LayoutMP from '../Layout/LayoutMP';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; 
import ArtistImg from "../assets/img/artist-img.jpg";
import styles from '../assets/css/music-player.module.css';
import { useParams } from "react-router-dom"
import cassette_api from '../api';

function MusicPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const { type, index } = useParams()

  useEffect( () => {

    // if(totalPoints === 0 && tracks.length > 0){
      
    //   cassette_api.post('/listen/record', { music_id: tracks[currentTrackIndex].id, points: 0 })
    //   .then(response => {
    //     console.log('Points recorded:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error recording points:', error);
    //   });

    // }else if(totalPoints > 0 && tracks.length > 0){
    //   cassette_api.post('/listen/record', { music_id: tracks[currentTrackIndex].id, points: totalPoints })
    //   .then(response => {
    //     console.log('Points recorded:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error recording points:', error);
    //   });
    // }

    // setTimeout(() => {
    //   setTotalPoints(prev => (prev + 1))
    // },10000)
  } ,[])

  useEffect(() => {
    // Define the API endpoint based on the type
    let endpoint;
    let requestData = {};
    if (type === 'playlist') {
      endpoint = '/playlist/fetchMusic';
      requestData = { id: index };
    } else if (type === 'album') {
      endpoint = '/fetchMusic';
      requestData = { album_id: index };
    } else {
      // Handle other types or invalid type
      console.error('Invalid type:', type);
      return null; // or render an error message
    }

    // Fetch music data from the backend
    cassette_api
      .post(endpoint, requestData)
      .then(response => {
        // Set the fetched tracks to the state
        if (type === 'playlist') {
          const filteredTracks = response.data.music.filter(track => !track.deleted_at);
          
          setTracks(filteredTracks);
        } else {
          setTracks(response.data);
        }
      })
      .catch(error => console.error('Error fetching tracks:', error));
  }, [type, index]);

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setTotalPoints(0); // Reset points when changing tracks
  };

  const handleNextTrack = () => {
    if (currentTrackIndex === tracks.length - 1) {
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }
  const handlePrevTrack = () => {
    if( currentTrackIndex > 0){
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }

  const handleSeek = (event) => {
    const seekTime = event.target.currentTime; // Get the current playback position
    console.log('Seek time:', seekTime);
  };

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioBlobFetched, setAudioBlobFetched] = useState(false);

  useEffect(() => {
    // Fetch the audio blob only if it hasn't been fetched yet
    if (!audioBlobFetched) {
      fetchAudioBlob();
    }
  }, [audioBlobFetched]);
    
  async function fetchAudioBlob() {
    try {
      const response = await fetch('http://localhost/api/audio');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      setAudioBlob(URL.createObjectURL(blob));
      setAudioBlobFetched(true); // Set audioBlobFetched to true after fetching
    } catch (error) {
      console.error('Error fetching audio blob:', error);
    }
  }
  
  return (
    <LayoutMP activePage={"Music"}>
      <div className={styles.Container}>
        <div className={styles.MainContainer}>
          <div className={styles.TopContainer} onMouseEnter={() => setShowAudioPlayer(true)} onMouseLeave={() => setShowAudioPlayer(false)}>
            <h5 className='position-absolute text-light' style={{ top: '15px', left: '15px' }}>{tracks.length > 0 ? tracks[currentTrackIndex].title : "Loading"}</h5>
            <img src={tracks.length > 0 ? tracks[currentTrackIndex].album_cover : ArtistImg} alt="Album Image" className={styles.AlbumImage} />
            <div className={`${styles.AudioPlayerWrapper} ${showAudioPlayer ? styles.Show : styles.Hide}`}>
              <ReactAudioPlayer
                src={tracks.length > 0 && audioBlob !== null? audioBlob : null}
                autoPlay={true}
                showSkipControls
                controls
                style={{
                  width: '58vw',
                  height: '90px',
                  backgroundColor: 'transparent',
                  color: '#fffff',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
                onSeeked={(e) => handleSeek(e)}
                onClickNext={handleNextTrack}
                onClickPrevious={handlePrevTrack}
                showJumpControls
                className="react-audio-player"
                onEnded={handleNextTrack}
                onPlay={() => setTotalPoints(0)}
                // Add this prop to enable byte range requests
                config={{
                  file: {
                    forceAudio: true, // Treat it as an audio file
                    attributes: {
                      controlsList: 'nodownload', // Disable downloading
                      controls: true, // Show the default controls
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.BottomContainer}>
            <div className={styles.PlaylistContainer}>
              {tracks.length > 0 && tracks.map((track, index) => (
                <div className={`${styles.Track} ${styles.HighlightOnHover}`} key={track.id} onClick={() => handleTrackChange(index)}>
                  <div className={styles.TrackInfo}>
                    <div className={styles.TrackImage}>
                      <img src={track.album_cover} alt="Album Image" />
                    </div>
                    <div className={styles.TrackTitle}>
                      <p>{track.title}</p>
                      <p>{track.artist}</p>
                    </div>
                  </div>
                  <div className={styles.Album}>
                    <p>{track.album_id}</p>
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
              <img src={tracks.length > 0 ? tracks[currentTrackIndex].album_cover : ArtistImg} alt="Album Image" />
            </div>
            <div className={styles.TitleArtistContainer}>
              <h2 style={{ fontWeight: 'bold' }}>{tracks.length > 0 ? tracks[currentTrackIndex].title : "Loading..."}</h2>
              <p style={{ color: 'gray', marginLeft: '5px' }}>{tracks.length > 0 ? tracks[currentTrackIndex].artist : "Loading..."}</p>
            </div>
          </div>

          {/* Container for Artist Info */}
          <div className={styles.ArtistInfoContainer}>
            <div className={styles.ArtistImageContainer}>
              <img src={ArtistImg} alt="Artist Image" />
            </div>
            <div className={styles.ArtistDetailsContainer}>
              <h3>About the artist</h3>
              <h2 style={{ color: 'lightgray' }}>{tracks.length > 0 ? tracks[currentTrackIndex].artist : "Loading..."}</h2>
              <button>Follow</button>
              <p style={{ margin: '0px 10px 0px 10px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Eu sem integer vitae justo eget magna fermentum iaculis. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Penatibus et magnis dis parturient. </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicPlayer;