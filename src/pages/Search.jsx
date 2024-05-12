import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import styles from '../assets/css/search.module.css';
import CardImage from "../assets/img/Cassettelogosq.png";
import cassette_api from "../api";
import { ToastContainer, toast } from "react-toastify";

function Search() {

    const {search} = useParams()
    const navigate = useNavigate()

    const generateRandomColor = () => {
        const baseColor = "#c20000"; 
        const red = Math.floor(Math.random() * 100); 
        const green = Math.floor(Math.random() * 100); 
        const blue = Math.floor(Math.random() * 100); 
        const newColor = `rgb(${red},${green},${blue})`;
        return newColor;
    };

    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);

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

    useEffect(() => {
        toast.loading("Fetching Search Result...")
        cassette_api.get(`/search/${search}`)
        .then(response => {
            const albumsFetched = response.data.albums;
            const artistFetched = response.data.users;
            const musicFetched = response.data.music;

            setAlbums([...albumsFetched])
            setArtists([...artistFetched])
            setTracks([...musicFetched])
            console.log(albumsFetched)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            toast.dismiss();
        })

    }, [search]);

    useEffect(() => {
        console.log("Albums: ", albums)
        console.log("Artists: ",artists)
        console.log("Music: " ,tracks)
    },[albums, artists, tracks])
    return (
        <LayoutMP activePage={"Home"}>
            <div className={styles.ResultsContainer}>
                <ToastContainer  containerId={"search"} />
                <div className={styles.musicContainer}>
                    <div className={styles.musicHeader}>Album</div>
                    <div className={styles.musicCards}>
                        {albums.length > 0 ? albums.map(album => (
                            <div className={styles.card} key={album.id} 
                                style={{ backgroundImage: `url(${album.cover_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                                onClick={() => navigate(`/album/${album.id}`)
                            }>
                                <img src={CardImage} alt="Song" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{album.title}</h5>
                                </div>
                            </div>
                        )): 
                        <h4 className="m-0 text-danger">No Result Found</h4>
                        }
                    </div>
                </div>

                <div className={styles.artistContainer}>
                    <div className={styles.artistHeader}>Artist</div>
                    <div className={styles.artistCards}>
                        {artists.length > 0 ? artists.map(artist => (
                            <div className={styles.card} key={artist.id} style={{ backgroundColor: generateRandomColor() }} onClick={() => navigate('')}>
                                <img src={CardImage} alt="Artist" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{artist.name}</h5>
                                </div>
                            </div>
                        )) : 
                        <h4 className="m-0 text-danger">No Result Found</h4>
                        }
                    </div>
                </div>

                <div className={styles.videocastContainer}>
                    <div className={styles.videocastHeader}>
                        <h3>Song</h3> 
                        <h5 className={`${tracks.length > 10 ? "opacity-100 " : "opacity-0"}`}>View All</h5>
                    </div>
                    <div className={styles.videocastCards}>
                        {tracks.length > 0 ? tracks.slice(0, 10).map(track => (
                            <div className={styles.card} key={track.id} style={{ backgroundColor: generateRandomColor() }} onClick={() => navigate(`/album/${track.album_id}`)}>
                                <img src={CardImage} alt="Track" className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h5>{track.title}</h5>
                                </div>
                            </div>
                        )) : 
                        <h4 className="m-0 text-danger">No Result Found</h4>
                        }
                    </div>
                </div>
            </div>
        </LayoutMP>
    );
}

export default Search;