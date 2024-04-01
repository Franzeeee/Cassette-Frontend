import ArtistImg from "../assets/img/artist-img.jpg";
import AlbumImg from "../assets/img/Cassettelogosq.png";
import cassette_api from "../api";
import { useEffect, useState } from "react";

export const artists = [
    { id: 1, name: "Dyo", description: "Artist", image: ArtistImg },
    { id: 2, name: "J. Poole", description: "Artist", image: ArtistImg },
    { id: 3, name: "19 Savage", description: "Artist", image: ArtistImg },
    { id: 4, name: "Yoyoy", description: "Artist", image: ArtistImg },
    { id: 5, name: "Hev Agi", description: "Artist", image: ArtistImg },
    { id: 6, name: "George", description: "Artist", image: ArtistImg }

  ];


// useEffect(()=> {
//     const [albums, setAlbums] = useState([]);
//     cassette_api.get('/album/all')
//         .then(response => {
//             console.log(response)
//         })
//         .catch(error => {
//             console.error("Error fetching albums: ", error)
//         })
// }, []);

export const albums = [
    { id: 1, name: "Album 1", description: "Description 1", image: AlbumImg },
    { id: 2, name: "Album 2", description: "Description 2", image: AlbumImg },
    { id: 3, name: "Album 3", description: "Description 3", image: AlbumImg },
    { id: 4, name: "Album 4", description: "Description 4", image: AlbumImg },
    { id: 5, name: "Album 5", description: "Description 5", image: AlbumImg }
  ];