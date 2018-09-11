import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadMRWInformation} from "../../../actions/MRWsActions";
import "./index.css";
import laptop from "../../../notebook-computer.default.svg";
import {Button, ButtonGroup, Intent, InputGroup, Popover, Spinner, Tag, AnchorButton, PopoverInteractionKind} from "@blueprintjs/core";
import DeploymentHistory from "./DeploymentHistory";
import IssuesTracker from "./IssueTracker";
import ComputerLogs from "./ComputerLogs";


class Machine extends React.Component {

    componentDidMount() {
        const {match: {params: {mrw}}, loadMRWInformation} = this.props;
        loadMRWInformation(mrw, "name");
    }

    render() {

        const {loadingInfo, MRWInfo, loadingInfoFailed} = this.props;

        const canPerform = MRWInfo.status === 'ON';

        return (<div className={"machine__Page"}>
            <div className={"control__And__Info__Box"}>
                <img alt="MRW" width={150} height={150} src={laptop}/>

                {
                    loadingInfo
                        ? <div className="loadingDiv"><Spinner/></div>
                        : loadingInfoFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        ) : [
                            <div key={"controlAndInfo"} className="info__Box">
                                <div className="power" key={"power"}>
                                    <Tag icon="power"
                                         large
                                         round
                                         intent={MRWInfo.status === 'ON' ? Intent.SUCCESS : Intent.DANGER}>
                                        {MRWInfo.status}
                                    </Tag>
                                </div>

                                <div className="Meta" key={"meta"}>
                                    <div className="row">
                                        <span className="name">Name</span>
                                        <span><Tag minimal intent={Intent.NONE}>{MRWInfo.name}</Tag></span>
                                    </div>
                                </div>

                                <div className="Applications" key={"network"}>
                                    <h3>Network</h3>
                                    <div className="row">
                                        <span className="name">IP Address</span>
                                        <span><Tag minimal intent={Intent.NONE}>{MRWInfo.network.ip}</Tag></span>
                                    </div>
                                    <div className="row">
                                        <span className="name">Provider</span>
                                        <span><Tag minimal intent={Intent.NONE}>{MRWInfo.network.provider}</Tag></span>
                                    </div>
                                </div>

                                <div className="Applications" key={"applications"}>
                                    <h3>Applications</h3>
                                    {
                                        MRWInfo.applications.map(app => (
                                            <div className="row" key={app.name}>
                                                <span className="name">{app.name}</span>
                                                <span>
                                                    <Popover disabled={!canPerform} content={
                                                        app.status === "Stopped"
                                                            ? <Button minimal intent={Intent.SUCCESS} icon={'refresh'}>Start</Button> :
                                                            <Button minimal intent={Intent.DANGER} icon={'stop'}>Stop</Button>
                                                    } target={
                                                        <Tag minimal interactive={true}
                                                             intent={app.status === 'Stopped' ? Intent.DANGER : Intent.SUCCESS}>
                                                            {app.status}
                                                        </Tag>
                                                    }/>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="Services" key={"services"}>
                                    <h3>Services</h3>
                                    {
                                        MRWInfo.services.map(service => (
                                            <div className="row" key={service.name}>
                                                <span className="name">{service.name}</span>
                                                <span>
                                                    <Popover disabled={!canPerform} content={
                                                            service.status === "Stopped"
                                                            ? <Button minimal intent={Intent.SUCCESS} icon={'refresh'}>Start</Button> :
                                                            <Button minimal intent={Intent.DANGER} icon={'stop'}>Stop</Button>
                                                    } target={
                                                        <Tag minimal interactive={true}
                                                             intent={service.status === 'Stopped' ? Intent.DANGER : Intent.SUCCESS}>
                                                            {service.status}
                                                        </Tag>
                                                    }/>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>,
                            <div key={"control"} className="control__Box">
                                <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY} disabled={!canPerform}>
                                    <AnchorButton minimal fill
                                        disabled={!canPerform}
                                        intent={Intent.WARNING}
                                        icon="user"
                                        text={"Change Password"}/>

                                    <form style={{padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} action="">
                                        <div style={{marginBottom: 5}}>
                                            <InputGroup placeholder={"New Password"}/>
                                        </div>
                                        <div style={{marginBottom: 5}}>
                                            <InputGroup placeholder={"Confirm Password"}/>
                                        </div>
                                        <ButtonGroup fill minimal>
                                            <Button minimal small intent={Intent.DANGER}
                                                    icon="cross"/>
                                            <Button minimal small intent={Intent.SUCCESS}
                                                    icon="tick"/>
                                        </ButtonGroup>
                                    </form>
                                </Popover>
                                <ButtonGroup minimal fill>
                                    <Button
                                        disabled={!canPerform}
                                        intent={Intent.DANGER}
                                        icon="power"
                                        text={"Shut Down"}/>
                                </ButtonGroup>
                            </div>
                        ]
                }
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

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        loadingInfo: PropTypes.bool.isRequired,
        loadingInfoFailed: PropTypes.bool.isRequired,
        MRWInfo: PropTypes.object.isRequired,
        loadMRWInformation: PropTypes.func.isRequired,
    }
}

const mSP = ({loadingInfo, MRWInfo, loadingInfoFailed}) => ({loadingInfo, MRWInfo, loadingInfoFailed});
const mDP = dispatch => bindActionCreators({loadMRWInformation}, dispatch);

export default withRouter(connect(mSP, mDP)(Machine));