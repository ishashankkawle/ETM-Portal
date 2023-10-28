import React, { Component } from "react";
import { Info } from "react-feather";
import './roleassignment.css'
import { getSelectOptionsList } from "../../../core/util";
import { getLoader } from "../../loader/loader";
import HttpHandler from "../../../core/httpHandler";
import res from "../../../shared/resources";
import PopupNotification from "../../popup/popup";

class RoleAssignment extends Component {
    constructor(props) {
        super(props);
        this.gridRef = "";
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false,
            isProjectSelected: false,
            isUserSelected: false,
            projData: [],
            userData: [],
            isUserFetchComplete: false,
            roleData: [],
            isRoleFetchComplete: false
        }

        this.loadUsersForRoleAssignment = this.loadUsersForRoleAssignment.bind(this);
        this.loadRoleList = this.loadRoleList.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrProjData = await http.httpGet("http://localhost:8081/api/project?userId=" + res["STR_USERID"]);
        this.setState({ isLoading: false, projData: arrProjData });
    }

    loadUsersForRoleAssignment = async () => 
    {
        let obj = {
            isLoading: false,
            userData: [],
            isUserFetchComplete: false,
            roleData: [],
            isRoleFetchComplete: false,
            isProjectSelected:true,
            isUserSelected: false
        }
        this.setState(obj)
        let projectId = document.getElementById("opr_roleassignment_proj_sel").value;
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/user?userId=" + res["STR_USERID"] + "&projectId=" + projectId + "&roleFilter=small");
        this.setState({userData : arrData , isUserFetchComplete : true })
    }

    loadRoleList = async () => {
        this.setState({isUserSelected: true,})
        let userId = document.getElementById("opr_roleassignment_user_sel").value;
        let http = new HttpHandler();
        let arrData = await http.httpGet("http://localhost:8081/api/role/validlist?updaterroleid=" + res["STR_USERID"] + "&userroleid=" + userId);
        this.setState({roleData : arrData , isRoleFetchComplete : true})
    }

    updateRoleAssignment = async(e) =>
    {
        this.popupRef.current.togglePopupNotificationDisplay("Updating role assignment ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated role assignments" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    render()
    {

        if(this.state.isLoading == true)
        {
            return getLoader()
        }
        else
        {

            let projOption = getSelectOptionsList(this.state.projData , "ProjectId" , "ProjectName" , true , "Select Project");
            let userOption = ""
            let roleOption = "" 
            if(this.state.isUserFetchComplete)
            {
                userOption = getSelectOptionsList(this.state.userData , "UserId" , "Name" , true , "Select Resource");
            }
            else
            {
                if(this.state.isProjectSelected)
                {
                    userOption = getSelectOptionsList([] , "UserId" , "Name" , true , "Loading");
                }
                else
                {
                    userOption = getSelectOptionsList([] , "UserId" , "Name" , true , "");
                }
            }
            if(this.state.isRoleFetchComplete)
            {
                roleOption = getSelectOptionsList(this.state.roleData , "RoleId" , "RoleName" , true , "Select Role");
            }
            else
            {
                if(this.state.isProjectSelected && this.state.isUserSelected)
                {
                    roleOption = getSelectOptionsList([] , "RoleId" , "RoleName" , true , "Loading");
                }
                else
                {
                    roleOption = getSelectOptionsList([] , "RoleId" , "RoleName" , true , "");
                }
            }


            return (

                <div className="row p-1 h-100">
    
                    <div className="col-md-5">
                        <div className="card shadow-sm mt-2 mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Role Assignment</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <select className="form-select mb-3" id="opr_roleassignment_proj_sel" onChange={this.loadUsersForRoleAssignment}>
                                            {projOption}
                                        </select>
                                        <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Project filter is just to fine searching the user</p>
                                        <select className="form-select mt-3 mb-3" id="opr_roleassignment_user_sel" onChange={this.loadRoleList}>
                                            {userOption}
                                        </select>
                                        <select className="form-select mt-3 mb-3">
                                            {roleOption}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-2" onClick={this.updateRoleAssignment}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <PopupNotification ref={this.popupRef}/>
                </div>
            )
        }
    }
}

export default RoleAssignment;