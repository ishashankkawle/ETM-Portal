import React, { Component } from "react";
import  './role.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Edit2 } from "react-feather";
import Loader from "../../loader/loader";
import HttpHandler from "../../../core/httpHandler";
import res from "../../../shared/resources";

class Role extends Component 
{
    constructor(props)
    {
        super(props);
        this.gridRef = "";
        this.initializeGrid = this.initializeGrid.bind(this);
        this.createNewRole = this.createNewRole.bind(this);
    }


    initializeGrid = async(params) =>
    {
        if(this.gridRef == "")
        {
          this.gridRef = params.api;
        }
        this.gridRef.showLoadingOverlay();
        const http = new HttpHandler();
        let data = await http.httpGet(res["STR_API_BASEPATH"] + "/api/role")
        if(data.length == 0)
        {
          this.gridRef.showNoRowsOverlay()
        }
        else
        {
          this.gridRef.setRowData(data)
          this.gridRef.hideOverlay();
        }
    }

    createNewRole = async(e) => 
    {
        e.preventDefault();
        let body = {
            "roleName": document.getElementById("opr_role_inp_rolename").value,
            "securityLevel": document.getElementById("opr_role_inp_seclevel").value,
            "permissions": [res["DEFAULTS"]["STR_ACCESS"]]
        };
        const http = new HttpHandler();
        await http.httpPost(res["STR_API_BASEPATH"] + "/api/role" , body);
    }

    render() {

        const defaultRoleColDef = {
            sortable: true,
            filter: 'agTextColumnFilter',
            flex: 1,
            resizable:true,
            rowSelection: 'multiple',
        };

        const roleListHeaders = [
          { headerName: "Role", field: "RoleName"}, 
          { headerName: "Securit Level", field: "SecurityLevel", resizable:false },
        ]

        return (
       
            <div className="row p-1 h-100">

            <div className="col-md-5">
                <div className="card shadow-sm mt-2 mb-2">
                    <div className="p-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">New Role</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                    <span className="input-group-text op-tsk-inp-grp-txt"><Edit2 color="var(--text-primary)" size="16" /></span>
                                    <input type="text" className="form-control" placeholder="Title" id="opr_role_inp_rolename"/>
                                </div>
                                <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                                    <span className="input-group-text op-tsk-inp-grp-txt"><Edit2 color="var(--text-primary)" size="16" /></span>
                                    <input type="number" className="form-control" placeholder="Securit level" id="opr_role_inp_seclevel"/>
                                </div>
                               
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.createNewRole}>Send</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="prgboard mt-2  bg-white pb-5 p-4 ag-theme-alpine shadow-sm" style={{ width: '58%', height: '87%' }}>
                <h6>Organization Roles Hierarchy :</h6>
                <AgGridReact defaultColDef={defaultRoleColDef} rowData={this.data} columnDefs={roleListHeaders} onGridReady={this.initializeGrid} loadingOverlayComponent={Loader}></AgGridReact>
            </div>

        </div>

        )
    }
}

export default Role;