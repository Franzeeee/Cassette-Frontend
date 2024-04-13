import React, { useState } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';
import styles from '../../assets/css/ArtistStudio/artist-dashboard.module.css'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function ArtistDashboard() {
    const [music] = useState([
        {
            id: '1000',
            pos: '1',
            name: 'Pare Mahal Mo Raw Ako',
            album: 'Boomshakalaka',
            points: 93210,
            date: 'April 4, 2024',
        },
        {
            id: '1000',
            pos: '1',
            name: 'Pare Mahal Mo Raw Ako',
            album: 'Boomshakalaka',
            points: 93210,
            date: 'April 4, 2024',
        },
        {
            id: '1000',
            pos: '1',
            name: 'Pare Mahal Mo Raw Ako',
            album: 'Boomshakalaka',
            points: 93210,
            date: 'April 4, 2024',
        },
        {
            id: '1000',
            pos: '1',
            name: 'Pare Mahal Mo Raw Ako',
            album: 'Boomshakalaka',
            points: 93210,
            date: 'April 4, 2024',
        },
        {
            id: '1000',
            pos: '1',
            name: 'Pare Mahal Mo Raw Ako',
            album: 'Boomshakalaka',
            points: 93210,
            date: 'April 4, 2024',
        },
    ]);

    // Custom Column for the data table
    const customBody = (rowData) => {
        // Return the custom content for each row
        const handleButtonClick = (data) => {

        }
        return (
            <div className={`d-flex align-align-items-center justify-content-center`}>
                <button className={`${styles.viewButton}`} onClick={() => handleButtonClick(rowData)}>View Album</button>
            </div>
        );
    };

    return (
        <ArtistLayout>
            <div className={`col-10 h-100 d-flex align-align-items-center justify-content-center p-3 overflow-auto ${styles['artistDashboard']}`}  style={{minHeight: '90vh', maxHeight: '90svh'}}>
                <div className="row w-100 d-flex flex-column justify-content-between align-align-items-center">
                    <div className="col-12 h-2 d-flex gap-2 mt-1" style={{flex: '.5', maxHeight: '30%'}}>
                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                            <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Follows</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'>24760</h5>
                            </div>
                        </div>

                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                        <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Total Listens</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'>43048</h5>
                            </div>
                        </div>

                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                        <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Content Posted</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'>69</h5>
                            </div>
                        </div>
                    </div>
                    <h5 className=' text-light mt-4'>Top Uploaded Music</h5>
                    <div className="col-12 d-flex flex-column overflow-hidden overflow-y-auto " style={{flex: '1', maxHeight: '75%'}}>
                        <DataTable value={music} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="pos" header="#"></Column>
                            <Column field="name" header="Music Title"></Column>
                            <Column field="album" header="Album"></Column>
                            <Column field="points" header="Points"></Column>
                            <Column field="date" header="Upload Date"></Column>
                            
                            <Column header="Custom Column" body={customBody(1)}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </ArtistLayout>
    );
}

export default ArtistDashboard;
