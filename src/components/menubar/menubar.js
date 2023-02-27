import React, { Component } from "react";
import { Home, Box, Users, Package, PieChart, Activity, BarChart2, Repeat, Key, Shield, UserMinus, Flag } from "react-feather";
import { NavLink } from "react-router-dom";
import './menubar.css'

class Menubar extends Component {
    render() {

        return (
            <div className="menu-primary text-start p-3 pt-4" style={{ display: this.props.menuState ? 'block' : 'none' }}>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/" exact="true"><Home size="18" className="me-2" /> Dashboard </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/project" exact="true"><Flag size="18" className="me-2" /> Project </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/task" exact="true"><Package size="18" className="me-2" /> Task </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/usermanagement" exact="true"><Repeat size="18" className="me-2" /> User Management </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/user" exact="true"><Users size="18" className="me-2" /> Users </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/assets" exact="true"><Box size="18" className="me-2" /> Assets </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/insights" exact="true"><BarChart2 size="18" className="me-2" /> Insights </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/role" exact="true"><Key size="18" className="me-2" /> Role </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/security" exact="true"><Shield size="18" className="me-2" /> Security </NavLink>
                </div>
                <div className="menu-sub-primary">
                    <NavLink className="menu-item"  to="/operations/userdelete" exact="true"><UserMinus size="18" className="me-2" /> Delete User </NavLink>
                </div>
            </div>
        )
    }
}

export default Menubar;