import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import loginImage from '../../assets/login-art.jpg'
import { Info, LogIn } from 'react-feather';


class Login extends Component {

  constructor(props) {
    super(props)
  }

  render() {
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
                    <NavLink className="menu-item"  to="/app" exact="true">
                      <button type="button" className="btn btn-primary mb-2"> <LogIn size="16"/> &nbsp; Log In</button>
                    </NavLink>
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

export default Login;
