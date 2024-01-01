import React, { Component } from "react";
import { ArrowRightCircle, ChevronsRight, Plus, RotateCw, UserCheck, UserX } from "react-feather";
import { AgGridReact } from 'ag-grid-react';
import './taskboard.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import HttpHandler from "../../core/httpHandler";
import Loader from "../loader/loader";
import { NavLink, Navigate } from "react-router-dom";
import { getNextWorkflowStatus } from "../../core/workflowOperations";
import res from "../../shared/resources";
import PopupNotification from "../popup/popup";

class TaskBoard extends Component {

  constructor(props) {
    super(props);
    this.gridRef = "";
    this.popupRef = React.createRef();
    this.state = { 
      opentask : false,
      taskurl : ""
  }
    this.initializeGrid = this.initializeGrid.bind(this);
    this.updateTaskToNextWorkflow = this.updateTaskToNextWorkflow.bind(this);
    this.updateTaskToSelfCommit = this.updateTaskToSelfCommit.bind(this);
    this.updateTaskToSelfDelete = this.updateTaskToSelfDelete.bind(this);
  }


  initializeGrid = async(params) => 
  {
    if(this.gridRef == "")
    {
      this.gridRef = params.api;
    }
    this.gridRef.setRowData([])
    this.gridRef.showLoadingOverlay();
    const http = new HttpHandler();
    let data = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task?taskFilter=TaskOwner&filterParam=" + res["USERDATA"]["STR_USERID"])
    let finalData = []
    for (let index = 0; index < data.length; index++) 
    {
      if(data[index]["TaskStatus"] == res["WORKFLOW"]["STR_WF_NEW"] || data[index]["TaskStatus"] == res["WORKFLOW"]["STR_WF_INPROGRESS"])
      {
        finalData.push(data[index])
      }
    }
    if(finalData.length == 0)
    {
      this.gridRef.showNoRowsOverlay()
    }
    else
    {
      this.gridRef.setRowData(finalData)
      this.gridRef.hideOverlay();
    }
  }

  updateTaskToNextWorkflow = async() => {
    this.popupRef.current.togglePopupNotificationDisplay("Updating task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
    
    let arrData = this.gridRef.getSelectedRows();
    let body = []

    for (let index = 0; index < arrData.length; index++) 
    {
      let object = {
          "taskId": arrData[index]["TaskId"],
          "userId": res["USERDATA"]["STR_USERID"],
          "userName": res["USERDATA"]["STR_USERNAME"],
          "updateType": "workflow",
          "currentWorkflowState": arrData[index]["TaskStatus"],
          "newWorkflowState": getNextWorkflowStatus(arrData[index]["TaskStatus"])
        }  
      body.push(object)
    }
    const http = new HttpHandler();
    await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
    this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  }
  
  updateTaskToSelfCommit = async() => {
    this.popupRef.current.togglePopupNotificationDisplay("Updating task to self-commit ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
    let arrData = this.gridRef.getSelectedRows();
    let body = []

    for (let index = 0; index < arrData.length; index++) 
    {
      let object = {
          "taskId": arrData[index]["TaskId"],
          "userId": res["USERDATA"]["STR_USERID"],
          "userName": res["USERDATA"]["STR_USERNAME"],
          "updateType": "workflow",
          "currentWorkflowState": arrData[index]["TaskStatus"],
          "newWorkflowState": res["WORKFLOW"]["STR_WF_SELFCOMMIT"]
        }  
      body.push(object)
    }
    const http = new HttpHandler();
    await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
    this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task for self-commit" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  }
  
  updateTaskToSelfDelete = async() => {
    this.popupRef.current.togglePopupNotificationDisplay("Updating task to self-delete ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
    let arrData = this.gridRef.getSelectedRows();
    let body = []

    for (let index = 0; index < arrData.length; index++) 
    {
      let object = {
          "taskId": arrData[index]["TaskId"],
          "userId": res["USERDATA"]["STR_USERID"],
          "userName": res["USERDATA"]["STR_USERNAME"],
          "updateType": "workflow",
          "currentWorkflowState": arrData[index]["TaskStatus"],
          "newWorkflowState": res["WORKFLOW"]["STR_WF_SELFDELETE"]
        }  
      body.push(object)
    }
    const http = new HttpHandler();
    await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
    this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task for self-delete" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
  }

  openTask(params) {
    //localStorage.setItem("userdata" , JSON.stringify(res["USERDATA"]))
    //localStorage.setItem("api-base-path" , JSON.stringify(res["STR_API_BASEPATH"]))
    //localStorage.setItem("popup-notif" , JSON.stringify(res["POPUP_NOTIFICATION_MAP"]))
    //localStorage.setItem("workflow" , JSON.stringify(res["WORKFLOW"]))
    //window.open(process.env.PUBLIC_URL + "/taskview/" + params.data.TaskId, "_blank")
    let url = "/app/taskview/" + params.data.TaskId
    this.setState({openTask: true, taskurl: url})
  }

  render() {

    if(this.state.openTask)
    {
        return (<Navigate to={this.state.taskurl} replace={true}/>)
    }

    const defaultColDef = {
      sortable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1,
      resizable: true,
    };

    const columnDefs = [
      { headerName: "Id", field: "TaskId", checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: "Title", field: "Title" },
      { headerName: "Sprint", field: "SprintName" },
      { headerName: "Assigned By", field: "AssignerName" },
      { headerName: "Module", field: "Module" },
      { headerName: "Status", field: "TaskStatus" },
      {
        headerName: "", field: "Id", sortable: false, resizable: false, filter: false, defaultMinWidth: 50, maxWidth: 50,
        cellRenderer : (params) => <div className="tsb-action-button" onClick={() => this.openTask(params)}>
          <ArrowRightCircle className="mb-1" color="var(--text-primary-cust)" size="18" />
        </div>
      },
    ]


    return (

      <div className="tsboard mt-2 ag-theme-alpine" style={{ height: '85%' }}>
        <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" aria-label="Basic example">
          <button type="button" className="btn"><NavLink to="/app/operations/task" exact="true"><Plus color="var(--text-primary)" size="16" /></NavLink></button>
          <button type="button" className="btn" onClick={this.updateTaskToNextWorkflow}><ChevronsRight color="var(--text-primary)" size="16" /></button>
          <button type="button" className="btn" onClick={this.updateTaskToSelfCommit}><UserCheck color="var(--text-primary)" size="16" /></button>
          <button type="button" className="btn" onClick={this.updateTaskToSelfDelete}><UserX color="var(--text-primary)" size="16" /></button>
          <button type="button" className="btn" onClick={this.initializeGrid}><RotateCw color="var(--text-primary)" size="16" /></button>
        </div>
        <AgGridReact className="shadow-sm" defaultColDef={defaultColDef} rowData={this.data} columnDefs={columnDefs} onGridReady={this.initializeGrid} pagination={true} paginationPageSize={15} loadingOverlayComponent={Loader}></AgGridReact>
      
        <PopupNotification ref={this.popupRef}/>
      </div>
    )
  }
}
export default TaskBoard;