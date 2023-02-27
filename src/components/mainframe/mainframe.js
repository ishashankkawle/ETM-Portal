import React , { Component } from "react";
import Dashboard from "../dashboard/dashboard";
import TaskBoard from "../taskboard/taskboard";
import './mainframe.css'
import { Route, Routes } from "react-router-dom";
import Verification from "../verification/verification";
import Project from "../operations/project/project";
import Task from "../operations/task/task";
import UserManagement from "../operations/usermanagement/usermanagement";
import User from "../operations/user/user";
import Assets from "../operations/assets/assets";
import Insights from "../operations/insights/insights";
import Role from "../operations/role/role";
import Security from "../operations/security/security";
import UserDelete from "../operations/userdelete/userdelete";


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
                <Routes>
                    <Route exact path="/" element={ <Dashboard />} />
                    <Route exact path="/taskboard" element={ <TaskBoard />} />
                    <Route exact path="/verification" element={ <Verification />} />
                    <Route exact path="/operations/project" element={ <Project />} />
                    <Route exact path="/operations/task" element={ <Task />} />
                    <Route exact path="/operations/usermanagement" element={ <UserManagement />} />
                    <Route exact path="/operations/user" element={ <User />} />
                    <Route exact path="/operations/assets" element={ <Assets />} />
                    <Route exact path="/operations/insights" element={ <Insights />} />
                    <Route exact path="/operations/role" element={ <Role />} />
                    <Route exact path="/operations/security" element={ <Security />} />
                    <Route exact path="/operations/userdelete" element={ <UserDelete />} />
                </Routes>
            </div>
        );
    }
}
export default MainFrame;