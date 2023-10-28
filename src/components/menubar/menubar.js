import React, { Component } from "react";
import { Home, Box, Users, BarChart2, Repeat, Key, Shield, UserMinus, Flag, Lock, Clipboard } from "react-feather";
import { NavLink } from "react-router-dom";
import './menubar.css'
import res from "../../shared/resources";

class Menubar extends Component {
    render() {
        let arrLinks = []
        let arrPermissions = res["USERDATA"]["STR_PERMISSIONS"].split(",")

        for (let index = 0; index < arrPermissions.length; index++) 
        {
            if(arrPermissions[index] == res["PERMISSIONS"]["PROJECT_ACCESS"])
            {
                arrLinks.push(
                    <div key="t1" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/project" exact="true"><Flag size="18" className="me-2" /> Project </NavLink>
                    </div>
                )
                arrLinks.push(
                    <div key="t2" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/assets" exact="true"><Box size="18" className="me-2" /> Assets </NavLink>
                    </div>
                )
            }

            if(arrPermissions[index] == res["PERMISSIONS"]["TASK_ACCESS"])
            {
                arrLinks.push(
                    <div key="t3" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/task" exact="true"><Clipboard size="18" className="me-2" /> Task </NavLink>
                    </div>
                )
            }
            
            if(arrPermissions[index] == res["PERMISSIONS"]["REPPORT_ACCESS"])
            {
                arrLinks.push(
                    <div className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/insights" exact="true"><BarChart2 size="18" className="me-2" /> Insights </NavLink>
                    </div>
                )
            }


            if(arrPermissions[index] == res["PERMISSIONS"]["SECURITY_ACCESS"])
            {
                arrLinks.push(
                    <div key="t6" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/role" exact="true"><Key size="18" className="me-2" /> Role </NavLink>
                    </div>
                )

                arrLinks.push(
                    <div key="t8" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/security" exact="true"><Shield size="18" className="me-2" /> Security </NavLink>
                    </div>
                )
            }

            if(arrPermissions[index] == res["PERMISSIONS"]["USER_ACCESS"])
            {
                arrLinks.push(
                    <div key="t4" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/usermanagement" exact="true"><Repeat size="18" className="me-2" /> User Management </NavLink>
                    </div>
                )

                arrLinks.push(
                    <div key="t5" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/user" exact="true"><Users size="18" className="me-2" /> Users </NavLink>
                    </div>
                )
                
                arrLinks.push(
                    <div key="t7" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/roleassignment" exact="true"><Lock size="18" className="me-2" /> Role Assignment </NavLink>
                    </div>
                )
                
                arrLinks.push(
                    <div key="t9" className="menu-sub-primary">
                        <NavLink className="menu-item"  to="/app/operations/userdelete" exact="true"><UserMinus size="18" className="me-2" /> Delete User </NavLink>
                    </div>
                )
            }
        }

        return (
            <div className="menu-primary text-start p-3 pt-4" style={{ display: this.props.menuState ? 'block' : 'none' }}>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app" exact="true"><Home size="18" className="me-2" /> Dashboard </NavLink>
                </div>
                {/* <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/project" exact="true"><Flag size="18" className="me-2" /> Project </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/task" exact="true"><Clipboard size="18" className="me-2" /> Task </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/usermanagement" exact="true"><Repeat size="18" className="me-2" /> User Management </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/user" exact="true"><Users size="18" className="me-2" /> Users </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/assets" exact="true"><Box size="18" className="me-2" /> Assets </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/insights" exact="true"><BarChart2 size="18" className="me-2" /> Insights </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/role" exact="true"><Key size="18" className="me-2" /> Role </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/roleassignment" exact="true"><Lock size="18" className="me-2" /> Role Assignment </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/security" exact="true"><Shield size="18" className="me-2" /> Security </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/app/operations/userdelete" exact="true"><UserMinus size="18" className="me-2" /> Delete User </NavLink>
                </div> */}
                {arrLinks}
            </div>
        )
    }
}

export default Menubar;