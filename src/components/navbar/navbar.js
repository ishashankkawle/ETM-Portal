import React, { Component } from "react";
import logo from '../../assets/logoDesign.png'
import { HelpCircle, Sun, Search, Moon, ChevronDown, User, Power, MoreHorizontal, CheckSquare } from 'react-feather';
import './navbar.css'
import { NavLink } from "react-router-dom";
import res from "../../shared/resources";

class Navbar extends Component {

    getInitials = () => {
        let arrStr = res["STR_USERNAME"].split(" ")
        let returnValue = ""
        if (arrStr.length == "1") {
            returnValue =  arrStr[0].charAt(0).toUpperCase()
        } else {
            returnValue =  arrStr[0].charAt(0).toUpperCase() + arrStr[arrStr.length - 1].charAt(0).toUpperCase()
        }
        return returnValue;
    }
    render() {

        const initials = this.getInitials();
        const username = res["STR_USERNAME"]
        let themeIcon = null;

        if (this.theme == undefined) {
            themeIcon = <Moon color='var(--text-primary)' size="18" />
        }
        else {
            themeIcon = <Sun color='var(--theme-light)' size="18" />
        }
        return (
            <ul className="nav justify-content-end">
                <li className="nav-item nav-brand-logo p-1 d-flex align-items-center">
                    <div className="text-start d-flex justify-content-between">
                        <div className="px-2 d-flex align-items-center"><img src={logo} className="nav-brand-img me-2" />Laniak</div> 
                        <div onClick={this.props.toggleMenu} className="d-flex align-items-center p-3"><MoreHorizontal size="18"/></div>
                    </div>
                </li>
                <li className="nav-item nav-link p-3">
                    <NavLink className="menu-item"  to="/app/taskboard" exact="true"> <Search color='var(--text-primary)' size="18" /> </NavLink>
                </li>
                <li className="nav-item nav-link p-3 me-auto">
                    <NavLink className="menu-item"  to="/app/verification" exact="true"><CheckSquare color='var(--text-primary)' size="18" /> </NavLink>
                </li>
                <li className="nav-item nav-link p-3">
                    <HelpCircle color='var(--text-primary)' size="18" />
                </li>
                <li className="nav-item nav-link p-3">
                    {themeIcon}
                </li>
                <li className="nav-item nav-link p-2 d-flex align-items-center justify-content-center">
                    <div className="avatar" >{initials}</div>
                </li>
                <li className="nav-item nav-link p-1 d-flex align-items-center justify-content-center">
                    <span className="nav-profile-primary ">{username}</span>
                </li>
                <div className="dropdown p-3">
                    <div className="d-flex align-items-center justify-content-center mt-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <ChevronDown color='var(--text-primary)' size="18" />
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li className="dropdown-item"><User color='var(--text-primary)' size="16" className="mx-2 " /><span className="nav-dropdown-menu-item">Profile</span></li>
                        <li className="dropdown-item"><Power color='red' size="16" className="mx-2 " /><span className="nav-dropdown-menu-item">Logout</span></li>
                    </ul>
                </div>

            </ul>
        )
    }
}

export default Navbar;