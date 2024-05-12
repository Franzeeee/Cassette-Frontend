import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArtistLayout from '../../Layout/ArtistLayout';
import { Image } from 'primereact/image';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import defaultCover from '../../assets/img/default.png';
import Pagination from '@mui/material/Pagination'; // Import Pagination component
import cassette_api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ArtistContents() {
    // State variables
    const [selectedTab, setSelectedTab] = useState(0);
    const [musicData, setMusicData] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Number of items per page\
    const navigate = useNavigate()
    
    const userId = localStorage.getItem('ID');

    function formatDate(inputDate) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(inputDate);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        return `${month} ${day}, ${year}`;
    }

    useEffect(() => {
        toast.loading("Fetching Data...");
        cassette_api.get(`/artist/album/${userId}`)
            .then(response => {
                const musicFetched = response.data
                setMusicData([
                    ...musicFetched.map((item, index) => ({
                        id: item.id,
                        albumCover: item.cover_image,
                        title: item.title,
                        dateUploaded: formatDate(item.created_at), // Assuming this property exists in the fetched data
                        totalListens: item.points, // Assuming this property exists in the fetched data
                        status: item.deleted_at === null ? "Active" : "Deleted", // Assuming this property exists in the fetched data
                        position: index + 1
                    }))
                ]);
            })
            .catch(error => {
                console.error('Error fetching albums');
            })
            .finally(() => {
                toast.dismiss()
            });
    },[])

    // Pagination handler
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculate indexes for pagination
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = musicData.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setDeleteId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDeleteId(null);
    };

    const handleDelete = (id) => {
        setMusicData(prevMusicData => {
            const updatedData = prevMusicData.filter(item => item.id !== id).map((item, index) => ({ ...item, id: index + 1 }));
            return updatedData;
        });
        handleClose();
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const sortedData = () => {
        const sortableItems = [...musicData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
    };

    const filteredData = musicData.filter(item =>
        item.title.toLowerCase().includes(searchQuery)
    );

    const renderTableRows = (data) => {
        return data.map((row, index) => (
            <TableRow key={row.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <TableCell onClick={() => requestSort('id')} className={getClassNamesFor('id')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50px' }}>
                        #{row.position}
                    </div>
                </TableCell>
                <TableCell><img src={row.albumCover} alt="Album Cover" style={{ width: '50px', height: 'auto' }} /></TableCell>
                <TableCell onClick={() => requestSort('title')} className={getClassNamesFor('title')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100px' }}>
                        {row.title}
                    </div>
                </TableCell>
                <TableCell onClick={() => requestSort('dateUploaded')} className={getClassNamesFor('dateUploaded')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '150px' }}>
                        {row.dateUploaded}
                    </div>
                </TableCell>
                <TableCell onClick={() => requestSort('totalListens')} className={getClassNamesFor('totalListens')}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100px' }}>
                        {row.totalListens}
                    </div>
                </TableCell>
                <TableCell style={row.status === 'Deleted' ? {color: 'red'} : {color: 'green'}}>{row.status}</TableCell>
                <TableCell>
                    <IconButton onClick={(event) => handleClick(event, row.id)}>
                        <MoreVertIcon style={{ fontSize: '20px', color: "black !important" }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        getContentAnchorEl={null}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: '#ffffff',
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleDelete(deleteId)} style={{ backgroundColor: '#ffffff' }}>Delete</MenuItem>
                        <MenuItem style={{ backgroundColor: '#ffffff', }} className={`${row.status === 'Deleted' ? " d-none" : ""}`} onClick={() => navigate(`/album/${row.id}`)}>View</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <ArtistLayout active={"Content"}>
            <div className="col-10 h-100 d-flex flex-column align-items-start justify-content-center p-4">
                <ToastContainer containerId={"content"} />
                {/* Add search box */}
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{
                        marginBottom: '20px',
                        marginTop: '0px',
                        width: '300px',
                        borderColor: 'white',
                        border: '1px solid gray',
                        '&:focus': {
                            borderColor: 'transparent',
                            outline: 'none',
                            boxShadow: 'none'
                        }
                    }}
                    InputProps={{
                        style: { color: 'white' }
                    }}
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                />
    
                <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)} style={{ width: '100%', backgroundColor: 'black' }}>
                    <TabList style={{ width: 'fit-content', backgroundColor: 'black' }}>
                        <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 0 ? '#EEE3E1' : 'transparent', color: selectedTab === 0 ? 'black' : 'gray' }}>Music</Tab>
                        <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 1 ? '#EEE3E1' : 'transparent', color: selectedTab === 1 ? 'black' : 'gray' }}>Podcast</Tab>
                        <Tab style={{ width: '100px', marginRight: '10px', backgroundColor: selectedTab === 2 ? '#EEE3E1' : 'transparent', color: selectedTab === 2 ? 'black' : 'gray' }}>Videocast</Tab>
                    </TabList>
    
                    <TabPanel>
                        {filteredData.length === 0 ? (
                            <div className="no-records text-white">There are no records to display for Music</div>
                        ) : (
                            <div className="scrollable-table">
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell onClick={() => requestSort('id')} className={getClassNamesFor('id')}>
                                                    # {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '\u25B2' : '\u25BC')}
                                                </TableCell>
                                                <TableCell>Album Cover</TableCell>
                                                <TableCell onClick={() => requestSort('title')} className={getClassNamesFor('title')}>
                                                    Title {sortConfig.key === 'title' && (sortConfig.direction === 'ascending' ? '\u25B2' : '\u25BC')}
                                                </TableCell>
                                                <TableCell onClick={() => requestSort('dateUploaded')} className={getClassNamesFor('dateUploaded')}>
                                                    Date Uploaded {sortConfig.key === 'dateUploaded' && (sortConfig.direction === 'ascending' ? '\u25B2' : '\u25BC')}
                                                </TableCell>
                                                <TableCell onClick={() => requestSort('totalListens')} className={getClassNamesFor('totalListens')}>
                                                    Total Points {sortConfig.key === 'totalListens' && (sortConfig.direction === 'ascending' ? '\u25B2' : '\u25BC')}
                                                </TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {renderTableRows(currentData)}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                    </TabPanel>
                    {/* Add similar TabPanel components for Podcast and Videocast */}
                </Tabs>
                {/* Pagination */}
                <div style={{ position: 'fixed', bottom: '20px', left: '750px', transform: 'translateX(-50%)' }}>
    <Pagination
        count={Math.ceil(filteredData.length / rowsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        style={{ backgroundColor: 'white' }} // Change the background color here
    />
</div>
            </div>
        </ArtistLayout>
    );
}

export default ArtistContents;
