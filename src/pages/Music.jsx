import React from "react";
import { Link } from "react-router-dom";
import LayoutMP from "../Layout/LayoutMP";
import "../assets/css/music.css";
import "../assets/css/Circular.css";
import DefImage from "../assets/img/Cassettelogosq.png";

function Music() {
    const categories = [
        { title: "Top Charts", image: DefImage },
        { title: "New Releases", image: DefImage },
        { title: "Recommended for You", image: DefImage },
        { title: "Artist Spotlight", image: DefImage },
        { title: "Rock", image: DefImage },
        { title: "Pop", image: DefImage },
        { title: "Hip Hop", image: DefImage },
        { title: "Rap", image: DefImage },
        { title: "Electronic", image: DefImage },
        { title: "Jazz", image: DefImage },
        { title: "Blues", image: DefImage },
        { title: "Music History", image: DefImage },
        { title: "Music Education", image: DefImage },
        { title: "Featured Labels", image: DefImage },
        { title: "Collaborations", image: DefImage },
        { title: "Music Challenges", image: DefImage },
        { title: "Music News", image: DefImage },
        { title: "Music Reviews", image: DefImage },
        { title: "Music Discovery", image: DefImage },
        { title: "Music Recommendations", image: DefImage }
    ];

    // Function to generate a random color based on a dark red accent theme
    const generateRandomColor = () => {
        const baseColor = "#c20000"; 
        const red = Math.floor(Math.random() * 100); 
        const green = Math.floor(Math.random() * 100); 
        const blue = Math.floor(Math.random() * 100); 
        const newColor = `rgb(${red},${green},${blue})`;
        return newColor;
    };

    return (
        <LayoutMP activePage={"Music"}>
            <h3 className="browse">Browse all</h3>
            <div className="browse-cards-container">
                <div className="mcards-container">
                    {categories.map((category, index) => (
                        <Link to={`/music/${category.title.toLowerCase().replace(/\s/g, "-")}`} key={index}>
                            <div className="mcard" style={{ backgroundColor: generateRandomColor() }}>
                                <img src={category.image} alt={category.title} className="mcard-image" />
                                <h4>{category.title}</h4>
                                {/* Add other content for the card if needed */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </LayoutMP>
    );
}

export default Music;
