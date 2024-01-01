import React, { Component } from "react";
import { ArrowRightCircle, Check, CheckCircle, RefreshCw, RotateCcw, RotateCw, UserCheck, XCircle } from "react-feather";
import './verification.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Loader from "../loader/loader";
import HttpHandler from "../../core/httpHandler";
import res from "../../shared/resources";
import { getPreviousWorkflowStatus } from "../../core/workflowOperations";
import { Navigate } from "react-router";
import PopupNotification from "../popup/popup";


class Verification extends Component {

    constructor(props) {
        super(props);
        this.asgGridRef = "";
        this.rcsGridRef = "";
        this.verCommitGridRef = "";
        this.verDeleteGridRef = "";
        this.popupRef = React.createRef();
        this.state = { 
            isLoading: false , 
            summaryCountObject : {} ,
            opentask : false,
            taskurl : ""
            // dataVerificationCommit : [],
            // dataVerificationDelete : []
        }
        
        this.initializeAssignmentGrid = this.initializeAssignmentGrid.bind(this);
        this.initializeRCSGrid = this.initializeRCSGrid.bind(this);
        this.initializeCommitVerificationGrid = this.initializeCommitVerificationGrid.bind(this);
        this.initializeDeleteVerificationGrid = this.initializeDeleteVerificationGrid.bind(this);
        this.updateTaskToComplete = this.updateTaskToComplete.bind(this);
        this.updateTaskToDelete = this.updateTaskToDelete.bind(this);
        this.revertTaskFromComGrid = this.revertTaskFromComGrid.bind(this);
        this.revertTaskFromDelGrid = this.revertTaskFromDelGrid.bind(this);
        this.openTask = this.openTask.bind(this);
    }

    async componentDidMount() {
        let http = new HttpHandler();
        let summData = this.populateSummaryCount(await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/summary/details?userId=" + res["USERDATA"]["STR_USERID"] + "&asOwner=false"));
        this.setState(() => {
            //return {summaryCountObject : summData ,dataVerificationCommit : arrVerifCommit , dataVerificationDelete : arrVerifDelete}
            return {summaryCountObject : summData}
        })
    }

    updateTaskToComplete = async() => {

        this.popupRef.current.togglePopupNotificationDisplay("Updating task to Complete ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let arrData = this.verCommitGridRef.getSelectedRows();
        let body = []
    
        for (let index = 0; index < arrData.length; index++) 
        {
          let object = {
              "taskId": arrData[index]["TaskId"],
              "userId": res["USERDATA"]["STR_USERID"],
              "userName": res["USERDATA"]["STR_USERNAME"],
              "updateType": "workflow",
              "currentWorkflowState": arrData[index]["TaskStatus"],
              "newWorkflowState": res["WORKFLOW"]["STR_WF_COMPLETE"]
            }  
          body.push(object)
        }
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    updateTaskToDelete = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Updating task to Delete ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let arrData = this.verDeleteGridRef.getSelectedRows();
        let body = []
    
        for (let index = 0; index < arrData.length; index++) 
        {
          let object = {
              "taskId": arrData[index]["TaskId"],
              "userId": res["USERDATA"]["STR_USERID"],
              "userName": res["USERDATA"]["STR_USERNAME"],
              "updateType": "workflow",
              "currentWorkflowState": arrData[index]["TaskStatus"],
              "newWorkflowState": res["WORKFLOW"]["STR_WF_DELETE"]
            }  
          body.push(object)
        }
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }
    
    revertTaskFromComGrid = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Reverting task..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let arrData = this.verCommitGridRef.getSelectedRows();
        let body = []
    
        for (let index = 0; index < arrData.length; index++) 
        {
          let object = {
              "taskId": arrData[index]["TaskId"],
              "userId": res["USERDATA"]["STR_USERID"],
              "userName": res["USERDATA"]["STR_USERNAME"],
              "updateType": "workflow",
              "currentWorkflowState": arrData[index]["TaskStatus"],
              "newWorkflowState": getPreviousWorkflowStatus(arrData[index]["TaskStatus"])
            }  
          body.push(object)
        }
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully reverted task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }
    
    revertTaskFromDelGrid = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Reverting task..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let arrData = this.verDeleteGridRef.getSelectedRows();
        let body = []
    
        for (let index = 0; index < arrData.length; index++) 
        {
          let object = {
              "taskId": arrData[index]["TaskId"],
              "userId": res["USERDATA"]["STR_USERID"],
              "userName": res["USERDATA"]["STR_USERNAME"],
              "updateType": "workflow",
              "currentWorkflowState": arrData[index]["TaskStatus"],
              "newWorkflowState": getPreviousWorkflowStatus(arrData[index]["TaskStatus"])
            }  
          body.push(object)
        }
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully reverted task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    populateSummaryCount = (data) => {
        let summObj = { "New": 0, "In_Progress": 0, "Self_Commit": 0, "Self_Delete": 0, "Complete": 0, "Delete": 0 }
        for (let index = 0; index < data.length; index++) 
        {
            summObj[data[index]["TaskStatus"]] = data[index]["count"]
        }
        return summObj;
    }

    // populateResourceConsumptionData(data) {
    //     let arrOutput = []
    //     for (let index = 0; index < data.length; index++) {
    //         if (arrOutput.length == 0) {
    //             arrOutput.push({ "OwnerName": data[index]["OwnerName"], "count": 1 })
    //         }
    //         else {
    //             let flag = 1;
    //             for (let index2 = 0; index2 < arrOutput.length; index2++) {
    //                 if (arrOutput[index2]["OwnerName"] == data[index]["OwnerName"]) {
    //                     arrOutput[index2]["count"]++;
    //                     flag = 0;
    //                 }
    //             }
    //             if (flag == 1) {
    //                 arrOutput.push({ "OwnerName": data[index]["OwnerName"], "count": 1 })
    //             }
    //         }
    //     }
    //     return arrOutput;
    // }

    initializeAssignmentGrid = async (params) => {
        if( this.asgGridRef == "")
        {
            this.asgGridRef = params.api;
        }
        this.asgGridRef.showLoadingOverlay();
        let http = new HttpHandler();
        let dataAssignmentSummary = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/rcs_util?userId=" + res["USERDATA"]["STR_USERID"] + "&summary=false");
        if (dataAssignmentSummary.length == 0) 
        {
            this.asgGridRef.showNoRowsOverlay();
        } 
        else
        {   
            this.asgGridRef.setRowData(dataAssignmentSummary)
            this.asgGridRef.hideOverlay();
        }
    }
    
    initializeRCSGrid = async (params) => {
        if( this.rcsGridRef == "")
        {
            this.rcsGridRef = params.api;
        }
        this.rcsGridRef.showLoadingOverlay();
        let http = new HttpHandler();
        let arrRCSData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/rcs_util?userId=" + res["USERDATA"]["STR_USERID"] + "&summary=true");
        //let dataRCSSummary = this.populateResourceConsumptionData(arrRCSData)
        //if (dataRCSSummary.length == 0) 
        if (arrRCSData.length == 0) 
        {
            this.rcsGridRef.showNoRowsOverlay();
        } 
        else
        {
            this.rcsGridRef.setRowData(arrRCSData)
            this.rcsGridRef.hideOverlay();
        }
    }

    initializeCommitVerificationGrid = async (params) =>
    {
        if( this.verCommitGridRef == "")
        {
            this.verCommitGridRef = params.api;
        }
        this.verCommitGridRef.showLoadingOverlay();
        let http = new HttpHandler();
        let arrVerifCommit = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/verification/commit?userId=" + res["USERDATA"]["STR_USERID"]);
        if (arrVerifCommit.length == 0) 
        {
            this.verCommitGridRef.showNoRowsOverlay();
        } 
        else
        {
            this.verCommitGridRef.setRowData(arrVerifCommit)
            this.verCommitGridRef.hideOverlay();
        }
    }
    
    initializeDeleteVerificationGrid = async (params) => 
    {
        if( this.verDeleteGridRef == "")
        {
            this.verDeleteGridRef = params.api;
        }
        this.verDeleteGridRef.showLoadingOverlay();
        let http = new HttpHandler();
        let arrVerifDelete = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/verification/delete?userId=" + res["USERDATA"]["STR_USERID"]);
        if (arrVerifDelete.length == 0) 
        {
            this.verDeleteGridRef.showNoRowsOverlay();
        } 
        else
        {
            this.verDeleteGridRef.setRowData(arrVerifDelete)
            this.verDeleteGridRef.hideOverlay();
        }
    }

    openTask(params) {
        localStorage.setItem("userdata" , JSON.stringify(res["USERDATA"]))
        localStorage.setItem("api-base-path" , JSON.stringify(res["STR_API_BASEPATH"]))
        localStorage.setItem("popup-notif" , JSON.stringify(res["POPUP_NOTIFICATION_MAP"]))
        localStorage.setItem("workflow" , JSON.stringify(res["WORKFLOW"]))
        let url = "/app/taskview/" + params.data.TaskId
        this.setState({openTask: true, taskurl: url})
    }

    render() {
        if(this.state.openTask)
        {
            return (<Navigate to={this.state.taskurl} replace={true}/>)
        }

        const defaultRCSColDef = {
            sortable: true,
            flex: 1,
            resizable: true,
            rowSelection: 'multiple',
        };
        const defaultAssignmentColDef = {
            sortable: true,
            flex: 1,
            resizable: true,
            filter: 'agTextColumnFilter'
        };

        const RCSSummaryHeaders = [
            { headerName: "Resorce", field: "OwnerName", flex: 2, filter: 'agTextColumnFilter' },
            { headerName: "#", field: "count", resizable: false, flex: 1, filter: 'agNumberColumnFilter' },
        ]
        const assignmentSummaryHeaders = [
            { headerName: "Id", field: "TaskId" },
            { headerName: "Title", field: "Title" },
            { headerName: "Owned By", field: "OwnerName" },
            { headerName: "Module", field: "Module" },
            { headerName: "Status", field: "TaskStatus" },
            {
                headerName: "", field: "TaskId", sortable: false, resizable: false, filter: false, maxWidth: 50,
                cellRenderer : (params) => <div className="tsb-action-button" onClick={() => this.openTask(params)}>
                    <ArrowRightCircle className="mb-1" color="var(--text-primary-cust)" size="18" />
                </div>
            },
        ]

        const verificationCommitHeaders = [
            { headerName: "Id", field: "TaskId", checkboxSelection: true, headerCheckboxSelection: true },
            { headerName: "Title", field: "Title" },
            { headerName: "Module", field: "Module" },
            {
                headerName: "", field: "TaskId", sortable: false, resizable: false, filter: false,  maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.updateTaskToComplete()}>
                        <CheckCircle className="mb-1" color="var(--text-success-cust)" size="18" />
                    </div>
                </div>
            },
            {
                headerName: "", field: "id", sortable: false, resizable: false, filter: false, maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.revertTaskFromComGrid()}>
                        <RotateCcw className="mb-1" color="var(--text-highlight-cust)" size="18" />
                    </div>
                </div>
            },
            {
                headerName: "", field: "id", sortable: false, resizable: false, filter: false,  maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.openTask(params)}>
                        <ArrowRightCircle className="mb-1" color="var(--text-primary-cust)" size="18" />
                    </div>
                </div>
            },
        ]
        const verificationDeleteHeaders = [
            { headerName: "Id", field: "TaskId", checkboxSelection: true, headerCheckboxSelection: true },
            { headerName: "Title", field: "Title" },
            { headerName: "Module", field: "Module" },
            {
                headerName: "", field: "TaskId", sortable: false, resizable: false, filter: false,  maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.updateTaskToDelete()}>
                        <XCircle className="mb-1" color="var(--text-warning-cust)" size="18" />
                    </div>
                </div>
            },
            {
                headerName: "", field: "id", sortable: false, resizable: false, filter: false,  maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.revertTaskFromDelGrid()}>
                        <RotateCcw className="mb-1" color="var(--text-highlight-cust)" size="18" />
                    </div>
                </div>
            },
            {
                headerName: "", field: "id", sortable: false, resizable: false, filter: false, maxWidth: 50,
                cellRenderer : (params) => <div>
                    <div className="tsb-action-button" onClick={() => this.openTask(params)}>
                        <ArrowRightCircle className="mb-1" color="var(--text-primary-cust)" size="18" />
                    </div>
                </div>
            },
        ]



        return (
            <div style={{ height: '100%' }}>
                <nav>
                    <div className="nav ver-tabs nav-pills" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><UserCheck size="16" /> &nbsp; Assignments</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><RefreshCw size="16" /> &nbsp; Verification</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent" style={{ height: '100%' }}>
                    {/* Assignment view */}
                    <div className="tab-pane fade show active" style={{ height: '100%' }} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <div className="row">

                            <div className="mb-3 mt-3 pb-3 card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Assignment Summary</h5>
                                    <p className="asb-subtitle mb-2 text-muted">All values are aggregated across projects</p>
                                </div>
                                <div className="ps-3 row">
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">New</div>
                                            <div>
                                                <b style={{ color: 'var(--text-primary)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_NEW"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">In-Progress</div>
                                            <div>
                                                <b style={{ color: 'var(--text-primary-cust)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_INPROGRESS"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">Self-Commit</div>
                                            <div>
                                                <b style={{ color: 'var(--text-success-cust)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_SELFCOMMIT"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">Self-Delete</div>
                                            <div>
                                                <b style={{ color: 'var(--theme-light)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_DELETE"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">Completed</div>
                                            <div>
                                                <b style={{ color: 'var(--text-warning-cust)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_COMPLETE"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-md-2">
                                        <div className="card">
                                            <div className="fw-bold">Deleted</div>
                                            <div>
                                                <b style={{ color: 'var(--text-highlight-cust)' }}>{this.state.summaryCountObject[res["WORKFLOW"]["STR_WF_DELETE"]]}</b>&nbsp; tasks
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ height: '58%' }}>
                            <div className="asboard mt-2 ag-theme-alpine" style={{ width: '20%' }}>
                                {/* <AgGridReact className="shadow-sm" defaultColDef={defaultRCSColDef} rowData={this.dataRCSSummary} columnDefs={RCSSummaryHeaders} onGridReady={this.initializeRCSGrid} loadingOverlayComponent={Loader}></AgGridReact> */}
                                <AgGridReact className="shadow-sm" defaultColDef={defaultRCSColDef} rowData={this.arrRCSData} columnDefs={RCSSummaryHeaders} onGridReady={this.initializeRCSGrid} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>

                            <div className="asboard mt-2 ag-theme-alpine" style={{ width: '80%' }}>
                                <AgGridReact className="shadow-sm" defaultColDef={defaultAssignmentColDef} rowData={this.dataAssignmentSummary} columnDefs={assignmentSummaryHeaders} onGridReady={this.initializeAssignmentGrid} pagination={true} paginationPageSize={15} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                        </div>
                    </div>

                    {/* Verification view */}
                    <div className="tab-pane fade" style={{ height: '100%' }} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                        <div className="row" style={{ height: '80%' }}>
                            <div className="asboard mt-2 ag-theme-alpine " style={{ width: '50%' }}>
                                <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" aria-label="Basic example">
                                    <button type="button" className="btn" onClick={this.updateTaskToComplete}><CheckCircle color="var(--text-primary)" size="16" /></button>
                                    <button type="button" className="btn" onClick={this.revertTaskFromComGrid}><RotateCcw color="var(--text-primary)" size="16" /></button>
                                    <button type="button" className="btn" onClick={this.initializeCommitVerificationGrid}><RotateCw color="var(--text-primary)" size="16" /></button>
                                </div>
                                <AgGridReact className="shadow-sm" defaultColDef={defaultAssignmentColDef} rowData={this.dataVerificationCommit} columnDefs={verificationCommitHeaders} onGridReady={this.initializeCommitVerificationGrid} pagination={true} paginationPageSize={15} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                            <div className="asboard mt-2 ag-theme-alpine" style={{ width: '50%' }}>
                                <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" aria-label="Basic example">
                                    <button type="button" className="btn" onClick={this.updateTaskToDelete}><XCircle color="var(--text-primary)" size="16" /></button>
                                    <button type="button" className="btn" onClick={this.revertTaskFromDelGrid}><RotateCcw color="var(--text-primary)" size="16" /></button>
                                    <button type="button" className="btn" onClick={this.initializeDeleteVerificationGrid}><RotateCw color="var(--text-primary)" size="16" /></button>
                                </div>
                                <AgGridReact className="shadow-sm" defaultColDef={defaultAssignmentColDef} rowData={this.dataVerificationDelete} columnDefs={verificationDeleteHeaders} onGridReady={this.initializeDeleteVerificationGrid} pagination={true} paginationPageSize={15} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                        </div>
                    </div>
                </div>

                <PopupNotification ref={this.popupRef}/>
            </div>
        )
    }
}

export default Verification;