import React, { useState, useEffect, useRef } from "react";
import LayoutMP from "../Layout/LayoutMP";
import { Typography, IconButton } from "@mui/material";
import {
  PlayArrowOutlined,
  SkipNextOutlined,
  SkipPreviousOutlined,
  PauseOutlined,
  Shuffle,
  Repeat,
} from "@mui/icons-material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HearingIcon from "@mui/icons-material/Hearing";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "../assets/css/music-player.module.css";
import Track1 from "../assets/img/artist-img.jpg";
import track1lyrics from "../assets/lyrics/track1lyrics.txt";
import track2lyrics from "../assets/lyrics/track2lyrics.txt";
import cassete_api from "../api";

function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyricsContent, setLyricsContent] = useState("");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [activeButton, setActiveButton] = useState("lyrics");
  const [nextTracks, setNextTracks] = useState([]);
  const [progress, setProgress] = useState(0); // State to track progress

  const progressBarRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    // Fetch music data from the backend
    cassete_api
      .get("/music")
      .then(async (response) => {
        // Transform the response data into the desired format
        const formattedTracks = await Promise.all(
          response.data.map(async (track, index) => {
            const audioUrl = track.music_file_name; // Assuming this is the URL of the audio file
            try {
              // Fetch duration for the audio file
              const duration = await getAudioDuration(audioUrl);
              // Return formatted track with duration
              return {
                number: index + 1,
                image: Track1, // Replace with the actual image
                title: track.title,
                artist: track.artist,
                duration: formatDuration(duration), // Format duration as needed
                listens: 1000, // Sample listens count
                likes: 500, // Sample likes count
                lyrics: track1lyrics, // Sample lyrics
                audio_link: audioUrl,
                durationInSeconds: duration, // Store duration in seconds for progress calculation
              };
            } catch (error) {
              console.error("Error fetching duration for track:", error);
              // If there's an error fetching duration, return the track without duration
              return {
                number: index + 1,
                image: Track1, // Replace with the actual image
                title: track.title,
                artist: track.artist,
                duration: "Unknown",
                listens: 1000, // Sample listens count
                likes: 500, // Sample likes count
                lyrics: track1lyrics, // Sample lyrics
                audio_link: audioUrl,
                durationInSeconds: 0,
              };
            }
          })
        );
        setNextTracks(formattedTracks);
        // Set the formatted tracks to the state
      })
      .catch((error) => console.log(error));
  }, []);

  // Function to fetch and get the duration of the audio file
  async function getAudioDuration(url) {
    // Create an audio element
    const audio = new Audio();
    // Set the audio source to the provided URL
    audio.src = url;

    // Return a promise that resolves with the duration once the metadata has loaded
    return new Promise((resolve, reject) => {
      // Once the metadata has loaded, resolve with the duration
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });
      // If there's an error loading the audio, reject the promise
      audio.addEventListener("error", (error) => {
        reject(error);
      });
    });
  }

  // Function to format duration (if needed)
  function formatDuration(duration) {
    // Format duration as needed (e.g., convert to minutes:seconds format)
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const handlePlayPause = () => {
    const audio = audioPlayerRef.current;
    if (isPlaying) {
      audio.pause();
      clearInterval(progressIntervalRef.current);
    } else {
      audio.play();
      startProgressUpdate();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const audio = audioPlayerRef.current;
    clearInterval(progressIntervalRef.current);
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % nextTracks.length);
    setProgress(0); // Reset progress when switching tracks
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play();
      startProgressUpdate();
    }
  };

  const handlePreviousTrack = () => {
    const audio = audioPlayerRef.current;
    clearInterval(progressIntervalRef.current);
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + nextTracks.length) % nextTracks.length
    );
    setProgress(0); // Reset progress when switching tracks
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play();
      startProgressUpdate();
    }
  };

  const handleLyricsClick = () => {
    setShowLyrics(true);
    setShowPlaylist(false);
    setActiveButton("lyrics");
  };

  const handlePlaylistClick = () => {
    setShowPlaylist(true);
    setShowLyrics(false);
    setActiveButton("playlist");
  };

  const handleTrackPlay = (index) => {
    const audio = audioPlayerRef.current;
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    audio.currentTime = 0;
    startProgressUpdate();
  };

  const startProgressUpdate = () => {
    const audio = audioPlayerRef.current;
    const totalDuration = nextTracks[currentTrackIndex].durationInSeconds;

    // Clear any existing interval to avoid multiple intervals running simultaneously
    clearInterval(progressIntervalRef.current);

    // Set up a new interval to update progress
    progressIntervalRef.current = setInterval(() => {
      const currentTime = audio.currentTime;
      const progressPercentage = (currentTime / totalDuration) * 100;
      setProgress(progressPercentage);
    }, 100); // Update progress every 100ms
  };

  const handleProgressBarDrag = (e) => {
    const progressBar = progressBarRef.current;
    const progressBarRect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - progressBarRect.left;
    const progressBarWidth = progressBarRect.width;
    const progressPercentage = (offsetX / progressBarWidth) * 100;
    setProgress(progressPercentage);

    const audio = audioPlayerRef.current;
    const totalDuration = nextTracks[currentTrackIndex].durationInSeconds;
    audio.currentTime = (progressPercentage / 100) * totalDuration;
  };

  useEffect(() => {
    if (showLyrics) {
      fetch(nextTracks[currentTrackIndex].lyrics)
        .then((response) => response.text())
        .then((data) => setLyricsContent(data))
        .catch((error) => console.log(error));
    }
  }, [showLyrics, currentTrackIndex, nextTracks]);

  return (
    <LayoutMP activePage={"music-player"}>
      {/* Audio Element */}
      <audio
        ref={audioPlayerRef}
        controls
        src={
          nextTracks.length > 0 && nextTracks[currentTrackIndex].audio_link
        }
        autoPlay={false}
        onEnded={handleNextTrack}
        id="audio"
        style={{ display: "none" }}
      ></audio>
      <div className={styles.mainContainer}>
        <div className={styles.gridContainer}>
          <div className={styles.musicPlayerBox}>
            <div className={styles.player}>
              <div className={styles.songInfo}>
                <Typography variant="h6">
                  {nextTracks.length > 0 &&
                    nextTracks[currentTrackIndex].title}
                </Typography>
                <Typography variant="subtitle1">
                  {nextTracks.length > 0 &&
                    nextTracks[currentTrackIndex].artist}
                </Typography>
              </div>
              <div className={styles.controls}>
                <IconButton aria-label="shuffle" onClick={handleNextTrack}>
                  <Shuffle />
                </IconButton>
                <IconButton
                  aria-label="previous"
                  onClick={handlePreviousTrack}
                >
                  <SkipPreviousOutlined />
                </IconButton>
                <IconButton
                  className={styles.playPauseButton}
                  aria-label="play/pause"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <PauseOutlined /> : <PlayArrowOutlined />}
                </IconButton>
                <IconButton aria-label="next" onClick={handleNextTrack}>
                  <SkipNextOutlined />
                </IconButton>
                <IconButton aria-label="loop" onClick={handleNextTrack}>
                  <Repeat />
                </IconButton>
              </div>
            </div>
            <div
              className={styles.progressBar}
              onClick={handleProgressBarDrag}
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  handleProgressBarDrag(e);
                }
              }}
              ref={progressBarRef}
            >
              {/* Update value of LinearProgress based on progress */}
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBarThumb}
                  style={{ left: `${progress}%` }}
                ></div>
                <div
                  className={styles.progressBarTrack}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.buttonsContainer}>
              <button
                className={activeButton === "lyrics" ? styles.active : ""}
                onClick={handleLyricsClick}
              >
                Lyrics
              </button>
              <button
                className={activeButton === "playlist" ? styles.active : ""}
                onClick={handlePlaylistClick}
              >
                Playlist
              </button>
            </div>
            {showLyrics && (
              <div className={styles.lyricsContainer}>
                <Typography className={styles.lyricsContent}>
                  {lyricsContent}
                </Typography>
              </div>
            )}
            {showPlaylist && (
              <div className={styles.playlistContainer}>
                {nextTracks.map((track, index) => (
                  <div
                    key={index}
                    className={`${styles.playlistTrack} ${
                      currentTrackIndex === index ? styles.playing : ""
                    }`}
                  >
                    <div className={styles.playlistTrackNumber}>
                      {track.number}
                    </div>
                    <img
                      className={styles.playlistTrackImage}
                      src={track.image}
                      alt={track.title}
                    />
                    <div className={styles.playlistTrackInfo}>
                      <div className={styles.playlistTrackTitle}>
                        {track.title}
                      </div>
                      <div className={styles.playlistTrackArtist}>
                        {track.artist}
                      </div>
                    </div>
                    <div
                      className={styles.playlistTrackPlayButton}
                      onClick={() => handleTrackPlay(index)}
                    >
                      {isPlaying && currentTrackIndex === index ? (
                        <PauseOutlined />
                      ) : (
                        <PlayArrowOutlined />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.nextTracksContainer}>
            <Typography
              className={`${styles.nextTracksTitle} ${styles.stickyTitle}`}
              variant="h5"
              component="div"
            >
              Next Tracks
            </Typography>
            {nextTracks.map((track, index) => (
              <div key={index} className={styles.nextTrack}>
                <div className={styles.nextTrackNumber}>{track.number}</div>
                <img
                  className={styles.nTrackImage}
                  src={track.image}
                  alt={track.title}
                />
                <div className={styles.nTrackInfo}>
                  <div className={styles.nTrackTitle}>{track.title}</div>
                  <div className={styles.nTrackArtist}>{track.artist}</div>
                  <div className={styles.nTrackPlaytime}>
                    <span className={styles.icon}>
                      <ScheduleIcon />
                    </span>
                    {track.duration}
                  </div>
                  <div className={styles.nTrackListens}>
                    <span className={styles.icon}>
                      <HearingIcon />
                    </span>
                    {track.listens}
                  </div>
                  <div className={styles.nTrackLikes}>
                    <span className={styles.icon}>
                      <FavoriteIcon />
                    </span>
                    {track.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutMP>
  );
}

export default MusicPlayer;
