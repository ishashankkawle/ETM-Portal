import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/landing';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import TaskBoard from './components/taskboard/taskboard';
import Verification from './components/verification/verification';
import Project from './components/operations/project/project';
import Task from './components/operations/task/task';
import UserManagement from './components/operations/usermanagement/usermanagement';
import User from './components/operations/user/user';
import Assets from './components/operations/assets/assets';
import Insights from './components/operations/insights/insights';
import Role from './components/operations/role/role';
import RoleAssignment from './components/operations/roleassignment/roleassignment';
import Security from './components/operations/security/security';
import UserDelete from './components/operations/userdelete/userdelete';
import NoAccess from './components/no-access/no-access';
import TaskView from './components/taskview/taskview';
import InsProject from './components/reports/ins_project/InsProject';
import InsTask from './components/reports/ins_task/InsTask';




class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/app" element={<Landing />}>
            <Route index element={<Dashboard />} />
            <Route path="taskboard" element={<TaskBoard />} />
            <Route path="verification" element={<Verification />} />
            <Route path="operations/project" element={<Project />} />
            <Route path="operations/task" element={<Task />} />
            <Route path="operations/usermanagement" element={<UserManagement />} />
            <Route path="operations/user" element={<User />} />
            <Route path="operations/assets" element={<Assets />} />
            <Route path="operations/insights" element={<Insights />} />
            <Route path="operations/role" element={<Role />} />
            <Route path="operations/roleassignment" element={<RoleAssignment />} />
            <Route path="operations/security" element={<Security />} />
            <Route path="operations/userdelete" element={<UserDelete />} />
            <Route path="insight/project" element={<InsProject />} />
            <Route path="insight/task" element={<InsTask />} />
          </Route>
          <Route path="/taskview/:id" element={<TaskView />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
