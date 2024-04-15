import React, { useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';



function ArtistUploads() {
    

    return (
        <ArtistLayout >
                <div className="col-10 h-100 d-flex align-align-items-center justify-content-center p-5">
                   <h5 className='m-0 text-white'>Uploaded Contents</h5>
                </div>
        </ArtistLayout>
    );
}

export default ArtistUploads;
