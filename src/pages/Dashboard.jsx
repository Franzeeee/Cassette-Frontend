
import Layout from "../Layout/Layout";

import '../assets/css/dashboard.css';

// chart imports
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { Breadcrumbs, Typography } from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';

import { Link } from "react-router-dom";


function Dashboard() {
    
  return (
    <>
        <Layout activePage={'Dashboard'}>
            {/* Page Content */}
            <div className="container w-100 h-100 m-0 p-3 py-2 dashboard-container overflow-hidden ">

                {/* Dashboard title Row */}
                <div className="row w-auto m-0 overflow-x-hidden overflow-y-auto">
                    <div className="col p-2 m-0 mt-1 page-title d-flex align-items-center justify-content-between ">
                        <h1 className='m-0'>Dashbaord</h1>
                         {/* Breadcrumb Component */}
                        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                            <Link color="#fffffff2" to="/">
                                <HomeOutlined className='home-breedcrumbs' fontSize="small" title="Home"/>
                            </Link>
                            <Typography color="#d40000" fontSize="small">Dashboard</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                {/* Dashboard charts and data row */}
                <div className="row m-0 py-2 px-0 h-100 w-100 overflow-auto">
                    <div className="col">
                        <div className="row mb-4 ">
                            <div className="col">
                                <div className="card border-0 ">
                                    <div className="card-header border-0 ">
                                        Daily Active Users
                                    </div>
                                    <div className="card-body chart-card">
                                        <Line 
                                            data={{
                                                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                                datasets: [{
                                                    label: 'Free Users',
                                                    data: [470, 400, 545, 686, 670, 622, 990],
                                                    borderColor: 'rgba(255, 255, 0, 1)',
                                                    borderWidth: 1,
                                                    fill: false
                                                }, {
                                                    label: 'Paid Users',
                                                    data: [170, 120, 330, 320, 480, 280, 526],
                                                    borderColor: 'rgba(0, 255, 0, 1)',
                                                    borderWidth: 1,
                                                    fill: false
                                                }]
                                            }}
                                            options={{
                                                scales: {
                                                    y: {
                                                        suggestedMin: 0
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        Weekly New Artist
                                    </div>
                                    <div className="card-body chart-card">
                                            <Line data={{
                                                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                                                    datasets: [{
                                                        label: 'New Artists',
                                                        data: [15, 33, 21, 46],
                                                        borderColor: 'rgba(2255, 0, 0, 1)',
                                                        borderWidth: 1,
                                                        fill: false
                                                    }]
                                                }}
                                                options={{
                                                    scales: {
                                                        y: {
                                                            suggestedMin: 0
                                                        }
                                                    }
                                                }}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row test">
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        No. of Artist Reports
                                    </div>
                                    <div className="card-body chart-card-numbers d-flex align-items-center justify-content-center text-light">
                                        <h4>120</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        No. of Artist Reports
                                    </div>
                                    <div className="card-body chart-card-numbers d-flex align-items-center justify-content-center text-light">
                                        <h4>2,500</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        No. of Artist Reports
                                    </div>
                                    <div className="card-body chart-card-numbers d-flex align-items-center justify-content-center text-light">
                                        <h4>69,420</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header">
                                            No. of Artist Reports
                                        </div>
                                        <div className="card-body d-flex align-items-center justify-content-center text-light">
                                            <h4>120</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card">
                                        <div className="card-header">
                                            No. of Artist Reports
                                        </div>
                                        <div className="card-body d-flex align-items-center justify-content-center text-light">
                                            <h4>120</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </Layout>
    </>
  )
}

export default Dashboard