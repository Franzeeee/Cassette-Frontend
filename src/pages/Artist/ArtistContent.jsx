import React, { useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';
import styles from '../../assets/css/ArtistStudio/artist-upload.module.css';
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select';

function ArtistContent() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState('');

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAlbumChange = (event) => {
        setSelectedAlbum(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('album', selectedAlbum);
        formData.append('file', selectedFile);

    
        cassette_api.post('/music', formData)
        .then(response => {
            toast.success(response.data.message);
        })
        .catch(error => {
            toast.error('Error:', error);
        });

    };

    // Sample object of genre options
    const genreOptions = [
        { value: 'rock', label: 'Rock' },
        { value: 'pop', label: 'Pop' },
        { value: 'hiphop', label: 'Hip Hop' },
        { value: 'rap', label: 'Rap' },
        { value: 'country', label: 'Country' },
        { value: 'classic', label: 'Classic' }
    ];

    // Sample array of album options
    const albumOptions = [
        { value: 'none', label: 'None' },
        { value: 'album1', label: 'Album 1' },
        { value: 'album2', label: 'Album 2' },
        { value: 'album3', label: 'Album 3' }
    ];

    return (
        <ArtistLayout active={"Upload"}>
            <div className="col-10 h-100 d-flex align-align-items-center justify-content-center p-5 text-light">
                <ToastContainer />
                <form className={`w-50 d-flex flex-column gap-3 ${styles['upload-form']}`} onSubmit={handleSubmit} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="file">Upload Music File:</label>
                        <input type="file" className="form-control-file border p-1" id="file" onChange={handleFileChange} accept=".mp3" required  multiple/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title (Required)</label>
                        <input type="text" className="form-control bg-transparent rounded-0 p-2 text-light" id="title" value={title} onChange={handleTitleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre (Required)</label>
                        <select
                            className="form-control bg-transparent rounded-0 p-2 text-light"
                            id="genre"
                            value={genre}
                            onChange={handleGenreChange}
                            required
                        >
                            <option className='bg-dark' value="">Select Genre</option>
                            {genreOptions.map((option) => (
                                <option className='bg-dark' key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="album">Album</label>
                        <select
                            className="form-control bg-transparent rounded-0 p-2 text-light"
                            id="album"
                            value={selectedAlbum}
                            onChange={handleAlbumChange}
                            required
                        >
                            <option className='bg-dark' value="">Select Album</option>
                            {albumOptions.map((option) => (
                                <option className='bg-dark' key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        {/* <Select options={options} className='form-control bg-transparent rounded-0 p-2 text-light' isMulti/> */}
                    </div>
                    <button type="submit" className="btn btn-outline-danger">Upload</button>
                </form>
            </div>
        </ArtistLayout>
    );
}

export default ArtistContent;
