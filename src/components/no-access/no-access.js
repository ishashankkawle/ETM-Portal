import React, { Component } from "react";
import { Flag, Frown, Info } from "react-feather";
import './no-access.css'

class NoAccess extends Component {

    constructor(props) {
        super();
    }



    render() {
        return (
            <div className="row p-1 h-100">
                <div className="m-auto">
                    <div className="row w-100">
                        <Frown size="30"/>
                    </div>
                    <div className="row w-100 d-flex justify-content-center text-left">
                        <div className="lan-popup">
                            Sorry, It looks like you don't have permissions to access this page. Please contact Administrator to get the access.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoAccess;