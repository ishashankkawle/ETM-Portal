import React, { Component } from "react";
import { Edit, Edit2, Flag, Info } from "react-feather";
import './sprint.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from '../../../shared/resources';
import HttpHandler from "../../../core/httpHandler";
import Loader, { getLoader } from "../../loader/loader";
import PopupNotification from "../../popup/popup";
import { getSelectOptionsList } from "../../../core/util";

class Sprint extends Component {

    constructor(props) 
    {
        super();
        this.gridRef = "";
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false ,
            projData : [],
            sprintData : []
        }
        this.initializeGrid = this.initializeGrid.bind(this);
        this.createNewSprint = this.createNewSprint.bind(this);
        this.loadSprintsForProject = this.loadSprintsForProject.bind(this);
    }

    async componentDidMount()
    {
        this.setState({isLoading : true});
        let http = new HttpHandler();
        let arrProjData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/project?userId=" + res["USERDATA"]["STR_USERID"]);
        this.setState({isLoading : false , projData : arrProjData});
    }

    initializeGrid = async (params) => 
    {
        this.gridRef = params.api;
    }

    loadSprintsForProject =async(params) => 
    {
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let projectId = document.getElementById("opr_sprint_proj_sel").value;
        let sprintData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/sprint?projectId=" + projectId);
        if(sprintData.length == 0)
        {
            this.gridRef.showNoRowsOverlay()
        }
        else
        {
            this.gridRef.setRowData(sprintData)
            this.gridRef.hideOverlay();
        }
    }

    createNewSprint = async(e) => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Creating new sprint ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();
        let body = {
            "sprint": document.getElementById("opr_sprint_inp_name").value,
            "startDate": document.getElementById("opr_sprint_inp_sdate").value,
            "endDate": document.getElementById("opr_sprint_inp_edate").value,
            "projectId": document.getElementById("opr_sprint_proj_sel").value
        }
        const http = new HttpHandler();
        try {
            await http.httpPost(res["STR_API_BASEPATH"] + "/api/sprint" , body);
        } catch (error) {
            
        }
        this.popupRef.current.togglePopupNotificationDisplay("Successfully created sprint" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    render() {

        let projOption = getSelectOptionsList(this.state.projData , "ProjectId" , "ProjectName" , true , "Select Project");

        const sprintData = []

        const defaultProjectColDef = {
            sortable: true,
            flex: 1,
            resizable: true,
            rowSelection: 'multiple',
        };

        const projectListHeaders = [
            { headerName: "Project Id", field: "ProjectId", flex: 2, filter: 'agTextColumnFilter' },
            { headerName: "Sprint", field: "Sprint", flex: 2, filter: 'agTextColumnFilter' },
            { headerName: "Start Date", field: "StartDate", flex: 2, filter: 'agTextColumnFilter' },
            { headerName: "End Date", field: "EndDate", flex: 2, filter: 'agTextColumnFilter', resizable: false },
        ]

        if(this.state.isLoading == true)
        {
            return getLoader()
        }
        else
        {
            return (
                <div className="row p-1 h-100">

                    <div className="col-md-4">
                        <div className="card shadow-sm mt-2 mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">New Sprint</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <select className="form-select mt-3 mb-3" id="opr_sprint_proj_sel" onChange={this.loadSprintsForProject}>
                                            {projOption}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-proj-inp-grp-text"><Edit2 color="var(--text-primary)" size="16" /></span>
                                            <input type="text" className="form-control op-proj-frm-ctrl" placeholder="New Sprint name"  id="opr_sprint_inp_name"/>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt" style={{ fontSize : 'smaller'}}>From : </span>
                                            <input type="date" className="form-control" placeholder="Date of Birth" id="opr_sprint_inp_sdate"/>
                                    </div>
                                    <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt" style={{ fontSize : 'smaller'}}>To : </span>
                                            <input type="date" className="form-control" placeholder="Date of Birth" id="opr_sprint_inp_edate"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={this.createNewSprint}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="prgboard mt-2  bg-white pb-5 p-4 ag-theme-alpine shadow-sm" style={{ width: '66%', height: '90%' }}>
                        <h6>Sprints in the project :</h6>
                        <p style={{ color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Select the project to get sprint details</p>
                        <AgGridReact defaultColDef={defaultProjectColDef} rowData={sprintData} columnDefs={projectListHeaders} onGridReady={this.initializeGrid} loadingOverlayComponent={Loader}></AgGridReact>
                    </div>

                    <PopupNotification ref={this.popupRef}/>
                </div>
            )
        }
    }
}

export default Sprint;