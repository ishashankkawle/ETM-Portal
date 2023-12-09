import React, { Component } from "react";
import { Edit2 } from "react-feather";
import './assets.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import res from "../../../shared/resources";
import HttpHandler from "../../../core/httpHandler";
import Loader, {getLoader} from "../../loader/loader"
import { getSelectOptionsList } from "../../../core/util";
import PopupNotification from "../../popup/popup";

class Assets extends Component 
{
    constructor()
    {
        super();
        this.state = {
            isLoading: false ,
            projData : []
        }
        this.moduleGridRef = ""
        this.typeGridRef = ""
        this.priorityGridRef = ""
        this.popupRef = React.createRef();

        this.initializeModuleGrid = this.initializeModuleGrid.bind(this);
        this.initializeTypeGrid = this.initializeTypeGrid.bind(this);
        this.initializePriorityGrid = this.initializePriorityGrid.bind(this);
        this.loadAssetsForProject = this.loadAssetsForProject.bind(this);
        this.loadModules = this.loadModules.bind(this);
        this.loadTypes = this.loadTypes.bind(this);
        this.loadPriorities = this.loadPriorities.bind(this);
        this.createNewAsset = this.createNewAsset.bind(this);
    }

    async componentDidMount()
    {
        this.setState({isLoading : true});
        let http = new HttpHandler();
        let arrProjData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/project?userId=" + res["USERDATA"]["STR_USERID"]);
        this.setState({isLoading : false , projData : arrProjData});
    }

