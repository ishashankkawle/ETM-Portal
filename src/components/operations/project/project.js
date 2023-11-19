import React, { Component } from "react";
import { Flag, Info } from "react-feather";
import './project.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from '../../../shared/resources';
import HttpHandler from "../../../core/httpHandler";
import Loader, { getLoader } from "../../loader/loader";
import PopupNotification from "../../popup/popup";

class Project extends Component {

    constructor(props) 
    {
        super();
        this.gridRef = "";
        this.popupRef = React.createRef();
        this.initializeGrid = this.initializeGrid.bind(this);
        this.createNewProject = this.createNewProject.bind(this);
    }


    initializeGrid = async (params) => 
    {
        if( this.gridRef == "")
        {
            this.gridRef = params.api;
        }
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let projectData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/project?userId=" + res["USERDATA"]["STR_USERID"]);
        if(projectData.length == 0)
        {
            this.gridRef.showNoRowsOverlay()
        }
        else
        {
            this.gridRef.setRowData(projectData)
            this.gridRef.hideOverlay();
        }
    }

    createNewProject = async(e) => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Creating new project ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();
        let body = {
                "title" : document.getElementById("opr_proj_inp_name").value,
                "userId" : res["USERDATA"]["STR_USERID"]
        };
        const http = new HttpHandler();
        await http.httpPost(res["STR_API_BASEPATH"] + "/api/project" , body);
        this.popupRef.current.togglePopupNotificationDisplay("Successfully created project" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    render() {

        const defaultProjectColDef = {
            sortable: true,
            flex: 1,
            resizable: true,
            rowSelection: 'multiple',
        };

        const projectListHeaders = [
            { headerName: "Id", field: "ProjectId", flex: 1, filter: 'agTextColumnFilter' },
            { headerName: "Project", field: "ProjectName", flex: 2, filter: 'agTextColumnFilter', resizable: false },
        ]

        return (
            <div className="row p-1 h-100">

                <div className="col-md-4">
                    <div className="card shadow-sm mt-2 mb-2">
                        <div className="p-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">New Project</h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                        <span className="input-group-text op-proj-inp-grp-text"><Flag color="var(--text-primary)" size="16" /></span>
                                        <input type="text" className="form-control op-proj-frm-ctrl" placeholder="New Project"  id="opr_proj_inp_name"/>
                                    </div>
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> As you are creating this project, you will assigned as project owner for this project</p>
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.createNewProject}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="prgboard mt-2  bg-white pb-5 p-4 ag-theme-alpine shadow-sm" style={{ width: '66%', height: '90%' }}>
                    <h6>Projects owned by you :</h6>
                    <AgGridReact defaultColDef={defaultProjectColDef} rowData={this.projectData} columnDefs={projectListHeaders} loadingOverlayComponent={Loader} onGridReady={this.initializeGrid}></AgGridReact>
                </div>

                <PopupNotification ref={this.popupRef}/>
            </div>
        )
    }
}

export default Project;