import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import cassette_api from '../api';

export const TestTrack = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  
  const onDrop = (acceptedFiles) => {
    setAudioFiles(acceptedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    audioFiles.forEach((file, index) => {
      formData.append(`audioFile_${index}`, file);
    });

    cassette_api.post('/music', formData)
      .then(response => {
        console.log(response.data.message)
      })
      .catch(error => {
        console.error(error);
      })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form className={`form bg-light vh-100 w-100 `} onSubmit={handleSubmit}>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} accept="audio/*" multiple />
        <p>Drag 'n' drop some audio files here, or click to select files</p>
      </div>
      <div>
        {audioFiles.map((file, index) => (
          <div key={index}>
            <p>{file.name}</p>
            <audio controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};
