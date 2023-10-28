import React, { Component } from "react";
import { Archive, BarChart, Check, CheckCircle, Clock, Eye, FileText, Info, Settings, Tool, Trash, UserCheck, UserX } from "react-feather";
import './dashboard.css'
import res from "../../shared/resources";
import HttpHandler from "../../core/httpHandler";
import { getCurrentDateString, getDateDifference, getSelectOptionsList, sleep } from "../../core/util";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import { getLoader } from "../loader/loader";
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);


class Dashboard extends Component {

    constructor()
    {
        super();
        this.state = {
            isLoading : false,
            displayState: "false",
            projData : [],
            summaryData : undefined,
            moduleData : undefined,
            sprintData : undefined,
            updateData : undefined
        }

        this.loadProjectDashboard = this.loadProjectDashboard.bind(this)
        this.loadSummary = this.loadSummary.bind(this)
        this.loadSprint = this.loadSprint.bind(this)

    }

    async componentDidMount()
    {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrProjData = await http.httpGet("http://localhost:8081/api/project?userId=" + res["STR_USERID"]);
        this.setState({isLoading: false , projData : arrProjData});
    }

    loadSummary = async(projectId) =>
    {
        let http = new HttpHandler();
        let summaryObject = await http.httpGet("http://localhost:8081/api/task/summary?userId=" + res["STR_USERID"] + "&asOwner=true&projectId=" + projectId); 
        this.setState({summaryData : summaryObject})
    }
    
    loadModuleData = async(projectId) =>
    {
        let http = new HttpHandler();
        let moduleObject = await http.httpGet("http://localhost:8081/api/module/countByProject?projectId=" + projectId); 
        this.setState({moduleData : moduleObject})
    }

    loadSprint = async (projectId) =>
    {
        let http = new HttpHandler();
        let dateObj = new Date();
        let dateString = dateObj.getFullYear() + "-" + dateObj.getMonth().toString().padStart(2,"0") + "-" + dateObj.getDate().toString().padStart(2 , "0")
        let sprintObject = await http.httpGet("http://localhost:8081/api/sprint/active?projectId=" + projectId + "&date=" + dateString); 
        this.setState({sprintData : sprintObject})
    }

    loadUpdates = async(projectId) =>
    {
        let http = new HttpHandler();
        let updateArray = await http.httpGet("http://localhost:8081/api/task/summary/details?userId=" + res["STR_USERID"] + "&asOwner=true&projectId=" + projectId); 
        let updateObject = {
            "NEW" : 0,
            "IN_PROGRESS" : 0,
            "SELF_COMMIT" : 0,
            "SELF_DELETE" : 0,
            "COMPLETED" : 0,
            "DELETED" : 0,
        }
        
        for (let index = 0; index < updateArray.length; index++) 
        {
            const element = updateArray[index];  
            updateObject[element["TaskStatus"].toUpperCase()] = element["count"]  
        }
        this.setState({updateData : updateObject})
    }

    loadProjectDashboard = async(event) => {
        this.setState({ displayState: "loading" });
        await this.loadSummary(event.target.value)
        await this.loadSprint(event.target.value)
        await this.loadUpdates(event.target.value)
        await this.loadModuleData(event.target.value)
        this.setState({ displayState: "true" });
    }

    getArrayDataFromObject = (arrData , key) => {
        let data = []
        for (let index = 0; index < arrData.length; index++) 
        {
            data.push(arrData[index][key])
        }
        return data;
    }


