import React , { Component } from "react";
import { Archive, BarChart, Check, CheckCircle, Clock, Eye, FileText, Settings, Tool, Trash } from "react-feather";
import './dashboard.css'
import {Doughnut , Bar} from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);


class Dashboard extends Component {
    render() {

        const moduleData = {
            labels: ["ABCS", "VODC", "IAFV", "VANE"],
            datasets: [{
                data: [65, 59, 80, 75],
                barThickness: 20,
                backgroundColor: [
                    "#fff"
                ],
                borderWidth: 0
            }]
        };

        const moduleBarOptions = {
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            labels: {
                color: "#fff"
            },
            scales: {
                x: {
                    ticks: {
                        color: "#fff"
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        color: "#fff",
                        padding: 5,
                        stepSize: 20
                    },
                    grid: {
                        color: '#54dbac',
                        drawTicks: false
                    },
                    border:
                    {
                        display: false
                    }
                }
            }
        }

        const sprintData = {
            datasets: [
                {
                    data: [3, 10],
                    backgroundColor: [
                        "#93be52",
                        "#ffb64d"
                    ],
                    display: true,
                    borderColor: "#FFF"
                }
            ]
        };

        return (
            <div className="p-4">

                {/*
                -------------------------------------------------- 
                SUMMARY SECTION 
                -------------------------------------------------- 
                */}
                <div className="row">

                    <div className="col-xl-3 col-md-6">
                        <div className="card border-0 rounded-0 shadow-sm my-1">
                            <div className="dash-card-block">
                                <div className="row align-items-center">
                                    <div className="col-8 text-start">
                                        <h4 className="mb-0" style={{ color: 'var(--text-warning-cust)' }}>34</h4>
                                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>In-Progress</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <Tool color="var(--text-primary)" size="28" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-warning-cust)' }}>
                                <div className="row align-items-center">
                                    <div className="col-12 text-start">
                                        <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>03-2022</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <div className="card border-0 rounded-0 shadow-sm my-1">
                            <div className="dash-card-block">
                                <div className="row align-items-center">
                                    <div className="col-8 text-start">
                                        <h4 className="mb-0" style={{ color: 'var(--text-success-cust)' }}>10 %</h4>
                                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Active</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <BarChart color="var(--text-primary)" size="28" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-success-cust)' }}>
                                <div className="row align-items-center">
                                    <div className="col-12 text-start">
                                        <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>03-2022</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <div className="card border-0 rounded-0 shadow-sm my-1">
                            <div className="dash-card-block">
                                <div className="row align-items-center">
                                    <div className="col-8 text-start">
                                        <h4 className="mb-0" style={{ color: 'var(--text-highlight-cust)' }}>51 %</h4>
                                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Completed</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <CheckCircle color="var(--text-primary)" size="28" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-highlight-cust)' }}>
                                <div className="row align-items-center">
                                    <div className="col-12 text-start">
                                        <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>03-2022</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                        <div className="card border-0 rounded-0 shadow-sm my-1">
                            <div className="dash-card-block">
                                <div className="row align-items-center">
                                    <div className="col-8 text-start">
                                        <h4 className="mb-0" style={{ color: 'var(--text-primary-cust)' }}>120</h4>
                                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Total</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <Archive color="var(--text-primary)" size="28" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-primary-cust)' }}>
                                <div className="row align-items-center">
                                    <div className="col-12 text-start">
                                        <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>03-2022</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/*
                    -------------------------------------------------- 
                     GRAPH SECTION 
                    -------------------------------------------------- 
                    */}
                    <div className="col-xl-4 col-md-12 my-4">
                        <div className="card border-0 rounded-0 shadow-sm">
                            <div className="dash-card-block ">
                                <h6 className="text-start" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}>Sprint Burnout</h6>
                                <p className="text-start my-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Average sprint timeline consumption</p>
                                <Doughnut data={sprintData} options={{ rotation: -90, circumference: 180, cutout: "50%", maintainAspectRatio: true, responsive: true }} />
                                <div style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, 0%)", textAlign: "center" }}>
                                    <h3 className="mb-0 fw-bolder">20%</h3>
                                </div>
                                <p className="text-muted text-start my-0" style={{ fontSize: 'smaller' }}>Sprint start date : </p>
                                <p className="text-muted text-start my-0" style={{ fontSize: 'smaller' }}>Sprint end date : </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-12 my-4">
                        <div className="card border-0 rounded-0 shadow-sm">
                            <div className="dash-card-block p-0" style={{ background: 'var(--text-success-cust)' }}>
                                <Bar data={moduleData} options={moduleBarOptions} height="200" className="p-4 pe-4 mb-2" style={{ background: 'var(--text-success-cust)', color: '#fff' }} />
                                <div className="dash-card-block" style={{ background: '#fff' }}>
                                    <p className="text-start my-0 mb-3" style={{ fontSize: 'smaller', color: 'var(--text-primary)' }}>Total completed tasks based on Modular performance</p>
                                    <div className="col-6 p-1 border-end">
                                        <div style={{ color: 'var(--text-primary)' }}>Projects</div>
                                        <h1 style={{ color: 'var(--text-primary-cust)' }}>2</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-12 my-4">
                        <div className="card border-0 rounded-0 shadow-sm">
                            <div className="dash-card-block">
                                <h6 className="text-start mb-4" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}>Updates</h6>
                                <div className="row mb-3">
                                    <div className="col-auto pe-0">
                                        <FileText className="dash-feed-icon" size="16" style={{ background: '#ffb64d'}}/>
                                    </div>
                                    <div className="col text-start my-auto">
                                        <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>3</b> New tasks received since yesterday</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-auto pe-0">
                                        <Settings className="dash-feed-icon" size="16" style={{ background: '#93be52'}}/>
                                    </div>
                                    <div className="col text-start my-auto">
                                        <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>5</b> items in progress</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-auto pe-0">
                                        <Eye className="dash-feed-icon" size="16" style={{ background: 'var(--text-highlight-cust)'}}/>
                                    </div>
                                    <div className="col text-start my-auto">
                                        <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>2</b> items pending for verification</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-auto pe-0">
                                        <Check className="dash-feed-icon" size="16" style={{ background: 'var(--text-primary-cust)'}}/>
                                    </div>
                                    <div className="col text-start my-auto">
                                        <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>2</b> items marked as Complete</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-auto pe-0">
                                        <Trash className="dash-feed-icon" size="16" style={{ background: '#d51c1c'}}/>
                                    </div>
                                    <div className="col text-start my-auto">
                                        <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>0</b> items deleted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard;