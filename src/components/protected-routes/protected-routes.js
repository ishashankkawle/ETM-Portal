import { Component } from "react";
import res from "../../shared/resources";
import { Navigate } from "react-router-dom";
import NoAccess from "../no-access/no-access";
import { checkExist } from "../../core/util";

class ProtectedRoutes extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        this.route = this.props.route

        if(res["USERDATA"]["STR_USER_AUTH_COMPLETED"])
        {
            if (res["USERDATA"]["STR_PERMISSIONS"][0] === res["PERMISSIONS"]["NO_ACCESS"]) 
            {
                return (<NoAccess />)
            }
            else
            {
                let currentView = this.route.type.name
                let currentViewPermissions = res["VIEW_PERM_MAP"][currentView]
                let routingAllowed = true
                for (let index = 0; index < currentViewPermissions.length; index++) 
                {
                    if(!checkExist(res["USERDATA"]["STR_PERMISSIONS"] , currentViewPermissions[index]))
                    {
                        routingAllowed = false;
                    }
                }
                if (routingAllowed) 
                {
                    return this.route    
                }
                else
                {
                    return (<NoAccess />)
                }
            }
        }
        else
        {
            return <Navigate to="/" replace={true}/>
        }
    }
}

export default ProtectedRoutes