    createNewAsset = async(e) => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Creating new asset ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 80000)
        e.preventDefault();
        let assetType = document.getElementById("opr_asset_sel_assettype").value
        let projId = document.getElementById("opr_asset_proj_sel").value
        let assetName = document.getElementById("opr_asset_inp_name").value
        let body = {}
        let url = res["STR_API_BASEPATH"] + "/api"
        if(assetType === "module")
        {
            url = url + "/module"
            body = {
                "module" : assetName,
                "projectId" : projId
            };
        }
        else if (assetType === "type")
        {
            url = url + "/type"
            body = {
                "type" : assetName,
                "projectId" : projId
            };

        }
        else
        {
            url = url + "/priority"
            body = {
                "priority" : assetName,
                "projectId" : projId
            };

        }
        const http = new HttpHandler();
        await http.httpPost(url , body);
        this.popupRef.current.togglePopupNotificationDisplay("Successfully created asset" , res["POPUP_NOTIFICATION_MAP"]["type"]["SUCCESS"], 10000)
    }

    initializeModuleGrid = (params) => {
        this.moduleGridRef = params.api;
    }

    initializeTypeGrid = (params) => {
        this.typeGridRef = params.api;
    }

    initializePriorityGrid = (params) => {
        this.priorityGridRef = params.api;
    }

    loadAssetsForProject = async () => 
    {
        this.popupRef.current.togglePopupNotificationDisplay("Fetching assets ..." , res["POPUP_NOTIFICATION_MAP"]["type"]["LOADING"] , 10000)
        let projectId = document.getElementById("opr_asset_proj_sel").value;
        this.loadModules(projectId);
        this.loadTypes(projectId);
        this.loadPriorities(projectId);
    }

    loadModules = async (projectId) =>
    {
        this.moduleGridRef.showLoadingOverlay()
        let http = new HttpHandler();
        let arrModuleData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/module?projectId=" + projectId); 
        if (arrModuleData.length == 0) 
        {
            this.moduleGridRef.showNoRowsOverlay();
        } 
        else
        {   
            this.moduleGridRef.setRowData(arrModuleData)
            this.moduleGridRef.hideOverlay();
        }
    }
    loadTypes = async (projectId) =>
    {
        this.typeGridRef.showLoadingOverlay()
        let http = new HttpHandler();
        let arrTypeData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/type?projectId=" + projectId); 
        if (arrTypeData.length == 0) 
        {
            this.typeGridRef.showNoRowsOverlay();
        } 
        else
        {   
            this.typeGridRef.setRowData(arrTypeData)
            this.typeGridRef.hideOverlay();
        }
    }
    loadPriorities = async (projectId) =>
    {
        this.priorityGridRef.showLoadingOverlay()
        let http = new HttpHandler();
        let arrPriorityData = await http.httpGet(res["STR_API_BASEPATH"] + "/api/priority?projectId=" + projectId); 
        if (arrPriorityData.length == 0) 
        {
            this.priorityGridRef.showNoRowsOverlay();
        } 
        else
        {   
            this.priorityGridRef.setRowData(arrPriorityData)
            this.priorityGridRef.hideOverlay();
        }
    }

    render() 
    {
        let projOption = getSelectOptionsList(this.state.projData , "ProjectId" , "ProjectName" , true , "Select Project");
        const moduleData = []
        const typeData = []
        const priorityData = []

        const defaultTableColDef = {
            sortable: true,
            flex: 1,
            filter: 'agTextColumnFilter'
        };

        const moduleListHeaders = [
            { headerName: "Module Name", field: "Module" }
        ]
        const typeListHeaders = [
            { headerName: "Type Name", field: "Type" }
        ]
        const priorityListHeaders = [
            { headerName: "Priority Name", field: "Priority" }
        ]


        if(this.state.isLoading == true)
        {
            return getLoader()
        }
        else
        {
            return (

                <div className="h-100">
                    <div className="row p-1">

                        <div className="col-md-12">
                            <div className="card shadow-sm mt-2">
                                <div className="p-3 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">New Asset</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <form>
                                                <div className="mb-3">
                                                    <select className="form-select mt-3 mb-3" id="opr_asset_proj_sel" onChange={this.loadAssetsForProject}>
                                                        {projOption}
                                                    </select>
                                                </div>

                                            </form>
                                        </div>
                                        <div className="col-3">
                                            <form>
                                                <div className="mb-3">
                                                    <select className="form-select mt-3 mb-3" id="opr_asset_sel_assettype">
                                                        <option value="module">Module</option>
                                                        <option value="type">Type</option>
                                                        <option value="priority">Priority</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-4 d-flex justify-content-between align-items-center">
                                            <div className="input-group">
                                                <span className="input-group-text op-usr-inp-grp-txt"><Edit2 color="var(--text-primary)" size="16" /></span>
                                                <input type="text" className="form-control" placeholder="Asset Value" id="opr_asset_inp_name" />
                                            </div>
                                        </div>
                                        <div className="col-2 d-flex justify-content-center align-items-center">
                                            <button type="submit" className="btn btn-primary" onClick={this.createNewAsset}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row ps-3 mt-2 p-3 bg-white shadow-sm text-start" style={{ height: '70%' }}>
                        <h6>Available assets for project :</h6>
                        <div className="d-flex justify-content-between" style={{ height: '90%' }} >
                            <div className="mt-2 bg-white pb-5 ag-theme-alpine" style={{ width: '30%', height: '100%' }}>
                                <AgGridReact defaultColDef={defaultTableColDef} rowData={moduleData} columnDefs={moduleListHeaders} onGridReady={this.initializeModuleGrid} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                            <div className="mt-2 bg-white pb-5 ag-theme-alpine" style={{ width: '30%', height: '100%' }}>
                                <AgGridReact defaultColDef={defaultTableColDef} rowData={typeData} columnDefs={typeListHeaders} onGridReady={this.initializeTypeGrid} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                            <div className="mt-2 bg-white pb-5 ag-theme-alpine" style={{ width: '30%', height: '100%' }}>
                                <AgGridReact defaultColDef={defaultTableColDef} rowData={priorityData} columnDefs={priorityListHeaders} onGridReady={this.initializePriorityGrid} loadingOverlayComponent={Loader}></AgGridReact>
                            </div>
                        </div>
                    </div>

                    <PopupNotification ref={this.popupRef}/>
                </div>
            )
        }
    

    }
}
export default Assets;