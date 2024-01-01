import React, { Component } from 'react';
import './taskview.css';
import { ArrowRight, Edit2, Image, ChevronsRight, Plus, RotateCw, UserCheck, UserX, Paperclip, Info } from 'react-feather';
import HttpHandler from '../../core/httpHandler';
import { getFullScreenLoader } from '../loader/loader';
import { getSelectOptionsList } from '../../core/util';
import res from '../../shared/resources';
import { NavLink } from "react-router-dom";
import { getNextWorkflowStatus } from '../../core/workflowOperations';
import PopupNotification from '../popup/popup';


class TaskView extends Component {

    constructor(props) {
        super(props)
        res["USERDATA"] = JSON.parse(localStorage.getItem("userdata"))
        res["STR_API_BASEPATH"] = JSON.parse(localStorage.getItem("api-base-path"))
        res["POPUP_NOTIFICATION_MAP"] = JSON.parse(localStorage.getItem("popup-notif"))
        res["WORKFLOW"] = JSON.parse(localStorage.getItem("workflow"))
        localStorage.clear();
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false,
            taskData: {},
            activityData: [],
            projectData: [],
            isProjectFetchComplete: false,
            isProjectSelected: false,
            moduleData: [],
            isModuleFetchComplete: false,
            typeData: [],
            isTypeFetchComplete: false,
            priorityData: [],
            isPriorityFetchComplete: false,
            userData: [],
            isUserFetchComplete: false,
            sprintData: [],
            isSprintFetchComplete: false,
            isPopupOpen: false,
            popupCaller: ""
        };

        this.editObj = {
            project : "",
            module : "",
            type : "",
            priority : "",
            owner : "",
            sprint : "",
        }

