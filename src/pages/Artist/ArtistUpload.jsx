import React, { useEffect, useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';
import styles from '../../assets/css/ArtistStudio/artist-upload.module.css';
import { toast, ToastContainer } from 'react-toastify'
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faDeleteLeft, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { customStyle } from '../../assets/css/select';
import { Card } from 'react-bootstrap';

import uploadImage from '../../assets/img/upload-image.jpg'
import cassete from '../../assets/img/Cassettelogosq.png'
import { useNavigate } from 'react-router';

function ArtistUpload() {
    let toSubmit = true;
    const [audioInfo, setAudioInfo] = useState([]);
    const [audioFiles, setAudioFiles] = useState([]);
    const [albumDetails, setAlbumDetails] = useState({
        cover: null,
        title: '',
        description: '',
    });
    const [image, setImage] = useState(null)
    const navigate = useNavigate()

    const musicGenres = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'hipHop', label: 'Hip Hop' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'classical', label: 'Classical' },
    { value: 'country', label: 'Country' },
    { value: 'blues', label: 'Blues' },
    { value: 'folk', label: 'Folk' },
    { value: 'reggae', label: 'Reggae' }
    ];


      //Format the duration to mm:ss
    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to fetch the duration of an audio file
    const getAudioDuration = async (url) => {
        try {
            const audio = new Audio(url);
            await new Promise((resolve, reject) => {
                audio.addEventListener('loadedmetadata', () => {
                    resolve();
                });
                audio.addEventListener('error', (error) => {
                    reject(error);
                });
            });
            return formatDuration(audio.duration);
        } catch (error) {
            console.error('Error fetching duration:', error);
            return 0; // Return 0 if there's an error
        }
    };

    const onDrop = async (acceptedFiles) => {
        const newAudioInfo = await Promise.all(acceptedFiles.map(async (file) => {
            // Fetching the filename
            const fileName = file.name;
            
            // Fetching the duration of the audio (if available)
            const duration = await getAudioDuration(URL.createObjectURL(file));
        
            // Empty array with the name of genre
            const genres = [];
        
            return { fileName, duration, genres };
        }));
        
        // Updating audioInfo state with the new array of objects
        setAudioInfo(prevAudioInfo => [...prevAudioInfo, ...newAudioInfo]);
        
        // Adding acceptedFiles to audioFiles state
        setAudioFiles(prev => [...prev, ...acceptedFiles]);
    };
    

    useEffect(() => {
        console.log('Audio Files: ', audioFiles)
        console.log('Audio Data: ', audioInfo)
    }, [audioFiles]);

    useEffect(() => {
        console.log('AlbumInfo: ', albumDetails)
    },[albumDetails])

    const handleChangeName = (e, index) => {
        const newFileName = e.target.value;
            setAudioInfo(prevAudioInfo => {
                const updatedAudioInfo = [...prevAudioInfo];
                updatedAudioInfo[index].fileName = newFileName;
                return updatedAudioInfo;
            });
    }

    const handleDelete = (index) => {
        // Remove the audio file from the audioFiles state array
        const updatedAudioFiles = [...audioFiles];
        updatedAudioFiles.splice(index, 1);
        setAudioFiles(updatedAudioFiles);

        // Remove the audio details from the audioInfo state array
        const updatedAudioInfo = [...audioInfo];
        updatedAudioInfo.splice(index, 1);
        setAudioInfo(updatedAudioInfo);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        audioFiles.forEach((file, index) => {
            formData.append(`audioFile_${index}`, file);
        });

        // Append each audio info item separately as an array
        audioInfo.forEach((info, index) => {
            formData.append(`tracksInfo[${index}][fileName]`, info.fileName);
            formData.append(`tracksInfo[${index}][duration]`, info.duration);
            info.genres.forEach((genre, genreIndex) => {
                formData.append(`tracksInfo[${index}][genres][${genreIndex}]`, genre);
            });
        });

        formData.append('albumCover', albumDetails.cover);
        formData.append('albumTitle', albumDetails.title);
        formData.append('albumDescription', albumDetails.description);
        formData.append('id', localStorage.getItem("ID"))


        cassette_api.post('/music', formData)
            .then(response => {
                toast.success(response.data.message, {autoClose: 1500});
                setTimeout(() => {
                    navigate(`/album/${response.data.albumId}`)
                }, 1500);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    const errors = error.response.data.errors;
                    Object.keys(errors).forEach(field => {
                        errors[field].forEach(errorMessage => {
                            toast.error(`${errorMessage}`);
                        });
                    });
                } else {
                    toast.error('An error occurred while processing your request.');
                }
            })

    };

    const handleSelect = (selectedOptions, index) => {
        // Check if the index is within the bounds of the array
        if (index >= 0 && index < audioInfo.length) {
            const selectedValues = selectedOptions.map(option => option.value);
            // Update genres array for the corresponding audioInfo object
            const updatedAudioInfo = [...audioInfo];
            updatedAudioInfo[index].genres = selectedValues;
            setAudioInfo(updatedAudioInfo); // Update audioInfo state
        } else {
            console.error('Invalid index:', index);
        }
    };

        // Function to handle change events of the inputs
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setAlbumDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleFileInputChange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                // Check if the selected file is an image
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
        
                // Set the cover in albumDetails state
                setAlbumDetails(prevState => ({
                    ...prevState,
                    cover: file
                }));
            } else {
                // If the selected file is not an image, show an error message
                toast.error("Please select a valid image file.");
            }
        };
        

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <ArtistLayout active={"Upload"}>
            <div className={`col-10 h-100 d-flex align-align-items-center justify-content-center p-5 text-light overflow-auto ${styles.contentContainer}`}>
                <ToastContainer />
                <form className={`w-75 d-flex flex-column gap-3 ${styles['upload-form']}`} onSubmit={handleSubmit} >
                    <div className="form-group d-flex flex-column">
                        <div {...getRootProps()} className={`dropzone ${styles.dropZone}`}>
                            <input {...getInputProps()} accept="audio/*" multiple />
                            
                            <FontAwesomeIcon icon={faCloudArrowUp} className={`${styles.uploadIcon}`}/>
                            <p className='m-0 mt-2'>Drag 'n' drop some audio files here, or click to select files</p>
                        </div>
                    </div>

                    <div className={`card`}>
                        <div className="card-header">
                            Edit & Review
                        </div>
                        <div className={`${styles.tracksContainer} card-body d-flex flex-column gap-3`}>
                            {audioFiles.length !== 0 ? 
                                audioFiles.map((file, index) => (
                                    <div key={index} className={`${styles.trackCard}`}>
                                        <p className='text-light mb-1'>Track #{index + 1}</p>
                                        <div className="w-100 d-flex align-items-center justify-content-between gap-2">
                                            <input
                                                type="text"
                                                className="mb-1 w-100 bg-bg-dark-subtle"
                                                value={audioInfo[index].fileName}
                                                onChange={(e) => handleChangeName(e, index)}
                                            />
                                            <FontAwesomeIcon 
                                                icon={faTrash} 
                                                className={`${styles.deleteIcon}`} 
                                                style={{color: '#f70000', fontSize: '1.3rem', cursor: 'pointer'}} title='Remove Track'
                                                onClick={() => handleDelete(index)}
                                            />
                                        </div>
                                        <audio controls>
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                            Your browser does not support the audio element.
                                        </audio>
                                        <Select
                                            closeMenuOnSelect={false}
                                            isMulti
                                            name="genre"
                                            defaultValue={audioInfo[index].genres.map(genre => ({ value: genre, label: genre }))}
                                            options={musicGenres}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            // styles={customStyle}
                                            onChange={(selectedOptions) => handleSelect(selectedOptions, index)}
                                        />
                                    </div>
                                ))
                                : <p className='m-0 text-light'>No Uploaded Tracks</p>
                            }
                        </div>
                    </div>

                    {/* Album Details */}
                    <Card style={{ width: '100%' }}>
                    <Card.Header>
                        <p className='mb-0'>Album Details</p>
                    </Card.Header>
                        <Card.Body>
                            <div className={`${styles.albumContainer}`}>
                                {/* File input for album cover */}
                                <div className={`${styles.albumImageContainer}`}>
                                    <input 
                                        type="file" 
                                        onChange={handleFileInputChange}
                                        name="albumCover" 
                                    />
                                    <img src={albumDetails.cover != null ? image : uploadImage} 
                                        alt=""
                                        className={`${styles.albumImage}`} />
                                    <p>Upload A Cover Photo</p>
                                </div>
                                {/* Input for album title */}
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Album Title" 
                                        name="title"
                                        value={albumDetails.title}
                                        onChange={handleInputChange} 
                                    />
                                    {/* Input for album description */}
                                    <textarea
                                    placeholder="Album Description"
                                    name="description"
                                    value={albumDetails.description}
                                    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    

                    {toSubmit &&(
                        <button type="submit" className="btn btn-outline-danger">Upload</button>
                    )
                    }
                </form>
            </div>
        </ArtistLayout>
    );
}

export default ArtistUpload;
