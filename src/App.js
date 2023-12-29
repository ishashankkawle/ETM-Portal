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
import TaskView from './components/taskview/taskview';
import InsProject from './components/reports/ins_project/InsProject';
import InsTask from './components/reports/ins_task/InsTask';
import ProtectedRoutes from './components/protected-routes/protected-routes';
import res from './shared/resources';
import Sprint from './components/operations/sprint/sprint';




class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {    

    console.log("Inside App , auth value = " + res["USERDATA"]["STR_USER_AUTH_COMPLETED"])
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/ETM-Portal" element={<Login />} />
          <Route exact path="/app" element={ <ProtectedRoutes route=<Landing /> />}>
            <Route index element={<ProtectedRoutes route=<Dashboard /> />} /> 
            <Route path="taskboard" element={ <ProtectedRoutes route=<TaskBoard /> />} /> 
            <Route path="verification" element={<ProtectedRoutes route=<Verification /> />} /> 
            <Route path="operations/project" element={<ProtectedRoutes route=<Project /> />} /> 
            <Route path="operations/task" element={<ProtectedRoutes route=<Task /> />} /> 
            <Route path="operations/usermanagement" element={<ProtectedRoutes route=<UserManagement /> />} />
            <Route path="operations/user" element={<ProtectedRoutes route=<User /> />} />
            <Route path="operations/assets" element={<ProtectedRoutes route=<Assets /> />} /> 
            <Route path="operations/insights" element={<ProtectedRoutes route= <Insights /> />} /> 
            <Route path="operations/role" element={<ProtectedRoutes route=<Role /> />} />
            <Route path="operations/roleassignment" element={<ProtectedRoutes route=<RoleAssignment /> />} />
            <Route path="operations/security" element={<ProtectedRoutes route=<Security /> />} />
            <Route path="operations/userdelete" element={<ProtectedRoutes route=<UserDelete /> />} />
            <Route path="operations/sprint" element={<ProtectedRoutes route=<Sprint /> />} />
            <Route path="insight/project" element={<ProtectedRoutes route=<InsProject /> />} /> 
            <Route path="insight/task" element={<ProtectedRoutes route=<InsTask /> />} /> 
          </Route>
          <Route path="/taskview/:id" element={<TaskView />} /> 
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