    render() {

        let projOption = getSelectOptionsList(this.state.projData , "ProjectId" , "ProjectName" , true , "Select Project");

        if(this.state.isLoading)
        {
            return getLoader()
        }
        else
        {
            
            let dashboardView = ""

            if (this.state.displayState == "loading") 
            {
                dashboardView = getLoader("Loading data")
            } 
            else if(this.state.displayState == "true")
            {

                let arrLabels = this.getArrayDataFromObject(this.state.moduleData , "Module")
                let arrModuleCount = this.getArrayDataFromObject(this.state.moduleData , "count")
                
                const moduleData = {
                    labels: arrLabels,
                    datasets: [{
                        data: arrModuleCount,
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
                                stepSize: 5
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

                let totalDays = getDateDifference(this.state.sprintData[0].StartDate , this.state.sprintData[0].EndDate)
                let completedDays = totalDays - getDateDifference(getCurrentDateString() , this.state.sprintData[0].EndDate)
                let sprintComplition = ((completedDays * 100) / totalDays).toFixed(2)
                const sprintData = {
                    datasets: [
                        {
                            data: [sprintComplition, (100-sprintComplition)],
                            backgroundColor: [
                                "#93be52",
                                "#ffb64d"
                            ],
                            display: true,
                            borderColor: "#FFF"
                        }
                    ]
                };

                dashboardView = (
            
                    <div className="row">
                        {/*
                        -------------------------------------------------- 
                        SUMMARY SECTION 
                        -------------------------------------------------- 
                        */}
                        <div className="col-xl-3 col-md-6">
                            <div className="card border-0 rounded-0 shadow-sm my-1">
                                <div className="dash-card-block">
                                    <div className="row align-items-center">
                                        <div className="col-8 text-start">
                                            <h4 className="mb-0" style={{ color: 'var(--text-warning-cust)' }}>{this.state.summaryData.activeCount}</h4>
                                            <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Active</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <Tool color="var(--text-primary)" size="28" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-warning-cust)' }}>
                                    <div className="row align-items-center">
                                        <div className="col-12 text-start">
                                            <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>{this.state.sprintData[0].Sprint}</span></p>
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
                                            <h4 className="mb-0" style={{ color: 'var(--text-success-cust)' }}>{this.state.summaryData.underReviewCount}</h4>
                                            <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Under Review</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <Eye color="var(--text-primary)" size="28" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-success-cust)' }}>
                                    <div className="row align-items-center">
                                        <div className="col-12 text-start">
                                            <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>{this.state.sprintData[0].Sprint}</span></p>
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
                                            <h4 className="mb-0" style={{ color: 'var(--text-highlight-cust)' }}>{this.state.summaryData.closedCount}</h4>
                                            <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Closed</p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <CheckCircle color="var(--text-primary)" size="28" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-gradient border-top-0 rounded-0" style={{ background: 'var(--text-highlight-cust)' }}>
                                    <div className="row align-items-center">
                                        <div className="col-12 text-start">
                                            <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>{this.state.sprintData[0].Sprint}</span></p>
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
                                            <h4 className="mb-0" style={{ color: 'var(--text-primary-cust)' }}>{this.state.summaryData.totalCount}</h4>
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
                                            <p className="text-white mb-0" style={{ fontSize: 'smaller' }} ><Clock color='#fff' size="16" /> Sprint : <span>{this.state.sprintData[0].Sprint}</span></p>
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
                                    {/* <p className="text-start my-0" style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Average sprint timeline consumption</p> */}
                                    <Doughnut data={sprintData} options={{ rotation: -90, circumference: 180, cutout: "50%", maintainAspectRatio: true, responsive: true }} />
                                    <div style={{ position: "absolute", top: "55%", left: "50%", transform: "translate(-50%, 0%)", textAlign: "center" }}>
                                        <h3 className="mb-0 fw-bolder">{sprintComplition}%</h3>
                                    </div>
                                    <p className="text-muted text-start my-0" style={{ fontSize: 'smaller' }}>Active Sprint : {this.state.sprintData[0].Sprint}</p>
                                    <p className="text-muted text-start my-0" style={{ fontSize: 'smaller' }}>Sprint start date : {this.state.sprintData[0].StartDate.split("T")[0]}</p>
                                    <p className="text-muted text-start my-0" style={{ fontSize: 'smaller' }}>Sprint end date : {this.state.sprintData[0].EndDate.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-12 my-4">
                            <div className="card border-0 rounded-0 shadow-sm">
                                <div className="dash-card-block p-0" style={{ background: 'var(--text-success-cust)' }}>
                                    <div className="dash-card-block" style={{ background: '#fff' }}>
                                        <h6 className="text-start" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}>Modular Backlog</h6>
                                    </div>
                                    <Bar data={moduleData} options={moduleBarOptions} height="200" className="p-4 pe-4 mb-2" style={{ background: 'var(--text-success-cust)', color: '#fff' }} />
                                    <div className="dash-card-block" style={{ background: '#fff' }}>
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Graph displayed above denotes tasks based on Module</p>
                                        {/* <div className="col-6 p-1 border-end">
                                            <div style={{ color: 'var(--text-primary)' }}>Projects</div>
                                            <h1 style={{ color: 'var(--text-primary-cust)' }}>2</h1>
                                        </div> */}
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
                                            <FileText className="dash-feed-icon" size="16" style={{ background: '#ffb64d' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.NEW}</b> New tasks received</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-auto pe-0">
                                            <Settings className="dash-feed-icon" size="16" style={{ background: '#93be52' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.IN_PROGRESS}</b> items in progress</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-auto pe-0">
                                            <UserCheck className="dash-feed-icon" size="16" style={{ background: '#8f5ffe' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.SELF_COMMIT}</b> items pending for Self-Commit</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-auto pe-0">
                                            <UserX className="dash-feed-icon" size="16" style={{ background: 'var(--text-highlight-cust)' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.SELF_DELETE}</b> items pending for Self-Delete</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-auto pe-0">
                                            <Check className="dash-feed-icon" size="16" style={{ background: 'var(--text-primary-cust)' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.COMPLETED}</b> items marked as Complete</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-auto pe-0">
                                            <Trash className="dash-feed-icon" size="16" style={{ background: '#d51c1c' }} />
                                        </div>
                                        <div className="col text-start my-auto">
                                            <p className="my-auto" style={{ color: 'var(--text-primary)', fontSize: 'smaller' }}><b>{this.state.updateData.DELETED}</b> items deleted</p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Values displayed above are based on tasks on which you have worked</p>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
            else
            {
                dashboardView = undefined
            }

            return (
                <div className="p-4">
    
                    <div className="row justify-content-between">
    
                        <div className="col-3">
                            <form>
                                <div className="mb-3">
                                    <select className="form-select mb-3 dashboard-form-field" id="opr_dashboard_proj_sel" onChange={(e) => this.loadProjectDashboard(e)}>
                                        {projOption}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="col-3 dashboard-form-field" style={{paddingTop : "0.5%"}}>
                            <b style={{ color: 'var(--text-secondary)', fontSize: 'smaller' }}>Total Assigned Projects : {this.state.projData.length}</b>
                        </div>
                    </div>
    
                    {/*
                    -------------------------------------------------- 
                    MAIN DASHBOARD
                    -------------------------------------------------- 
                    */}
                    
                    {dashboardView}
                </div>
            )
        }

        

        


        

        
    }
}

export default Dashboard;