import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login-art.jpg'
import { Info, Loader, LogIn, Shield, XCircle } from 'react-feather';
import res from '../../shared/resources';
import HttpHandler from '../../core/httpHandler';


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authCompleted : ""
    }
  }

  // componentDidMount()
  // {
  //   console.log("called component did mount. State = " + JSON.stringify(this.state))
  //   if(this.state.authCompleted != "")
  //   {
  //     this.setState({authCompleted : "false"})
  //   }
  // }

  authenticate = async(e) =>
  {
    this.setState({authCompleted : "running"})
    e.preventDefault();
    let body = {
        "username": document.getElementById("login_inp_email").value,
        "password": document.getElementById("login_inp_password").value,
    };
    const http = new HttpHandler();
    let data = await http.httpPost(res["STR_API_BASEPATH"] + "/api/auth" , body);
    if (data.auth == "failed") 
    {
      this.setState({authCompleted : "false"})
    } 
    else 
    {
      console.log(data)
      res["USERDATA"]["STR_USERID"] = data.UserId
      res["USERDATA"]["STR_NAME"] = data.Name
      res["USERDATA"]["STR_SECURITY_LEVEL"] = data.SecurityLevel
      res["USERDATA"]["STR_ROLENAME"] = data.RoleName
      res["USERDATA"]["STR_ROLEID"] = data.RoleId
      res["USERDATA"]["STR_PERMISSIONS"] = data.Permissions.split(",")
      res["USERDATA"]["STR_EMAIL"] = data.Email
      res["USERDATA"]["STR_CONTACT"] = data.Contact
      res["USERDATA"]["STR_DOB"] = data.DOB
      res["USERDATA"]["STR_USERNAME"] = data.UserName
      res["USERDATA"]["STR_USER_AUTH_COMPLETED"] = "true"
      
      localStorage.setItem("USERDATA" , res["USERDATA"])
      
      //---------------------------
      //TEMP - START
      //---------------------------
      // res["USERDATA"]["STR_USERID"] = data.UserId
      // res["USERDATA"]["STR_USERNAME"] = data.UserName
      // res["USERDATA"]["STR_SECURITY_LEVEL"] = data.SecurityLevel
      // res["USERDATA"]["STR_ROLENAME"] = data.RoleName
      // res["USERDATA"]["STR_ROLEID"] = data.RoleId
      //---------------------------
      //TEMP - COMPLETE 
      //---------------------------

      this.setState({authCompleted : "true"})
    }
  }

  render() {

    let displayMsg = ""

    if(this.state.authCompleted == "running")
    {
      displayMsg = <p className='text-secondary m-0 ps-3'><small><Loader className="notif-icon rounded me-2 text-success" color='blue' strokeWidth="3" />Authenticating ... </small></p>
    }
    if(this.state.authCompleted == "false")
    {
      displayMsg = <p className='text-danger m-0 ps-3'><small><XCircle className="notif-icon rounded me-2 text-danger" color='red' strokeWidth="3" />Incorrect Username or Password</small></p>
    }

    if(this.state.authCompleted == "true")
    {
      return (<Navigate to="/app" replace={true} />)
    }
    else
    {
      return (
        <div className='w-100 h-100'>
          <div className='row h-100'>
            <div className='col-6 ps-4 pe-0 h-100 d-flex'>
              <img src={loginImage} className='login-form-image ms-auto' />
            </div>
            <div className='col-6 pe-4 ps-1 h-100 d-flex'>
              <div className='login-form-box'>
                <div className="card">
                  <div className="p-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Log In</h5>
                  </div>
                  {displayMsg}
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                          <input type="email" className="form-control login-frm-ctrl" placeholder="Email" id="login_inp_email" />
                        </div>
                        <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                          <input type="password" className="form-control login-frm-ctrl" placeholder="Password" id="login_inp_password" />
                        </div>
                      </div>
                      {/* <NavLink className="menu-item"  to="/app" exact="true"> */}
                        <button type="button" className="menu-item btn btn-primary mb-2" onClick={this.authenticate}> <LogIn size="16"/> &nbsp; Log In</button>
                      {/* </NavLink> */}
                      <p style={{ fontSize: 'smaller', color: 'var(--text-secondary)' }}><Info color="var(--text-warning-cust)" size="16" /> If you don't have an account, please ask administrators to create an account for you.</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
  }
}

export default Login;
