import React, { Component } from "react";
import { ArrowRightCircle } from "react-feather";
import { AgGridReact } from 'ag-grid-react';
import './taskboard.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CheckboxSelectionComponent } from "ag-grid-community";

class TaskBoard extends Component 
{

  constructor(props)
  {
    super(props);
    this.gridRef = "";
  }

  setGridRef(params)
  {
    this.gridRef = params.api;
    console.log("Grid reference set")
  }

  openTask(params)
  {
    window.open("https://www.google.com/" , "_blank")
  }

  render() 
  {
    const defaultColDef = {
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
      resizable:true,
    };
    
    const data = [{ "title": "Ascx", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "New", "id": "1" }, { "title": "Aacw", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "New", "id": "2" }, { "title": "Task 1", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "In Progress", "id": "3" }, { "title": "Task 1", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "In Progress", "id": "4" }, { "title": "Task 1", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "In Progress", "id": "5" }, { "title": "Task 1", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "Pending Verification", "id": "6" }, { "title": "Task 1", "sprint": "Sprint 03-2023", "assignedBy": "Shashank Kawle", "module": "ASKV", "status": "Pending Verification", "id": "7" }];
    
    const columnDefs = [
      { headerName: "Id", field: "id", hide: true }, 
      { headerName: "Title", field: "title", checkboxSelection: true, headerCheckboxSelection: true}, 
      { headerName: "Sprint", field: "sprint" },
      { headerName: "Assigned By", field: "assignedBy" },
      { headerName: "Module", field: "module" },
      { headerName: "Status", field: "status" },
      { headerName: "", field: "id" , sortable: false, resizable:false ,filter: false, defaultMinWidth:50, maxWidth: 50,
      cellRendererFramework: (params) => <div className="tsb-action-button" onClick={() => this.openTask(params)}>
                                            <ArrowRightCircle color="var(--text-primary-cust)" size="28"/>
                                          </div>},
    ]

    return (
      <div className="tsboard mt-2 ag-theme-alpine" style={{height: '90%'}}>
        <AgGridReact defaultColDef={defaultColDef} rowData={data} columnDefs={columnDefs} onGridReady={this.setGridRef} pagination={true} paginationPageSize={15}></AgGridReact>
      </div>
    )
  }
}
export default TaskBoard;