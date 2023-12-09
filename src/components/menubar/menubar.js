import React, { Component } from "react";
import { Home, Box, Users, BarChart2, Repeat, Key, Shield, UserMinus, Flag, Lock, Clipboard, Clock } from "react-feather";
import { NavLink } from "react-router-dom";
import './menubar.css'
import res from "../../shared/resources";

class Menubar extends Component {
    render() {
        let arrLinks = []
        let arrPermissions = res["USERDATA"]["STR_PERMISSIONS"]

        for (let index = 0; index < arrPermissions.length; index++) 
        {

            if(arrPermissions[index] == res["PERMISSIONS"]["TASK_ACCESS"])
            {
                arrLinks.push(
                    <div key="1" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app" exact="true"><Home size="18" className="me-2" /> <span className="menu-sub-tab"> Dashboard </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="2" className="menu-sub-primary">
                        <NavLink className="menu-item" to="/app/operations/task" exact="true"><Clipboard size="18" className="me-2" /> <span className="menu-sub-tab"> Task </span></NavLink>
                    </div>
                )  
            }

            if(arrPermissions[index] == res["PERMISSIONS"]["PROJECT_ACCESS"])
            {
                arrLinks.push(
                    <div key="3" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/project" exact="true"><Flag size="18" className="me-2" /> <span className="menu-sub-tab"> Project </span> </NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="4" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/assets" exact="true"><Box size="18" className="me-2" /> <span className="menu-sub-tab"> Assets </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="5" className="menu-sub-primary">
                        <NavLink className="menu-item" to="/app/operations/sprint" exact="true"><Clock size="18" className="me-2" /> <span className="menu-sub-tab"> Sprint </span></NavLink>
                    </div>
                )
            }

            if(arrPermissions[index] == res["PERMISSIONS"]["USER_ACCESS"])
            {
                
                arrLinks.push(
                    <div key="6" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/user" exact="true"><Users size="18" className="me-2" /> <span className="menu-sub-tab"> Users </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="7" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/usermanagement" exact="true"><Repeat size="18" className="me-2" /> <span className="menu-sub-tab"> User Management </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="8" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/roleassignment" exact="true"><Lock size="18" className="me-2" /> <span className="menu-sub-tab"> Role Assignment </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="9" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/userdelete" exact="true"><UserMinus size="18" className="me-2" /> <span className="menu-sub-tab"> Delete User </span></NavLink>
                    </div>
                )
            }
            
            if(arrPermissions[index] == res["PERMISSIONS"]["REPPORT_ACCESS"])
            {
                arrLinks.push(
                    <div key="10" className="menu-sub-primary">
                        <NavLink className="menu-item" key="4" to="/app/operations/insights" exact="true"><BarChart2 size="18" className="me-2" /> <span className="menu-sub-tab"> Insights </span></NavLink>
                    </div>
                )
            }


            if(arrPermissions[index] == res["PERMISSIONS"]["SECURITY_ACCESS"])
            {
                arrLinks.push(
                    <div key="11" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/role" exact="true"><Key size="18" className="me-2" /> <span className="menu-sub-tab"> Role </span></NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="12" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/security" exact="true"><Shield size="18" className="me-2" /> <span className="menu-sub-tab"> Security </span></NavLink>
                    </div>
                )
            }

            
        }

        arrLinks.sort((a, b) => (a.key) - (b.key));

        return (
            <div className="menu-primary text-start p-3 pt-4" style={{ display: this.props.menuState ? 'block' : 'none' }}>
                {arrLinks}
            </div>
        )
    }
}

export default Menubar;