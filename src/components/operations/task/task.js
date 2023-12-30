import React, { Component } from "react";
import './task.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ArrowRightCircle, Edit2 } from "react-feather";
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import Loader, { getLoader } from "../../loader/loader";
import { getSelectOptionsList } from "../../../core/util";
import PopupNotification from "../../popup/popup";

class Task extends Component {

    constructor(props) {
        super(props);
        this.gridRef = "";
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false,
            isProjectSelected : false,
            projData: [],
            moduleData: [],
            isModuleFetchComplete : false,
            typeData: [],
            isTypeFetchComplete : false,
            priorityData: [],
            isPriorityFetchComplete : false,    
            userData: [],
            isUserFetchComplete : false,
            sprintData: [],
            isSprintFetchComplete : false
        }
        this.initializeGrid = this.initializeGrid.bind(this);
        this.loadAssetsForTask = this.loadAssetsForTask.bind(this);
        this.loadSprintList = this.loadSprintList.bind(this);
        this.loadUserList = this.loadUserList.bind(this);
        this.loadModulesList = this.loadModulesList.bind(this);
        this.loadTypesList = this.loadTypesList.bind(this);
        this.loadPrioritiesList = this.loadPrioritiesList.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
    }

    
    async componentDidMount() {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrProjData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/project?userId=" + res["USERDATA"]["STR_USERID"]);
        this.setState({ isLoading: false, projData: arrProjData });
    }
    
    createNewTask = async (e) => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Creating new task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();
        let projId = document.getElementById("opr_task_proj_sel").value
        let module = document.getElementById("opr_task_sel_module").value
        let taskTitle = document.getElementById("opr_task_inp_title").value
        let taskDesc = document.getElementById("opr_task_inp_desc").value
        let sprintId = document.getElementById("opr_task_sel_sprint").value
        let owner = document.getElementById("opr_task_sel_user").value
        let assigner = res["USERDATA"]["STR_USERID"]
        let type = document.getElementById("opr_task_sel_type").value
        let priority = document.getElementById("opr_task_sel_priority").value

        let body = {
            "projectId": projId,
            "module": module,
            "title": taskTitle,
            "description": taskDesc,
            "sprintId": sprintId,
            "owner": owner,
            "assigner": assigner,
            "taskStatus": "New",
            "type": type,
            "priority": priority
          }
        const http = new HttpHandler();
        await http.httpPost(res["STR_API_BASEPATH"] + "/api/task" , body);
        this.popupRef.current.togglePopupNotificationDisplay("Successfully created new task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    initializeGrid = async (params) => {
        if (this.gridRef == "") {
            this.gridRef = params.api;
        }
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let data = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task?taskFilter=TaskAssigner&filterParam=" + res["USERDATA"]["STR_USERID"])
        if (data.length == 0) {
            this.gridRef.showNoRowsOverlay()
        }
        else {
            this.gridRef.setRowData(data)
            this.gridRef.hideOverlay();
        }
    }

    openTask(params) {
        localStorage.setItem("userdata" , JSON.stringify(res["USERDATA"]))
        localStorage.setItem("api-base-path" , JSON.stringify(res["STR_API_BASEPATH"]))
        localStorage.setItem("popup-notif" , JSON.stringify(res["POPUP_NOTIFICATION_MAP"]))
        localStorage.setItem("workflow" , JSON.stringify(res["WORKFLOW"]))
        window.open(process.env.PUBLIC_URL + "/taskview/" + params.data.TaskId, "_blank")
    }

    loadAssetsForTask = async () => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Fetching data" , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 10000)
        let obj = {
            isProjectSelected : false,
            moduleData: [],
            isModuleFetchComplete : false,
            typeData: [],
            isTypeFetchComplete : false,
            priorityData: [],
            isPriorityFetchComplete : false,    
            userData: [],
            isUserFetchComplete : false,
            sprintData: [],
            isSprintFetchComplete : false
        }
        this.setState(obj)
        let projectId = document.getElementById("opr_task_proj_sel").value;
        this.loadSprintList(projectId);
        this.loadUserList(projectId);
        this.loadModulesList(projectId);
        this.loadTypesList(projectId);
        this.loadPrioritiesList(projectId);
        this.setState({isProjectSelected : true})
    }
    loadModulesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/module?projectId=" + projectId);
        this.setState({moduleData : arrData , isModuleFetchComplete : true})
    }
    loadTypesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/type?projectId=" + projectId);
        this.setState({typeData : arrData , isTypeFetchComplete : true})
    }
    loadPrioritiesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/priority?projectId=" + projectId);
        this.setState({priorityData : arrData , isPriorityFetchComplete : true})
    }
    loadUserList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/user?userId=" + res["USERDATA"]["STR_USERID"] + "&projectId=" + projectId + "&roleFilter=smaller_and_equal&projectFilter=same");
        this.setState({userData : arrData , isUserFetchComplete : true})
    }
    loadSprintList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/sprint?projectId=" + projectId);
        this.setState({sprintData : arrData , isSprintFetchComplete : true})
    }


    render() {

        const defaultTaskColDef = {
            sortable: true,
            filter: 'agTextColumnFilter',
            flex: 1,
            resizable: true,
            rowSelection: 'multiple',
        };

        const TaskListHeaders = [
            { headerName: "Id", field: "TaskId" },
            { headerName: "Title", field: "Title" },
            { headerName: "Sprint", field: "SprintName" },
            { headerName: "Module", field: "Module" },
            { headerName: "Status", field: "TaskStatus" },
            {
                headerName: "", field: "TaskId", sortable: false, resizable: false, filter: false, defaultMinWidth: 50, maxWidth: 50,
                cellRendererFramework: (params) => <div className="tsb-action-button" onClick={() => this.openTask(params)}>
                    <ArrowRightCircle className="mb-1" color="var(--text-primary-cust)" size="18" />
                </div>
            },
        ]

        if (this.state.isLoading == true) 
        {
            return getLoader()
        }
        else 
        {
            let projOption = getSelectOptionsList(this.state.projData , "ProjectId" , "ProjectName" , true , "Select Project");
            let userOption = ""
            let sprintOption = "" 
            let moduleOption = ""
            let typeOption = ""
            let priorityOption = ""
            if(this.state.isModuleFetchComplete && this.state.isPriorityFetchComplete && this.state.isTypeFetchComplete && this.state.isUserFetchComplete && this.state.isSprintFetchComplete)
            {
                userOption = getSelectOptionsList(this.state.userData , "UserId" , "Name" , true , "Select Resource");
                sprintOption = getSelectOptionsList(this.state.sprintData , "Sprint" , "Sprint" , true , "Select Sprint");
                moduleOption = getSelectOptionsList(this.state.moduleData , "Module" , "Module" , true , "Select Module");
                typeOption = getSelectOptionsList(this.state.typeData , "Type" , "Type" , true , "Select Type");
                priorityOption = getSelectOptionsList(this.state.priorityData , "Priority" , "Priority" , true , "Select Priority");
            }
            else
            {
                if(this.state.isProjectSelected)
                {
                    userOption = getSelectOptionsList([] , "UserId" , "Name" , true , "Loading");
                    sprintOption = getSelectOptionsList([] , "Sprint" , "Sprint" , true , "Loading");
                    moduleOption = getSelectOptionsList([] , "Module" , "Module" , true , "Loading");
                    typeOption = getSelectOptionsList([] , "Type" , "Type" , true , "Loading");
                    priorityOption = getSelectOptionsList([] , "Priority" , "Priority" , true , "Loading");
                }
                else
                {
                    userOption = getSelectOptionsList([] , "UserId" , "Name" , true , "");
                    sprintOption = getSelectOptionsList([] , "Sprint" , "Sprint" , true , "");
                    moduleOption = getSelectOptionsList([] , "Module" , "Module" , true , "");
                    typeOption = getSelectOptionsList([] , "Type" , "Type" , true , "");
                    priorityOption = getSelectOptionsList([] , "Priority" , "Priority" , true , "");
                }
            }

            return (
                <div className="row p-1 h-100">

                    <div className="col-md-5">
                        <div className="card shadow-sm mt-2 mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">New Task</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-tsk-inp-grp-txt"><Edit2 color="var(--text-primary)" size="16" /></span>
                                            <input type="text" className="form-control" placeholder="Title" id="opr_task_inp_title"/>
                                        </div>
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <textarea type="text" className="form-control border-start" placeholder="Desccription" rows="2" id="opr_task_inp_desc" />
                                        </div>
                                        <select className="form-select mt-3 mb-3" id="opr_task_proj_sel" onChange={this.loadAssetsForTask}>
                                            {projOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3" id="opr_task_sel_sprint">
                                            {sprintOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3" id="opr_task_sel_user">
                                            {userOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3" id="opr_task_sel_module">
                                            {moduleOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3" id="opr_task_sel_type">
                                            {typeOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3" id="opr_task_sel_priority">
                                            {priorityOption}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={this.createNewTask}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="prgboard mt-2  bg-white pb-5 p-4 ag-theme-alpine shadow-sm" style={{ width: '58%', height: '87%' }}>
                        <h6>Recent Tasks :</h6>
                        <AgGridReact defaultColDef={defaultTaskColDef} rowData={this.data} columnDefs={TaskListHeaders} onGridReady={this.initializeGrid} loadingOverlayComponent={Loader}></AgGridReact>
                    </div>

                    <PopupNotification ref={this.popupRef}/>
                </div>
            )
        }
    }
}

export default Task;