import React, { Component } from "react";
import './InsProject.css'
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import Loader from "../../loader/loader";
import { Download, Info, RotateCw } from "react-feather";

class InsProject extends Component {

    constructor(props) {
        super();
        this.gridRef = "";
        this.state = {
         arrProjectData : []
        }
        this.initializeGrid = this.initializeGrid.bind(this);
    }

    initializeGrid = async (params) => {
        if (this.gridRef == "") {
            this.gridRef = params.api;
        }
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let projectData = await http.httpGet("http://localhost:8081/api/project");
        if (projectData.length == 0) {
            this.gridRef.showNoRowsOverlay()
        }
        else {
            this.setState({arrProjectData : projectData})
            this.gridRef.setRowData(projectData)
            this.gridRef.hideOverlay();
        }
    }


    render() {

        const defaultProjectColDef = {
            sortable: true,
            flex: 1,
            resizable: true,
            rowSelection: 'multiple',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };

        const projectListHeaders = [
            { headerName: "Id", field: "projectId", flex: 1, filter: 'agTextColumnFilter' },
            { headerName: "Date Created", field: "dateCreated", flex: 2, filter: 'agTextColumnFilter'},
            { headerName: "Project", field: "projectName", flex: 2, filter: 'agTextColumnFilter' , resizable: false  },
        ]

        return (
            <div className="row p-1 h-100">
                <div className="insight-card-block p-0">
                    <div className="row bg-white shadow-sm insight-card-block  m-2">
                        <div className="col-6 border-end" style={{paddingTop: 'inherit'}}>
                            <h6 className="text-start mb-2" style={{ color: 'var(--text-primary)', marginBottom: '0' }}>Project Insights</h6>
                            <p className="text-start" style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Values are aggragated across all projects</p>
                        </div>
                        <div className="col-6" style={{paddingTop: 'inherit'}}>
                            <div className="row d-flex align-items-center">
                                <div className="col-5" style={{ color: 'var(--text-primary)' }}>Total projects:  </div>
                                <h1 className="col-5" style={{ color: 'var(--text-primary-cust)' }}>{this.state.arrProjectData.length}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="text-start mt-2 p-2 ag-theme-alpine ins_project-table">
                        {/* <h6 style={{ fontSize: 'small' }}>Projects :</h6> */}
                        <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" aria-label="Basic example">
                            <button type="button" className="btn" onClick={this.updateTaskToSelfDelete}><Download color="var(--text-primary)" size="16" /></button>
                            <button type="button" className="btn" onClick={this.initializeGrid}><RotateCw color="var(--text-primary)" size="16" /></button>
                        </div>
                        <AgGridReact defaultColDef={defaultProjectColDef} rowData={this.projectData} columnDefs={projectListHeaders} loadingOverlayComponent={Loader} onGridReady={this.initializeGrid} pagination={true} paginationPageSize={10}></AgGridReact>
                    </div>
                </div>
            </div>
        )
    }
}

export default InsProject;