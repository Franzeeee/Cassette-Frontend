import React from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import styles from '../assets/css/search.module.css';
import CardImage from "../assets/img/Cassettelogosq.png";

function Search() {

    const generateRandomColor = () => {
        const baseColor = "#c20000"; 
        const red = Math.floor(Math.random() * 100); 
        const green = Math.floor(Math.random() * 100); 
        const blue = Math.floor(Math.random() * 100); 
        const newColor = `rgb(${red},${green},${blue})`;
        return newColor;
    };

    
    const dummySongs = [
        { id: 1, songName: "Song 1" },
        { id: 2, songName: "Song 2" },
        { id: 3, songName: "Song 3" },
        { id: 4, songName: "Song 4" },
        { id: 5, songName: "Song 5" },
        { id: 6, songName: "Song 6" }

    ];

    const dummyArtists = [
        { id: 1, artistName: "Artist 1" },
        { id: 2, artistName: "Artist 2" },
        { id: 3, artistName: "Artist 3" },
        { id: 4, artistName: "Artist 4" },
        { id: 5, artistName: "Artist 5" },
        { id: 6, artistName: "Artist 6" }

    ];

    const dummyVideocasts = [
        { id: 1, VideoCastName: "Videocast 1" },
        { id: 2, VideoCastName: "Videocast 2" },
        { id: 3, VideoCastName: "Videocast 3" },
        { id: 4, VideoCastName: "Videocast 4" },
        { id: 5, VideoCastName: "Videocast 5" },        
        { id: 6, VideoCastName: "Videocast 6" }        
    ];

    return (
        <LayoutMP activePage={"Home"}>
            <div className={styles.ResultsContainer}>
                <div className={styles.musicContainer}>
                    <div className={styles.musicHeader}>Music</div>
                    <div className={styles.musicCards}>
                        {dummySongs.map(song => (
                            <div className={styles.card} key={song.id} style={{ backgroundColor: generateRandomColor() }}>
                                <img src={CardImage} alt="Song" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{song.songName}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.artistContainer}>
                    <div className={styles.artistHeader}>Artist</div>
                    <div className={styles.artistCards}>
                        {dummyArtists.map(artist => (
                            <div className={styles.card} key={artist.id} style={{ backgroundColor: generateRandomColor() }}>
                                <img src={CardImage} alt="Artist" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{artist.artistName}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.videocastContainer}>
                    <div className={styles.videocastHeader}>Videocast</div>
                    <div className={styles.videocastCards}>
                        {dummyVideocasts.map(videocast => (
                            <div className={styles.card} key={videocast.id} style={{ backgroundColor: generateRandomColor() }}>
                                <img src={CardImage} alt="Videocast" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{videocast.VideoCastName}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutMP>
    );
}

export default Search;