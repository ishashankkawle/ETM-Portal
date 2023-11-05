import React, { Component } from 'react';
import './landing.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../navbar/navbar'
import Menubar from '../menubar/menubar'
import MainFrame from '../mainframe/mainframe'
import NoAccess from '../no-access/no-access'
import HttpHandler from '../../core/httpHandler';
import res from '../../shared/resources';
import { getFullScreenLoader } from '../loader/loader';



class Landing extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuFlag: true,
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    let http = new HttpHandler();
    let arrData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/user/" + res["STR_USERID"]);
    res["USERDATA"]["STR_CONTACT"] = arrData[0]["Contact"]
    res["USERDATA"]["STR_DOB"] = arrData[0]["DOB"]
    res["USERDATA"]["STR_EMAIL"] = arrData[0]["Email"]
    res["USERDATA"]["STR_NAME"] = arrData[0]["Name"]
    res["USERDATA"]["STR_PERMISSIONS"] = arrData[0]["Permissions"]
    res["USERDATA"]["STR_ROLEID"] = arrData[0]["RoleId"]
    res["USERDATA"]["STR_ROLENAME"] = arrData[0]["RoleName"]
    res["USERDATA"]["STR_SECURITY_LEVEL"] = arrData[0]["SecurityLevel"]
    res["USERDATA"]["STR_USERID"] = arrData[0]["UserId"]
    this.setState({ isLoading: false });
  }

  toggleMenu = () => {
    if (this.state.menuFlag == true) {
      this.setState({ menuFlag: false });
    }
    else {
      this.setState({ menuFlag: true });
    }
  }

  render() {

    if (this.state.isLoading) {
      return getFullScreenLoader("Fetching user data")
    }
    else {
      if (res["USERDATA"]["STR_PERMISSIONS"] === res["PERMISSIONS"]["NO_ACCESS"]) 
      {
        return (<NoAccess />)
      }
      else {
        return (
          <div className="App">
            <Navbar toggleMenu={this.toggleMenu} />
            <div className='row mx-0 h-100'>
              <Menubar menuState={this.state.menuFlag} />
              <MainFrame menuState={this.state.menuFlag} />
            </div>
          </div>
        )
      }
    }
  }
}

export default Landing;