        this.initialize = this.initialize.bind(this);
        this.toggleEditPopup = this.toggleEditPopup.bind(this);
        this.loadAssetsForTask = this.loadAssetsForTask.bind(this);
        this.loadSprintList = this.loadSprintList.bind(this);
        this.loadUserList = this.loadUserList.bind(this);
        this.loadModulesList = this.loadModulesList.bind(this);
        this.loadTypesList = this.loadTypesList.bind(this);
        this.loadPrioritiesList = this.loadPrioritiesList.bind(this);
        this.updateTaskToNextWorkflow = this.updateTaskToNextWorkflow.bind(this);
        this.updateTaskToSelfCommit = this.updateTaskToSelfCommit.bind(this);
        this.updateTaskToSelfDelete = this.updateTaskToSelfDelete.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.updateAttachment = this.updateAttachment.bind(this);
        this.handleProjectSelection = this.handleProjectSelection.bind(this);
        this.updateEditObject = this.updateEditObject.bind(this);
        this.updateTaskFields = this.updateTaskFields.bind(this);
    }

    async componentDidMount() {
        await this.initialize();
        document.getElementById('root').style.height = "100%"
        console.log(localStorage.getItem("USERDATA"))
    }

    initialize = async() => {
        this.setState({ isLoading: true });
        let taskId = window.location.href.split("/").pop();
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/task/" + taskId + "?activity=true");
        this.setState({ isLoading: false, taskData: arrData["0"]["payload"][0], activityData: arrData["1"]["payload"]["activity"].reverse() });
    }

    toggleEditPopup = async (param) => 
    {        
        if (this.state.isPopupOpen) {
            this.setState({ isPopupOpen: false})
        }
        else {
            if(param == "tskview_btn_edit")
            {
                if (!this.state.isProjectFetchComplete) {
                    this.loadProjectForTask()
                }
            }
            this.setState({ isPopupOpen: true , popupCaller: param})
        }

    }

    loadProjectForTask = async () => {
        if (!this.state.isProjectFetchComplete) {
            let http = new HttpHandler();
            let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/project?userId=" + res["USERDATA"]["STR_USERID"]);
            this.setState({ isProjectFetchComplete: true, projectData: arrData })
        }
    }

    handleProjectSelection = (event) => {
        this.updateEditObject("project" , event.target.id)
        this.loadAssetsForTask()
    }

    loadAssetsForTask = async () => {
        this.setState({ isProjectSelected: true })
        let obj = {
            moduleData: [],
            isModuleFetchComplete: false,
            typeData: [],
            isTypeFetchComplete: false,
            priorityData: [],
            isPriorityFetchComplete: false,
            userData: [],
            isUserFetchComplete: false,
            sprintData: [],
            isSprintFetchComplete: false
        }
        this.setState(obj)
        let projectId = document.getElementById("tskview_proj_sel").value;
        this.loadSprintList(projectId);
        this.loadUserList(projectId);
        this.loadModulesList(projectId);
        this.loadTypesList(projectId);
        this.loadPrioritiesList(projectId);
    }
    loadModulesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/module?projectId=" + projectId);
        this.setState({ moduleData: arrData, isModuleFetchComplete: true })
    }
    loadTypesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/type?projectId=" + projectId);
        this.setState({ typeData: arrData, isTypeFetchComplete: true })
    }
    loadPrioritiesList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/priority?projectId=" + projectId);
        this.setState({ priorityData: arrData, isPriorityFetchComplete: true })
    }
    loadUserList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/user?userId=" + res["USERDATA"]["STR_USERID"] + "&projectId=" + projectId + "&roleFilter=smaller_and_equal&projectFilter=same");
        this.setState({ userData: arrData, isUserFetchComplete: true })
    }
    loadSprintList = async (projectId) => {
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/sprint?projectId=" + projectId);
        this.setState({ sprintData: arrData, isSprintFetchComplete: true })
    }

    updateTaskToNextWorkflow = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Updating task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let body = []
        let object = {
            "taskId": this.state.taskData["TaskId"],
            "userId": res["USERDATA"]["STR_USERID"],
            "userName": res["USERDATA"]["STR_USERNAME"],
            "updateType": "workflow",
            "currentWorkflowState": this.state.taskData["TaskStatus"],
            "newWorkflowState": getNextWorkflowStatus(this.state.taskData["TaskStatus"])
        }  
        body.push(object)
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }
      
    updateTaskToSelfCommit = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Updating task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let body = []
        let object = {
            "taskId": this.state.taskData["TaskId"],
            "userId": res["USERDATA"]["STR_USERID"],
            "userName": res["USERDATA"]["STR_USERNAME"],
            "updateType": "workflow",
            "currentWorkflowState": this.state.taskData["TaskStatus"],
            "newWorkflowState": res["WORKFLOW"]["STR_WF_SELFCOMMIT"]
          }  
        body.push(object)
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }
      
    updateTaskToSelfDelete = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Updating task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let body = []
        let object = {
            "taskId": this.state.taskData["TaskId"],
            "userId": res["USERDATA"]["STR_USERID"],
            "userName": res["USERDATA"]["STR_USERNAME"],
            "updateType": "workflow",
            "currentWorkflowState": this.state.taskData["TaskStatus"],
            "newWorkflowState": res["WORKFLOW"]["STR_WF_SELFDELETE"]
          }  
        body.push(object)
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    updateComment = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Adding new comment ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        let body = {
            "taskId": this.state.taskData["TaskId"],
            "userId": res["USERDATA"]["STR_USERID"],
            "userName": res["USERDATA"]["STR_USERNAME"],
            "updateType": "comment",
            "data": document.getElementById('tskview_inp_comment').value
          }
        const http = new HttpHandler();
        await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow" , body)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully added comment" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    updateAttachment = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Uploading attachment ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        const http = new HttpHandler();
        let fileData = document.getElementById('tskview-inp-attachment').files[0];
        let body = new FormData();
        body.append(fileData.name,fileData)
        body.append("UPLOADCARE_PUB_KEY", "0df57c1d7377e7482b0b")
        let result = await http.httpPostMultiartData("https://upload.uploadcare.com/base/", body, http.getDefaultMultipartHeaders());
        let activityBody = {}
        activityBody["taskId"] = this.state.taskData["TaskId"];
        activityBody["userId"] = res["USERDATA"]["STR_USERID"];
        activityBody["userName"] = res["USERDATA"]["STR_USERNAME"];
        activityBody["updateType"] = "attachment";
        activityBody["commentData"] = document.getElementById('tskview-inp-attachment-comment').value;
        activityBody["fileName"] = fileData.name;
        activityBody["url"] = "https://ucarecdn.com/" + result[fileData.name] + "/";

        result = await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/activityworkflow", activityBody, http.getDefaultHeaders());
        //return result;
        this.popupRef.current.togglePopupNotificationDisplay("Successfully added attachment" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    updateEditObject = (param , id) => {
        if(param == "project")
        {
            this.editObj.project = document.getElementById(id).value;
        }
        else if(param == "module")
        {
            this.editObj.module = document.getElementById(id).value;
        }
        else if(param == "type")
        {
            this.editObj.type = document.getElementById(id).value;
        }
        else if(param == "priority")
        {
            this.editObj.priority = document.getElementById(id).value;
        }
        else if(param == "owner")
        {
            this.editObj.owner = document.getElementById(id).value;
        }
        else if(param == "sprint")
        {
            this.editObj.sprint = document.getElementById(id).value;
        }
        else
        {
            console.log("No update found")
        }
        console.log("Edit Object = " + JSON.stringify(this.editObj))
    }

    updateTaskFields = async() => {
        this.popupRef.current.togglePopupNotificationDisplay("Updating task ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        if(this.state.projectData.length == 1 && this.editObj.module == "" && this.editObj.type == "" && this.editObj.priority == "" && this.editObj.sprint == "" && this.editObj.owner == "")
        {
            console.log("No Update")
        }
        else
        {
            this.updateTaskField_project()
            this.updateTaskField_module()
            this.updateTaskField_type()
            this.updateTaskField_priority()
            this.updateTaskField_sprint()
            this.updateTaskField_owner()
        }
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated task" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    updateTaskField_project = async () => 
    {
        if(this.state.projectData.length != 1)
        {
            let object = {}
            for (let index = 0; index < this.state.projectData.length; index++) {
                    if(this.state.projectData[index]["ProjectId"] == this.editObj.project)
                    {
                        object = this.state.projectData[index]
                    }
                    break;
            }
            if(this.state.taskData["Project"] != object["ProjectName"])
            {
                let body = {
                    "taskId": this.state.taskData["TaskId"],
                    "userId": res["USERDATA"]["STR_USERID"],
                    "userName": res["USERDATA"]["STR_USERNAME"],
                    "field": "Project",
                    "fieldValue": this.editObj.project
                }
                const http = new HttpHandler();
                await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)
            }
        }
    }

    updateTaskField_module = async () => 
    {
        if(this.editObj.module != "")
        {
            let body = {
                "taskId": this.state.taskData["TaskId"],
                "userId": res["USERDATA"]["STR_USERID"],
                "userName": res["USERDATA"]["STR_USERNAME"],
                "field": "Module",
                "fieldValue": this.editObj.module
            }
            const http = new HttpHandler();
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)
        }
    }
    
    updateTaskField_type = async () => 
    {
        if(this.editObj.type != "")
        {
            let body = {
                "taskId": this.state.taskData["TaskId"],
                "userId": res["USERDATA"]["STR_USERID"],
                "userName": res["USERDATA"]["STR_USERNAME"],
                "field": "Type",
                "fieldValue": this.editObj.type
            }
            const http = new HttpHandler();
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)
        }
    }

    updateTaskField_priority = async () => 
    {
        if(this.editObj.priority != "")
        {
            let body = {
                "taskId": this.state.taskData["TaskId"],
                "userId": res["USERDATA"]["STR_USERID"],
                "userName": res["USERDATA"]["STR_USERNAME"],
                "field": "Priority",
                "fieldValue": this.editObj.priority
            }
            const http = new HttpHandler();
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)
        }
    }

    updateTaskField_sprint = async () => 
    {
        if(this.editObj.sprint != "")
        {
            let body = {
                "taskId": this.state.taskData["TaskId"],
                "userId": res["USERDATA"]["STR_USERID"],
                "userName": res["USERDATA"]["STR_USERNAME"],
                "field": "Sprint",
                "fieldValue": this.editObj.sprint
            }
            const http = new HttpHandler();
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)
        }
        
    }

    updateTaskField_owner = async () => 
    {
        if(this.editObj.owner != "" && this.editObj.owner != res["USERDATA"]["STR_USERID"])
        {
            let body = {
                "taskId": this.state.taskData["TaskId"],
                "userId": res["USERDATA"]["STR_USERID"],
                "userName": res["USERDATA"]["STR_USERNAME"],
                "field": "Owner",
                "fieldValue": this.editObj.owner
            }
            const http = new HttpHandler();
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/task/" + this.state.taskData["TaskId"] , body)            
        }
    }

    render() {
        let arrActivity = []
        let arrAttachments = []

        let editPanel = undefined;

        if (this.state.isPopupOpen) 
        {
            if(this.state.popupCaller == "tskview_btn_attachment")
            {
                editPanel = (
                    <div className='tskview-edit-panel shadow-lg'>
                        <div className='d-flex justify-content-between mb-3 ps-2 pe-2'>
                            <h6>Add attachment</h6>
                            <button type="button" className="btn-close" aria-label="Close" onClick={this.toggleEditPopup}></button>
                        </div>
                            <div className='row px-3'>
                                <textarea className="form-control" id="tskview-inp-attachment-comment" rows="2" placeholder='Enter comment'></textarea>
                            </div>
                            <div className='row'>
                                <input type='file' className='btn ms-1 mt-2' id='tskview-inp-attachment'></input>
                            </div>
                            <div className='row'>
                                <button className='btn btn-primary ms-3 tskview-form-button' onClick={this.updateAttachment}>Send</button>
                            </div>
                    </div>
                )
            }
            else
            {
                let projOption = ""
                let userOption = ""
                let sprintOption = ""
                let moduleOption = ""
                let typeOption = ""
                let priorityOption = ""
                if (!this.state.isProjectFetchComplete) {
                    projOption = getSelectOptionsList([], "UserId", "Name", true, "Loading");
                }
                else {
                    projOption = getSelectOptionsList(this.state.projectData, "ProjectId", "ProjectName", true, "Select Project");
                }

                if (this.state.isModuleFetchComplete && this.state.isPriorityFetchComplete && this.state.isTypeFetchComplete && this.state.isUserFetchComplete && this.state.isSprintFetchComplete) {
                    userOption = getSelectOptionsList(this.state.userData, "UserId", "Name", true, "Select Resource");
                    sprintOption = getSelectOptionsList(this.state.sprintData, "Sprint", "Sprint", true, "Select Sprint");
                    moduleOption = getSelectOptionsList(this.state.moduleData, "Module", "Module", true, "Select Module");
                    typeOption = getSelectOptionsList(this.state.typeData, "Type", "Type", true, "Select Type");
                    priorityOption = getSelectOptionsList(this.state.priorityData, "Priority", "Priority", true, "Select Priority");
                }
                else {
                    if (this.state.isProjectSelected) {
                        userOption = getSelectOptionsList([], "UserId", "Name", true, "Loading");
                        sprintOption = getSelectOptionsList([], "SprintId", "Sprint", true, "Loading");
                        moduleOption = getSelectOptionsList([], "Module", "Module", true, "Loading");
                        typeOption = getSelectOptionsList([], "Type", "Type", true, "Loading");
                        priorityOption = getSelectOptionsList([], "Priority", "Priority", true, "Loading");
                    }
                    else {
                        userOption = getSelectOptionsList([], "UserId", "Name", true, "");
                        sprintOption = getSelectOptionsList([], "SprintId", "Sprint", true, "");
                        moduleOption = getSelectOptionsList([], "Module", "Module", true, "");
                        typeOption = getSelectOptionsList([], "Type", "Type", true, "");
                        priorityOption = getSelectOptionsList([], "Priority", "Priority", true, "");
                    }
                }
            
                editPanel = (
                    <div className='tskview-edit-panel shadow-lg'>
                        <div className='d-flex justify-content-between mb-3 pe-2'>
                            <h6>Edit Task</h6>
                            <button type="button" className="btn-close" aria-label="Close" onClick={this.toggleEditPopup}></button>

                        </div>

                        <div className="tab-content" id="myTabContent">
                                <div className='row'>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_proj_sel" onChange={(e) => this.handleProjectSelection(e)}>
                                        {projOption}
                                    </select>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_sel_sprint" onChange={(e) => this.updateEditObject("sprint" , e.target.id)}>
                                        {sprintOption}
                                    </select>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_sel_user" onChange={(e) => this.updateEditObject("owner" , e.target.id)}>
                                        {userOption}
                                    </select>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_sel_module" onChange={(e) => this.updateEditObject("module" , e.target.id)}>
                                        {moduleOption}
                                    </select>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_sel_type" onChange={(e) => this.updateEditObject("type" , e.target.id)}>
                                        {typeOption}
                                    </select>
                                    <select className="form-select mt-3 mb-3 tskview-form-field" id="tskview_sel_priority" onChange={(e) => this.updateEditObject("priority" , e.target.id)}>
                                        {priorityOption}
                                    </select>
                                </div>
                                <div className='row'>
                                    <button className='btn btn-primary ms-3 tskview-form-button' onClick={this.updateTaskFields}>Send</button>
                                </div>
                            </div>
                    </div>
                )
            }
        }


        for (let index = 0; index < this.state.activityData.length; index++) {
            if (this.state.activityData[index]["updateType"] == "comment") {
                arrActivity.push(
                    <li key={index} className='tskview-activity-list-item comment'>
                        <div className='row tskview-activity-box'>
                            <span>{this.state.activityData[index]["userNameBy"]} | {this.state.activityData[index]["dateUpdated"].split("T")[0]}</span>
                            <p>{this.state.activityData[index]["activityData"]}</p>
                        </div>
                    </li>
                )
            }
            else if (this.state.activityData[index]["updateType"] == "workflow") {
                arrActivity.push(
                    <li key={index} className='tskview-activity-list-item workflow'>
                        <div className='row tskview-activity-box'>
                            <span>{this.state.activityData[index]["userNameBy"]} | {this.state.activityData[index]["dateUpdated"].split("T")[0]}</span>
                            <p>Workfow updated from <b>{this.state.activityData[index]["prevWorkflowState"]}</b> &nbsp; <ArrowRight size="15" /> &nbsp; <b>{this.state.activityData[index]["nextWorkflowState"]}</b></p>
                        </div>
                    </li>
                )
            }
            else if (this.state.activityData[index]["updateType"] == "attachment") {
                arrActivity.push(
                    <li key={index} className='tskview-activity-list-item comment'>
                        <div className='row tskview-activity-box'>
                            <span>{this.state.activityData[index]["userNameBy"]} | {this.state.activityData[index]["dateUpdated"].split("T")[0]}</span>
                            <p>{this.state.activityData[index]["comment"]}</p>
                            <div className='tskview-activity-image'><a href={this.state.activityData[index]["url"]} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"><Image size="20" /> &nbsp; {this.state.activityData[index]["fileName"]} </a></div>
                        </div>
                    </li>
                )

                arrAttachments.push(
                    <li key={index} className='list-group-item tskview-attachment-list-group-item'>
                        <a href={this.state.activityData[index]["url"]} target="_blank" rel="noopener noreferrer"><Paperclip size="14"/> <span>{this.state.activityData[index]["fileName"]}</span></a>
                    </li>
                )
            }
            else {
                arrActivity.push(
                    <li key={index} className='tskview-activity-list-item field'>
                        <div className='row tskview-activity-box'>
                            <span>{this.state.activityData[index]["userNameBy"]} | {this.state.activityData[index]["dateUpdated"].split("T")[0]}</span>
                            <p>{this.state.activityData[index]["updateType"]} updated from <b>{this.state.activityData[index]["update"]["oldValue"]}</b> &nbsp; <ArrowRight size="15" /> &nbsp; <b>{this.state.activityData[index]["update"]["newValue"]}</b></p>
                        </div>
                    </li>
                )
            }

        }

        if(arrAttachments.length == 0)
        {
            arrAttachments = <p className='text-center' style={{ fontSize: 'smaller'}}><Info color="var(--text-warning-cust)" size="16" /> No attachments</p>
        }

        if (this.state.isLoading) {
            return getFullScreenLoader("Loading Task")
        }
        else {
            return (
                <div className='d-flex justify-content-center tskview-background' style={{ height: 'auto' }}>
                    <div className='tskview-panel h-100'>
                        <div className='row h-100 me-0'>
                            <div className='col-8 ps-5 pt-4 pe-5'>
                                <div className='row tskview-header-pane'>
                              
                                        <div className='d-flex ps-0 align-items-center'>
                                            <div className="btn-group me-2 btn-group-sm shadow-sm bg-white" role="group" >
                                                <button type="button" className="btn" onClick={this.updateTaskToNextWorkflow}><ChevronsRight color="var(--text-primary)" size="16" /></button>
                                                <button type="button" className="btn" onClick={this.updateTaskToSelfCommit}><UserCheck color="var(--text-primary)" size="16" /></button>
                                                <button type="button" className="btn" onClick={this.updateTaskToSelfDelete}><UserX color="var(--text-primary)" size="16" /></button>
                                            </div>
                                            <div className="btn-group btn-group-sm shadow-sm bg-white" role="group" >
                                                <button type="button" className="btn"><NavLink to="/app/operations/task" exact="true"><Plus color="var(--text-primary)" size="16" /></NavLink></button>
                                                <button type="button" className="btn" onClick={this.initialize}><RotateCw color="var(--text-primary)" size="16" /></button>
                                                <button className="btn" type="button" id="tskview_btn_attachment" onClick={() => this.toggleEditPopup("tskview_btn_attachment")}><Paperclip color="var(--text-primary)" size="14" /></button>
                                                <button className="btn btn-primary btn-sm tskview-edit-button" type="button" id="tskview_btn_edit" onClick={() => this.toggleEditPopup("tskview_btn_edit")}><Edit2 size="15" /> Edit</button>
                                            </div>
                                        </div>
                                        <h4 className='mt-3 mb-3'>{this.state.taskData["TaskId"]} | {this.state.taskData["Title"]}</h4>
                                    
                                    <p className='mt-3'>
                                        {this.state.taskData["Description"]}
                                    </p>
                                </div>
                                <div className='row tskview-activity-pane'>
                                    <h6 className='mt-3 mb-3'>Activity: </h6>

                                    <div className='row ms-2 ps-0'>
                                        <textarea className="form-control" id="tskview_inp_comment" rows="3" placeholder='Enter new comment'></textarea>
                                    </div>
                                    <div className='row'>
                                        <button className='btn btn-primary ms-3 tskview-form-button' onClick={this.updateComment}>Add</button>
                                    </div>

                                    <ul className='list-group tskview-activity-list'>
                                        {arrActivity}
                                    </ul>
                                </div>
                            </div>
                            <div className='col-4 tskview-details-pane m-0 ps-3 pt-5 pe-3 pb-5'>
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>ID : &nbsp;</b> {this.state.taskData["TaskId"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Project : &nbsp;</b> {this.state.taskData["Project"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Sprint : &nbsp;</b> {this.state.taskData["SprintName"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Sprint Due Date : &nbsp;</b> {this.state.taskData["EndDate"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Module : &nbsp;</b> {this.state.taskData["Module"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Type : &nbsp;</b> {this.state.taskData["Type"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Priority : &nbsp;</b> {this.state.taskData["Priority"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Task Assigner : &nbsp;</b> {this.state.taskData["AssignerName"]}
                                    </li>
                                    <li className='list-group-item tskview-details-list-group-item'>
                                        <b>Task Owner : &nbsp;</b> {this.state.taskData["OwnerName"]}
                                    </li>
                                </ul>
                                <hr></hr>
                                <div className='row ps-4'>
                                    Attachments :
                                </div>
                                <ul className='list-group list-group-flush'>
                                    {arrAttachments}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {editPanel}

                    <PopupNotification ref={this.popupRef}/>

                </div>
            )
        }
    }
}

export default TaskView