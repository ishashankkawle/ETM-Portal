import React, { Component } from "react";
import { Calendar, Edit2, Info, Lock, Mail, Phone } from "react-feather";
import  './user.css'
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import { getLoader } from "../../loader/loader";
import { getSelectOptionsList } from "../../../core/util";
import PopupNotification from "../../popup/popup";

class User extends Component 
{
    constructor(props) {
        super(props);
        this.popupRef = React.createRef();
        this.state = {
            isLoading: false,
            roleData: []
        }

        this.createNewUser = this.createNewUser.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        let http = new HttpHandler();
        let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/role/small?userroleid=" + res["STR_ROLEID"]);
        this.setState({ isLoading: false, roleData: arrData });
    }

    createNewUser = async (e) => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Creating new user ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();
        let name =  document.getElementById("opr_user_inp_name").value;
        let contact =  document.getElementById("opr_user_inp_contact").value;
        let dob =  document.getElementById("opr_user_inp_dob").value;
        let email =  document.getElementById("opr_user_inp_email").value;
        let password = document.getElementById("opr_user_inp_password").value;
        let securityLevel = document.getElementById("opr_user_sel_role").value;
        let projectId = res["DEFAULTS"]["STR_PROJECT_ID"]
    
        let body = {
            "name": name,
            "contact": contact,
            "dob": dob,
            "email": email,
            "username": email,
            "password": password,
            "securityLevel": securityLevel,
            "projectId": projectId
          }

        const http = new HttpHandler();
        await http.httpPost(res["STR_API_BASEPATH"] + "/api/user" , body);
        this.popupRef.current.togglePopupNotificationDisplay("Successfully created user" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    render() {

        let roleOption = getSelectOptionsList(this.state.roleData , "SecurityLevel" , "RoleName" , true , "Select Role")

        if(this.state.isLoading)
        {
            return getLoader()
        }
        else
        {
            return (
        
                <div className="row p-1 h-100">
    
                    <div className="col-md-5">
                        <div className="card shadow-sm mt-2 mb-2">
                            <div className="p-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">New User</h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt"><Edit2 color="var(--text-primary)" size="16" /></span>
                                            <input type="text" className="form-control" placeholder="Full Name" id="opr_user_inp_name"/>
                                        </div>
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt"><Mail color="var(--text-primary)" size="16" /></span>
                                            <input type="email" className="form-control" placeholder="Email" id="opr_user_inp_email"/>
                                        </div>
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt"><Lock color="var(--text-primary)" size="16" /></span>
                                            <input type="password" className="form-control" placeholder="Password" id="opr_user_inp_password"/>
                                        </div>
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt"><Phone color="var(--text-primary)" size="16" /></span>
                                            <input type="text" className="form-control" placeholder="Contact" id="opr_user_inp_contact"/>
                                        </div>
                                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                            <span className="input-group-text op-usr-inp-grp-txt"><Calendar color="var(--text-primary)" size="16" /></span>
                                            <input type="date" className="form-control" placeholder="Date of Birth" id="opr_user_inp_dob"/>
                                        </div>
                                        
                                        <select className="form-select mt-3 mb-3" id="opr_user_sel_role">
                                            {roleOption}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary mb-2" onClick={this.createNewUser}>Send</button>
                                    <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> Whenever new user is created, it will be part of default project </p>   
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

export default User;