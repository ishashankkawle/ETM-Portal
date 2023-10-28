import React, { Component } from "react";
import { Info, LogIn, LogOut } from "react-feather";
import './usermanagement.css'
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import { getLoader } from "../../loader/loader";
import { getSelectOptionsList } from "../../../core/util";

class UserManagement extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userProjectData: [],
            userOtherProjectData: [],
            isOtherProjectFetch: false,
            userDeAssignData: [],
            ifUserFetchForDeAssign : false,
            userAssignData: [],
            ifUserFetchForAssign: false,
            isProjSelectedForUserDeAssignment : false,
            isProjSelectedForUserAssignment : false,
            isUserSelected: false
        }

        this.loadUserForAssign = this.loadUserForAssign.bind(this)
        this.loadUserForDeAssign = this.loadUserForDeAssign.bind(this)
        this.loadOtherProjects = this.loadOtherProjects.bind(this)
        this.updateUserAssignment = this.updateUserAssignment.bind(this)
        this.updateUserDeAssignment = this.updateUserDeAssignment.bind(this)
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/project?userId=" + res["STR_USERID"]);
        this.setState({ isLoading: false, userProjectData: arrData });
    }

    loadOtherProjects = async() =>
    {
        let obj = {
            userOtherProjectData: [],
            isUserSelected : true,
            isOtherProjectFetch : false      
        }
        this.setState(obj)
        let userId = document.getElementById("opr_assign_user_sel").value
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/project?userId=" + userId + "&notmapped=true");
        this.setState({ isOtherProjectFetch: true, userOtherProjectData: arrData });
    }

    loadUserForDeAssign = async() => 
    {
        let obj = {
            userDeAssignData: [],
            ifUserFetchForDeAssign : false,            
            isProjSelectedForUserDeAssignment : true,
            
        }
        this.setState(obj)
        let projId = document.getElementById("opr_deassign_proj_sel").value
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/user?userId=" + res["STR_USERID"] + "&projectId=" + projId + "&roleFilter=small&projectFilter=same");
        this.setState({ ifUserFetchForDeAssign: true, userDeAssignData: arrData });
    }

    loadUserForAssign = async() => 
    {
        let obj = {
            userAssignData: [],
            ifUserFetchForAssign : false,            
            isProjSelectedForUserAssignment : true,
            userOtherProjectData: [],
            isOtherProjectFetch: false,
            isUserSelected: false
        }
        this.setState(obj)
        let projId = document.getElementById("opr_assign_proj_sel").value
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/user?userId=" + res["STR_USERID"] + "&projectId=" + projId + "&roleFilter=small&projectFilter=same");
        this.setState({ ifUserFetchForAssign: true, userAssignData: arrData });
    }

    updateUserAssignment = async(e) => {
        e.preventDefault();
        let body = {
            "userId": document.getElementById("opr_assign_user_sel").value,
            "projectId": document.getElementById("opr_assign_sel_othproject").value
          }
        const http = new HttpHandler();
        await http.httpPost("http://localhost:8081/api/userprojectmap" , body);
    }

    updateUserDeAssignment = async(e) => {
        e.preventDefault();
        let body = {
            "userId": document.getElementById("opr_deassign_sel_user").value,
            "projectId": document.getElementById("opr_deassign_proj_sel").value
          }
        const http = new HttpHandler();
        await http.httpDelete("http://localhost:8081/api/userprojectmap" , body);
    }

    render() 
    {
        let projOption = getSelectOptionsList(this.state.userProjectData , "ProjectId" , "ProjectName" , true , "Select Project")
        let userDeAssignOption = []
        let userAssignOption = []
        let otherProjectOption = []
        if(this.state.isProjSelectedForUserDeAssignment)
        {
            if(this.state.ifUserFetchForDeAssign)
            {
                userDeAssignOption = getSelectOptionsList(this.state.userDeAssignData , "UserId" , "Name" , true , "Select User");
            }
            else
            {
                userDeAssignOption = getSelectOptionsList(this.state.userDeAssignData , "UserId" , "Name" , true , "Loading");
            }
        }
        else
        {
            userDeAssignOption = getSelectOptionsList([] , "UserId" , "Name" , true , "");
        }

        if(this.state.isProjSelectedForUserAssignment)
        {
            if(this.state.ifUserFetchForAssign)
            {
                userAssignOption = getSelectOptionsList(this.state.userAssignData , "UserId" , "Name" , true , "Select User");
            }
            else
            {
                userAssignOption = getSelectOptionsList(this.state.userAssignData , "UserId" , "Name" , true , "Loading");
            }
        }
        else
        {
            userAssignOption = getSelectOptionsList([] , "UserId" , "Name" , true , "");
        }

        if(this.state.isUserSelected)
        {
            if(this.state.isOtherProjectFetch)
            {
                otherProjectOption = getSelectOptionsList(this.state.userOtherProjectData , "ProjectId" , "ProjectName" , true , "Select Project")
            }
            else
            {
                otherProjectOption = getSelectOptionsList(this.state.userOtherProjectData , "ProjectId" , "ProjectName" , true , "Loading")
            }
        }
        else
        {
            otherProjectOption = getSelectOptionsList([], "ProjectId" , "ProjectName" , true , "")
        }

        if(this.state.isLoading)
        {
            return getLoader()
        }
        else
        {
            return (

                <div className="row p-1 h-100">

                    <div className="col-md-12">
                        <div className="card shadow-sm mt-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">User Assignment</h5>
                            </div>
                            <div className="card-body row">
                                <div className="col-5">
                                    <form>
                                        <div className="mb-3">
                                            <select className="form-select mt-3 mb-3" id="opr_assign_proj_sel" onChange={this.loadUserForAssign}>
                                                {projOption}
                                            </select>
                                            <select className="form-select mt-3 mb-3" id="opr_assign_user_sel" onChange={this.loadOtherProjects}>
                                                {userAssignOption}
                                            </select>
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className="col-2 d-flex align-items-center justify-content-center">
                                    <LogIn  size="25"/>
                                </div>
                                <div className="col-5">
                                    <form>
                                        <div className="mb-3">
                                            <select className="form-select mt-3 mb-3" id="opr_assign_sel_othproject">
                                                {otherProjectOption}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="btn btn-primary" onClick={this.updateUserAssignment}>Update User Assignment</button>
                                </div>
                                
                                <div className="col-md-12 mt-2">
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> User Assignment is one way process. If you want to assign user from Other Project to your Project, please contact respective Project Manager to assign perticular user to your project </p>   
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="card shadow-sm mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">User De-Assignment</h5>
                            </div>
                            <div className="card-body row">
                                <div className="col-5">
                                    <form>
                                        <div className="mb-3">
                                            <select className="form-select mt-3 mb-3" id="opr_deassign_proj_sel" onChange={this.loadUserForDeAssign}>
                                                {projOption}
                                            </select>
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className="col-2 d-flex align-items-center justify-content-center">
                                    <LogOut  size="25"/>
                                </div>
                                <div className="col-5">
                                    <form>
                                        <div className="mb-3">
                                            <select className="form-select mt-3 mb-3" id="opr_deassign_sel_user">
                                                {userDeAssignOption}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="btn btn-danger" onClick={this.updateUserDeAssignment}>Update User Assignment</button>
                                </div>
                                
                                <div className="col-md-12 mt-2">
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> You can remove assignments between only those employees which belong to any of projects and your Projects </p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default UserManagement;