import React, { Component } from "react";
import './security.css'
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import { getLoader } from "../../loader/loader";
import { getSelectOptionsList } from "../../../core/util";
import PopupNotification from "../../popup/popup";

class Security extends Component {

    constructor(props) {
        super(props);
        this.gridRef = "";
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false,
            roleData: []
        }

        this.updateRoleSecurity = this.updateRoleSecurity.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/role");
        this.setState({ isLoading: false, roleData: arrData });
    }

    updateRoleSecurity = async(e) =>
    {
        this.popupRef.current.togglePopupNotificationDisplay("Updating security ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();

        let permissions = []
        if(document.getElementById("opr_security_chk_project_access").checked)
        {
            permissions.push(res["PERMISSIONS"]["PROJECT_ACCESS"])
        }
        if(document.getElementById("opr_security_chk_task_access").checked)
        {
            permissions.push(res["PERMISSIONS"]["TASK_ACCESS"])
        }
        if(document.getElementById("opr_security_chk_user_access").checked)
        {
            permissions.push(res["PERMISSIONS"]["USER_ACCESS"])
        }
        if(document.getElementById("opr_security_chk_report_access").checked)
        {
            permissions.push(res["PERMISSIONS"]["REPPORT_ACCESS"])
        }
        if(document.getElementById("opr_security_chk_security_access").checked)
        {
            permissions.push(res["PERMISSIONS"]["SECURITY_ACCESS"])
        }
        if(permissions.length == 0)
        {
            permissions.push(res["PERMISSIONS"]["NO_ACCESS"])
        }

        let body = {
            "roleId": document.getElementById("opr_security_sel_role").value,
            "field": "Permissions",
            "fieldValue": permissions
          };
        const http = new HttpHandler();
        try {
            await http.httpPut(res["STR_API_BASEPATH"] + "/api/role" , body);
        } catch (error) {
            
        }
        this.popupRef.current.togglePopupNotificationDisplay("Successfully updated security" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    render() {

        let roleOption = getSelectOptionsList(this.state.roleData, "RoleId", "RoleName", true, "Select Role")

        if (this.state.isLoading) {
            return getLoader()
        }
        else 
        {

            return (

                <div className="row p-1 h-100">

                    <div className="col-md-5">
                        <div className="card shadow-sm mt-2 mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Role Security Permissions</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <select className="form-select mb-3" id="opr_security_sel_role">
                                            {roleOption}
                                        </select>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="opr_security_chk_project_access" value="PERM_ALL_PROJECT" />
                                            <label className="form-check-label">Can create new project and its assets</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="opr_security_chk_task_access" value="PERM_ALL_TASK" />
                                            <label className="form-check-label">Can create new Tasks in project</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="opr_security_chk_user_access" value="PERM_ALL_USER" />
                                            <label className="form-check-label">Can manage User Accounts , User Allocations & User-Role management</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="opr_security_chk_report_access" value="PERM_ALL_REPORT" />
                                            <label className="form-check-label">Can view Reports and Insights</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" role="switch" id="opr_security_chk_security_access" value="PERM_ALL_ORG_SECURITY" />
                                            <label className="form-check-label">Can create new Roles and Manage Role Security permissions</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-2" onClick={this.updateRoleSecurity}>Send</button>
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

export default Security;