import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/navbar/navbar'
import Menubar from './components/menubar/menubar'
import MainFrame from './components/mainframe/mainframe'
import React , { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { menuFlag: true };
  }

  toggleMenu = () => {
    console.log("inside function")
    if (this.state.menuFlag == true) {
      this.setState({ menuFlag: false });
    }
    else {
      this.setState({ menuFlag: true });
    }
    console.log("State : " + this.state.menuFlag)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar toggleMenu={this.toggleMenu} />
          <div className='row mx-0 h-100'>
            <Menubar menuState={this.state.menuFlag} />
            <MainFrame menuState={this.state.menuFlag} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
