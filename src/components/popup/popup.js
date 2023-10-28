import { Component } from 'react';
import './popup.css';
import { sleep } from '../../core/util';
import { AlertCircle, CheckCircle, Loader, XCircle } from 'react-feather';
import res from "../../shared/resources";

class PopupNotification extends Component 
{

  constructor(props)
  {
    super(props);
    this.state = {
      isPopupDisplayOn : undefined,
      msg : "",
      type: ""
    }
  }

  togglePopupNotificationDisplay = async(message = "" , iconType = "" , timeout) =>
  {
    if(message != "" && message != undefined && message != null)
    {
      this.setState({isPopupDisplayOn : true , msg: message , type: iconType} , )
      this.togglePopupNotificationDisplay("" , "" , timeout)
    }
    else
    {
      await sleep(timeout)
      this.setState({isPopupDisplayOn : false })
    }
  } 
  
  handleClose = async () => {
      this.setState({isPopupDisplayOn : false })
  }

  render() 
  {
    if(this.state.isPopupDisplayOn)
    {

      let popIcon = ""

      if(this.state.type == res["POPUP_NOTIFICATION_MAP"]["type"]["ERROR"])
      {
        popIcon = <XCircle className="notif-icon rounded me-2 text-success" color='red' strokeWidth="3" />
      }
      else if(this.state.type == res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"])
      {
        popIcon = <CheckCircle className="notif-icon rounded me-2 text-success" color='green' strokeWidth="3" />
      }
      else if(this.state.type == res["POPUP_NOTIFICATION_MAP"]["type"]["WARNING"])
      {
        popIcon = <AlertCircle className="notif-icon rounded me-2 text-success" color='yellow' strokeWidth="3" />
      }
      else if(this.state.type == res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"])
      {
        popIcon = <Loader className="notif-icon rounded me-2 text-success" color='blue' strokeWidth="3" />
      }


      return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              {popIcon}
              <b className="me-auto">{this.state.msg}</b>
              <button onClick={this.handleClose} type="button btn-sm" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </div>
      )
    }
    else
    {
      return null;
    }
  }
    
}

export default PopupNotification;