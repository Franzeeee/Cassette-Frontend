import React, { useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';

function ArtistDashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', selectedFile);
    
        try {
            const response = await cassette_api.post('/music', formData);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    

    return (
        <ArtistLayout>
                <div className="col-10 h-100 d-flex align-align-items-center justify-content-center p-5">
                    <form className='w-50 d-flex flex-column gap-3' onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" rows="3" value={description} onChange={handleDescriptionChange}></textarea>
                        </div>
                        <div className="form-group d-flex flex-column">
                            <label htmlFor="file">Upload Music File:</label>
                            <input type="file" className="form-control-file" id="file" onChange={handleFileChange} accept=".mp3" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
        </ArtistLayout>
    );
}

export default ArtistDashboard;
