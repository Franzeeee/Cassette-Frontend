import React, { useEffect, useState, useRef } from 'react';
import ArtistLayout from '../../Layout/ArtistLayout';
import cassette_api from '../../api';
import styles from '../../assets/css/ArtistStudio/artist-dashboard.module.css'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faHeadphones, faRankingStar, faUpload, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify'

function ArtistDashboard() {
    const [music, setMusic] = useState([]);
    const [totalPoints, setTotalPoints] = useState(null);
    const hasFetchedData = useRef(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        toast.loading('Fetching data...', {theme: 'dark'});
        if (!hasFetchedData.current) {
            cassette_api.post('/listen/top-ten', { user_id: localStorage.getItem("ID") })
                .then(response => {
                    const music_res = response.data;
                    
                    const musicArray = Object.values(music_res).map((item, index) => ({
                        id: item.id,
                        pos: index + 1,
                        name: item.title,
                        album: item.album_name,
                        points: item.points,
                        date: formatDate(item.created_at)
                    }));
        
                    musicArray.sort((a, b) => b.points - a.points);
                    
                    // Sum up all points
                    const totalPointsSum = musicArray.reduce((acc, curr) => acc + curr.points, 0);
                    setTotalPoints(totalPointsSum);

                    setMusic(musicArray);
                })
                .catch(error => {
                    console.error('Error fetching top uploaded music: ', error);
                })
                .finally(() => {
                    if(toast.isActive){
                        toast.dismiss();
                    }
                })

            hasFetchedData.current = true;
            if(toast.isActive){
                toast.dismiss();
            }
        }
    }, []);
    

    // Custom Column for the data table
    const customBody = (rowData) => {
        // Return the custom content for each row
        const handleButtonClick = (data) => {

        }
        return (
            <div className={`d-flex align-align-items-center justify-content-center`}>
                <button className={`${styles.viewButton}`} onClick={() => handleButtonClick(rowData)}>View Album {rowData}</button>
            </div>
        );
    };

    return (
        <ArtistLayout active={"Dashboard"}>
            <div className={`col-10 h-100 d-flex align-align-items-center justify-content-center p-3 overflow-auto ${styles['artistDashboard']}`}  style={{minHeight: '90vh', maxHeight: '90svh'}}>
                <ToastContainer />
                <div className="row w-100 d-flex flex-column justify-content-between align-align-items-center">
                    <div className="col-12 h-2 d-flex gap-2 mt-1" style={{flex: '.5', maxHeight: '30%'}}>
                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                            <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Follows</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'><span className={`${styles.followIcon}`}><FontAwesomeIcon icon={faUsers} /></span>24760</h5>
                            </div>
                        </div>

                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                        <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Total Points</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'><span className={`${styles.followIcon}`}><FontAwesomeIcon icon={faFire} /></span>{totalPoints !== null ? totalPoints : 0}</h5>
                            </div>
                        </div>

                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                        <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Content Posted</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'><span className={`${styles.followIcon}`}><FontAwesomeIcon icon={faUpload} /></span>69</h5>
                            </div>
                        </div>

                        <div className="card text-center" style={{minWidth: '120px', flex: '1', boxShadow: '0 1px 24px #1c1c1c'}}>
                        <div className={`card-header ${styles['card-header']}`}>
                                <p className='m-0'>Artist Ranking</p>
                            </div>
                            <div className="card-body text-light d-flex align-items-center justify-content-center ">
                                <h5 className='m-0'><span className={`${styles.followIcon}`}><FontAwesomeIcon icon={faRankingStar} /></span>1</h5>
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
                            
                            <Column header="Control" body={(rowData) => customBody(rowData.id)}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </ArtistLayout>
    );
}

export default ArtistDashboard;
