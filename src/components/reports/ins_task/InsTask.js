import React, { Component } from "react";
import './InsTask.css'
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import Loader from "../../loader/loader";
import { Download, Info, RotateCw } from "react-feather";

class InsTask extends Component {

    constructor(props) {
        super();
        this.gridRef = "";
        this.state = {
         arrTaskData : []
        }
        this.initializeGrid = this.initializeGrid.bind(this);
    }

    initializeGrid = async (params) => {
        if (this.gridRef == "") {
            this.gridRef = params.api;
        }
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let taskData = await http.httpGet("http://localhost:8081/api/task");
        if (taskData.length == 0) {
            this.gridRef.showNoRowsOverlay()
        }
        else {
            this.setState({arrTaskData : taskData})
            this.gridRef.setRowData(taskData)
            this.gridRef.hideOverlay();
        }
    }


    render() {

        const defaultProjectColDef = {
            sortable: true,
            resizable: true,
            rowSelection: 'multiple',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };

        const projectListHeaders = [
            { headerName: "Id", field: "TaskId",  filter: 'agTextColumnFilter' },
            { headerName: "Title", field: "Title",  filter: 'agTextColumnFilter' },
            { headerName: "Description", field: "Description", filter: 'agTextColumnFilter'},
            { headerName: "Status", field: "TaskStatus", filter: 'agTextColumnFilter'},
            { headerName: "Owner Id", field: "TaskOwner", filter: 'agTextColumnFilter'},
            { headerName: "Owner", field: "OwnerName", filter: 'agTextColumnFilter'},
            { headerName: "Assigner Id", field: "TaskAssigner", filter: 'agTextColumnFilter'},
            { headerName: "Assigner", field: "AssignerName", filter: 'agTextColumnFilter'},
            { headerName: "Date Created", field: "DateCreated", filter: 'agTextColumnFilter'},
            { headerName: "End Date", field: "EndDate", filter: 'agTextColumnFilter'},
            { headerName: "Sprint", field: "SprintName", filter: 'agTextColumnFilter'},
            { headerName: "Project", field: "Project", filter: 'agTextColumnFilter'  },
            { headerName: "Module", field: "Module", filter: 'agTextColumnFilter'},
            { headerName: "Type", field: "Type", filter: 'agTextColumnFilter'},
            { headerName: "Priority", field: "Priority", filter: 'agTextColumnFilter' , resizable: false},
        ]

        return (
            <div className="row p-1 h-100">
                <div className="insight-card-block p-0">
                    <div className="row bg-white shadow-sm insight-card-block  m-2">
                        <div className="col-6" style={{paddingTop: 'inherit'}}>
                            <h6 className="text-start mb-2" style={{ color: 'var(--text-primary)', marginBottom: '0' }}>Task Insights</h6>
                            <p className="text-start" style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Values are aggragated across all projects</p>
                        </div>
                    </div>
                    <div className="text-start mt-2 p-2 ag-theme-alpine ins_task-table">
                        <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" aria-label="Basic example">
                            <button type="button" className="btn" onClick={this.updateTaskToSelfDelete}><Download color="var(--text-primary)" size="16" /></button>
                            <button type="button" className="btn" onClick={this.initializeGrid}><RotateCw color="var(--text-primary)" size="16" /></button>
                        </div>
                        <AgGridReact defaultColDef={defaultProjectColDef} rowData={this.taskData} columnDefs={projectListHeaders} loadingOverlayComponent={Loader} onGridReady={this.initializeGrid} pagination={true} paginationPageSize={10}></AgGridReact>
                    </div>
                </div>
            </div>
        )
    }
}

export default InsTask;