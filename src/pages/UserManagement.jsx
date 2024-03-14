import { useState } from "react";
import Layout from "../Layout/Layout";
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@mui/icons-material';
import '../assets/css/user-management.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import useUserData from "../logic/user_management.logic";



function UserManagement() {

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const userData = useUserData();
    

    const renderHeader = () => {
        return (
            <div className="search-bar d-flex justify-content-end">
                <input type="search" value={globalFilterValue} onChange={(e) => setGlobalFilterValue(e.target.value)} placeholder="Global Search" />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <div className="action-container">
                    {rowData.status === 'Active' || rowData.status === 'Unverified' ? (
                        <button className="bg-transparent text-white border-0" onClick={() => handleBan(rowData)}>
                            <FontAwesomeIcon icon={faUserSlash} className="ban-icon" title="Ban" />
                        </button>
                    ) : null}
                    {rowData.status === 'Banned' ? (
                        <button className="bg-transparent text-white border-0" onClick={() => handleUnban(rowData)}>
                            <FontAwesomeIcon icon={faUserCheck} className="unban-icon" title="Unban" />
                        </button>
                    ) : null}
                </div>
            </>
        );
    };


    const header = renderHeader();

    return (
        <Layout activePage={'User Management'}>
            <div className="container w-100 h-100 m-0 p-3 py-2 dashboard-container overflow-hidden ">
                <div className="row w-auto m-0 overflow-x-hidden overflow-y-auto">
                    <div className="col p-2 m-0 mt-1 page-title d-flex align-items-center justify-content-between ">
                        <h1 className='m-0'>User Management</h1>

                        {/* Breedcrumbs */}
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                            <Link color="#fffffff2" href="/">
                                <HomeOutlined className='home-breedcrumbs' fontSize="small"/>
                            </Link>
                                <Typography color="#d40000" fontSize="small">User Management</Typography>
                        </Breadcrumbs>

                    </div>
                </div>
                <div className="container-fluid h-100 content-container p-2">
                    <div className="card w-100 table-container align-items-center d-flex justify-content-start">
                        <DataTable 
                        scrollable 
                        value={userData} 
                        paginator rows={10} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        paginatorTemplate=" FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" 
                        tableStyle={{ minWidth: '60rem',}} 
                        scrollHeight="350px"
                        globalFilter={globalFilterValue}
                        header={header}
                        >
                            <Column sortable style={{width: '40%'}} field="name" header="Name"></Column>
                            <Column sortable field="registrationDate" header="Registration Date"></Column>
                            <Column
                                sortable
                                field="status"
                                header="Status"
                                body={(rowData) => {
                                    let statusColor = '';
                                    switch (rowData.status) {
                                        case 'Active':
                                            statusColor = '#00ff00';
                                            break;
                                        case 'Unverified':
                                            statusColor = 'yellow';
                                            break;
                                        case 'Banned':
                                            statusColor = 'red';
                                            break;
                                        default:
                                            statusColor = 'inherit'; // default color
                                    }
                                    return <span style={{ color: statusColor }}>{rowData.status}</span>;
                                }}
                            ></Column>
                            <Column sortable field="userType" header="User Type"></Column>
                            <Column header="Action" body={actionBodyTemplate} exportable={false}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserManagement;
