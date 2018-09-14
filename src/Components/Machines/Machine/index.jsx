import React from 'react';
import {withRouter} from "react-router-dom";
import "./index.css";
import DeploymentHistory from "./DeploymentHistory";
import IssuesTracker from "./IssueTracker";
import ComputerLogs from "./ComputerLogs";
import Information from "./Profile";


class Machine extends React.Component {

    render() {

        return (<div className={"machine__Page"}>
            <div className={"control__And__Info__Box"}>
                <Information/>
            </div>
            <div className={"deployments__Box"}>
                <DeploymentHistory/>
            </div>
            <div className={"issues__Box"}>
                <IssuesTracker/>
            </div>
            <div className={"logs__Box"}>
                <ComputerLogs/>
            </div>
        </div>);
    }
}

export default withRouter(Machine);