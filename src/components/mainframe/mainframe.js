import React , { Component, Suspense } from "react";
import Dashboard from "../dashboard/dashboard";
import TaskBoard from "../taskboard/taskboard";
import './mainframe.css'
import { Outlet, Route, Routes } from "react-router-dom";

import Loader from "../loader/loader";


class MainFrame extends Component {
    render() {
        let finalWidth = "0";
        if (this.props.menuState == true) {
            finalWidth = "84%"
        }
        else {
            finalWidth = "100%"
        }

        return (
            <div className="mainframe-box" style={{ width: finalWidth }}>
                <Outlet/>
            </div>
        );
    }
}
export default MainFrame;