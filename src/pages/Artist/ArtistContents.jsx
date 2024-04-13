import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArtistLayout from '../../Layout/ArtistLayout';
import { Image } from 'primereact/image';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../../assets/css/ArtistStudio/artist-contents.module.css';

function ArtistContents() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [musicData, setMusicData] = useState([
        { id: 1, albumCover: 'album1.jpg', title: 'Song 1', dateUploaded: '2024-04-13', totalListens: 100, status: 'Active' },
        { id: 2, albumCover: 'album2.jpg', title: 'Song 2', dateUploaded: '2024-04-12', totalListens: 200, status: 'Inactive' },
        { id: 3, albumCover: 'album3.jpg', title: 'Song 3', dateUploaded: '2024-04-11', totalListens: 550, status: 'Active' },
        { id: 4, albumCover: 'album4.jpg', title: 'Song 4', dateUploaded: '2024-04-11', totalListens: 450, status: 'Active' },
        { id: 5, albumCover: 'album5.jpg', title: 'Song 5', dateUploaded: '2024-04-11', totalListens: 150, status: 'Active' },
        { id: 6, albumCover: 'album5.jpg', title: 'Song 5', dateUploaded: '2024-04-11', totalListens: 150, status: 'Active' },
        { id: 7, albumCover: 'album5.jpg', title: 'Song 5', dateUploaded: '2024-04-11', totalListens: 150, status: 'Active' },

    ]);
    const [podcastData, setPodcastData] = useState([]); 
    const [videocastData, setVideocastData] = useState([]); 

    const handleDelete = (id, dataType) => {
        switch (dataType) {
            case 'music':
                setMusicData(prevMusicData => prevMusicData.filter(item => item.id !== id).map((item, index) => ({ ...item, id: index + 1 })));
                break;
            case 'podcast':
                setPodcastData(prevPodcastData => prevPodcastData.filter(item => item.id !== id).map((item, index) => ({ ...item, id: index + 1 })));
                break;
            case 'videocast':
                setVideocastData(prevVideocastData => prevVideocastData.filter(item => item.id !== id).map((item, index) => ({ ...item, id: index + 1 })));
                break;
            default:
                break;
        }
    };

    const renderTableRows = (data, dataType) => {
        return data.map((row, index) => (
            <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <TableCell>{row.id}</TableCell>
                <TableCell><Image src={row[dataType === 'music' ? 'albumCover' : 'thumbnail']} alt={dataType === 'music' ? 'Album Cover' : 'Thumbnail'} style={{ width: dataType === 'music' ? '30px' : '50px', height: dataType === 'music' ? '20px' : '50px' }} /></TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.dateUploaded}</TableCell>
                <TableCell>{dataType === 'music' ? row.totalListens : row.totalViews}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                    <Button onClick={() => handleDelete(row.id, dataType)} style={{ color: 'red' }}>DELETE</Button>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <ArtistLayout>
            <div className="col-10 h-100 d-flex flex-column align-items-center justify-content-center p-5">
                <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)} style={{ width: '100%', backgroundColor: 'black' }}>
                <TabList style={{ width: 'fit-content', backgroundColor: 'black' }}>
                    <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 0 ? '#EEE3E1' : 'transparent', color: selectedTab === 0 ? 'black' : 'gray' }}>Music</Tab>
                    <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 1 ? '#EEE3E1' : 'transparent', color: selectedTab === 1 ? 'black' : 'gray' }}>Podcast</Tab>
                    <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 2 ? '#EEE3E1' : 'transparent', color: selectedTab === 2 ? 'black' : 'gray' }}>Videocast</Tab>
                </TabList>


                    <TabPanel>
                        {musicData.length === 0 ? (
                            <div className="no-records">There are no records to display for Music</div>
                        ) : (
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell> </TableCell>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Date Uploaded</TableCell>
                                                <TableCell>Total Listens</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Controls</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {renderTableRows(musicData, 'music')}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        {/* Similar structure as above */}
                    </TabPanel>
                    <TabPanel>
                        {/* Similar structure as above */}
                    </TabPanel> 
                </Tabs>
            </div>
        </ArtistLayout>
    );
}

export default ArtistContents;
