import React, { Component } from "react";
import './insights.css'
import { Anchor } from "react-feather";
import { NavLink } from "react-router-dom";

class Insights extends Component {

    render() {
        return (
            <div className="insight-card-block p-0" style={{ background: '#fff' }}>
                <div className="insight-card-block">
                    <h6 className="text-start" style={{ color: 'var(--text-primary)', fontSize: 'smaller' , marginBottom: '0' }}>Reports</h6>
                </div>
                <ul className="list-group">
                    <li className="text-start list-group-item"><NavLink className="insight-list-group-item" to="/app/insight/project"> <Anchor className="mb-1 me-2" size="18"/> Project Overview </NavLink></li> 
                    <li className="text-start list-group-item"><NavLink className="insight-list-group-item" to="/app/insight/task"> <Anchor className="mb-1 me-2" size="18"/> Task Overview </NavLink></li>
                    <li className="text-start list-group-item"><NavLink className="insight-list-group-item" to="/app/insight/user"> <Anchor className="mb-1 me-2" size="18"/> User Overview </NavLink></li>
                    <li className="text-start list-group-item"><NavLink className="insight-list-group-item" to="/app/insight/assets"> <Anchor className="mb-1 me-2" size="18"/> Assets Overview </NavLink></li>
                    <li className="text-start list-group-item"><NavLink className="insight-list-group-item" to="/app/insight/role"> <Anchor className="mb-1 me-2" size="18"/> Role Overview </NavLink></li>
                </ul>
            </div>
        )
    }
}

export default Insights;