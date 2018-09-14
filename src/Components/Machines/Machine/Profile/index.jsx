import React from 'react';
import PropTypes from 'prop-types';
import {
    AnchorButton,
    Button,
    ButtonGroup,
    InputGroup,
    Intent,
    Popover,
    PopoverInteractionKind,
    Spinner,
    Tag
} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import {getMachineProfile} from '../../../../actions/MachineActions';
import {startListening, onOk, onError, onTimeout, startApplication, startService, changePassword,
    reboot, powerOff, stopApplication, stopService, onApplicationStatusChanged, onServiceStatusChanged,
    onLocationChanged, onUserActivityChanged, onNetworkChanged, onPasswordChangeDone} from '../../../../actions/socket/MachineActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "./index.css";
import laptop from '../../../../notebook-computer.default.svg';
import _keys from "lodash/keys";

class Information extends React.Component {

    state = {
        oldPassword: "",
        newPassword: "",
        passwordConfirmation: "",
        confirmReboot: false,
        changePassword: false,
        confirmPowerOff: false
    };

    componentDidMount() {
        const {match: {params: {mrw}}, getMachineProfile, authUser: {token}, userChannel,
            onPasswordChangeDone, onApplicationStatusChanged, onLocationChanged, onNetworkChanged,
            onServiceStatusChanged, onUserActivityChanged} = this.props;
        getMachineProfile(mrw, "name", token);

        startListening({channel: userChannel,
            listeners: {onPasswordChangeDone, onApplicationStatusChanged, onLocationChanged, onNetworkChanged,
                onServiceStatusChanged, onUserActivityChanged}
        })
    }

    startApp = app => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        startApplication({name: app, machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };
    stopApp = app => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        stopApplication({name: app, machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };

    startService = service => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        startService({name: service, machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };
    stopService = service => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        stopService({name: service, machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };

    changePassword = () => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        const {oldPassword, newPassword, passwordConfirmation} = this.state;
        if(oldPassword.trim() && newPassword.trim() && passwordConfirmation.trim()
            && newPassword === passwordConfirmation){
            changePassword({oldPassword, newPassword, machine: mrw}, userChannel, {onOk, onTimeout, onError})
        }
    };

    powerOff = () => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        powerOff({machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };

    reboot = () => {
        const {userChannel, onOk, onError, onTimeout, match: {params: {mrw}}} = this.props;
        reboot({machine: mrw}, userChannel, {onOk, onError, onTimeout});
    };

    render() {

        const {loadingMachineProfile, loadingMachineProfileFailed, machineProfile} = this.props;

        const canPerform = machineProfile.power === 'ON';

        return [
            <img key={"icon"} alt="MRW" width={150} height={150} src={laptop}/>,


            loadingMachineProfile
                        ? <div key={"spinner"} className="loadingDiv"><Spinner/></div>
                    : loadingMachineProfileFailed
                    ? (
                        <div key={"notFound"} className="power">
                            <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                        </div>
                    ) : [
                        <div key={"controlAndInfo"} className="info__Box">
                            <div className="power" key={"power"}>
                                <Tag icon="power"
                                     large
                                     round
                                     intent={machineProfile.power === 'ON' ? Intent.SUCCESS : Intent.DANGER}>
                                    {machineProfile.power}
                                </Tag>
                            </div>

                            <div className="Meta" key={"meta"}>
                                <div className="row">
                                    <span className="name">Name</span>
                                    <span><Tag minimal intent={Intent.NONE}>{machineProfile.name}</Tag></span>
                                </div>
                            </div>

                            <div className="Applications" key={"network"}>
                                <h3>Network</h3>
                                {
                                    _keys(machineProfile.network).map(k => {
                                        return (
                                            <div key={k} className="row">
                                                <span className="name">{k}</span>
                                                <span><Tag minimal
                                                           intent={Intent.NONE}>{machineProfile.network[k]}</Tag></span>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className="Applications" key={"applications"}>
                                <h3>Applications</h3>
                                {
                                    machineProfile.applications.map(app => (
                                        <div className="row" key={app.name}>
                                            <span className="name">{app.display}</span>
                                            <span>
                                                    <Popover disabled={!canPerform} content={
                                                        app.status === 0
                                                            ? <Button
                                                                minimal intent={Intent.SUCCESS}
                                                                onClick={() => this.startApp(app.name)}
                                                                icon={'refresh'}>Start</Button> :
                                                            <Button
                                                                minimal intent={Intent.DANGER}
                                                                onClick={() => this.stopApp(app.name)}
                                                                icon={'stop'}>Stop</Button>
                                                    } target={
                                                        <Tag minimal interactive={true}
                                                             intent={app.status === 0 ? Intent.DANGER : Intent.SUCCESS}>
                                                            {app.status === 0 ? "Stopped" : "Running"}
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
                                    machineProfile.services.map(service => (
                                        <div className="row" key={service.name}>
                                            <span className="name">{service.display}</span>
                                            <span>
                                                    <Popover disabled={!canPerform} content={
                                                        service.status === 0
                                                            ? <Button
                                                                minimal intent={Intent.SUCCESS}
                                                                onClick={() => this.startService(service.name)}
                                                                icon={'refresh'}>Start</Button> :
                                                            <Button
                                                                minimal intent={Intent.DANGER}
                                                                onClick={() => this.stopService(service.name)}
                                                                icon={'stop'}>Stop</Button>
                                                    } target={
                                                        <Tag minimal interactive={true}
                                                             intent={service.status === 0 ? Intent.DANGER : Intent.SUCCESS}>
                                                            {service.status === 0 ? "Stopped" : "Running"}
                                                        </Tag>
                                                    }/>
                                                </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>,
                        <div key={"control"} className="control__Box">
                            <Popover isOpen={this.state.changePassword}
                                     disabled={!canPerform}>
                                <AnchorButton minimal fill
                                              onClick={() => this.setState({changePassword: true})}
                                              disabled={!canPerform}
                                              intent={Intent.WARNING}
                                              icon="user"
                                              text={"Change Password"}/>

                                <form style={{
                                    padding: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly'
                                }} onSubmit={e => {e.preventDefault(); this.changePassword(); this.setState({changePassword: false})}}>
                                    <div style={{marginBottom: 5}}>
                                        <InputGroup
                                            onChange={e => this.setState({oldPassword: e.target.value})}
                                            required={true} value={this.state.oldPassword} placeholder={"Current Password"}/>
                                    </div>
                                    <div style={{marginBottom: 5}}>
                                        <InputGroup
                                            onChange={e => this.setState({newPassword: e.target.value})}
                                            required={true} value={this.state.newPassword} placeholder={"New Password"}/>
                                    </div>
                                    <div style={{marginBottom: 5}}>
                                        <InputGroup
                                            onChange={e => this.setState({passwordConfirmation: e.target.value})}
                                            required={true} value={this.state.passwordConfirmation} placeholder={"Confirm Password"}/>
                                    </div>
                                    <ButtonGroup fill minimal>
                                        <Button
                                            onClick={() => this.setState({changePassword: false})}
                                            minimal small intent={Intent.DANGER}
                                                icon="cross"/>
                                        <Button
                                            type={"submit"} minimal small intent={Intent.SUCCESS}
                                            icon="tick"/>
                                    </ButtonGroup>
                                </form>
                            </Popover>
                            <Popover isOpen={this.state.confirmPowerOff} interactionKind={PopoverInteractionKind.CLICK}
                                     disabled={!canPerform}>

                                <ButtonGroup minimal fill>
                                    <Button
                                        onClick={() => this.setState({confirmPowerOff: true})}
                                        disabled={!canPerform}
                                        intent={Intent.DANGER}
                                        icon="power"
                                        text={"Shut Down"}/>
                                </ButtonGroup>

                                <div style={{padding: 10}}>
                                    <span style={{marginBottom: 10}}>Are you sure?</span>
                                    <ButtonGroup fill minimal>
                                        <Button
                                            onClick={() => this.setState({confirmPowerOff: false})}
                                            minimal small intent={Intent.DANGER}
                                                icon="cross"/>
                                        <Button minimal small intent={Intent.SUCCESS}
                                                onClick={() => {this.powerOff(); this.setState({confirmPowerOff: false})}}
                                                icon="tick"/>
                                    </ButtonGroup>
                                </div>
                            </Popover>
                        </div>
                    ]

        ];
    }

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,

        loadingMachineProfile: PropTypes.bool.isRequired,
        loadingMachineProfileFailed: PropTypes.bool.isRequired,
        userChannel: PropTypes.object.isRequired,
        machineProfile: PropTypes.object.isRequired,
        getMachineProfile: PropTypes.func.isRequired,
        onApplicationStatusChanged: PropTypes.func.isRequired,
        onServiceStatusChanged: PropTypes.func.isRequired,
        onLocationChanged: PropTypes.func.isRequired,
        onUserActivityChanged: PropTypes.func.isRequired,
        onNetworkChanged: PropTypes.func.isRequired,
        onPasswordChangeDone: PropTypes.func.isRequired,
        onOk: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        onTimeout: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({authUser, userChannel, loadingMachineProfile, machineProfile, loadingMachineProfileFailed}) => (
    {authUser,  loadingMachineProfile, userChannel, machineProfile, loadingMachineProfileFailed});
const mapDispatchToProps = dispatch => bindActionCreators({getMachineProfile, onApplicationStatusChanged, onServiceStatusChanged,
    onLocationChanged, onUserActivityChanged, onNetworkChanged, onPasswordChangeDone, onOk, onError, onTimeout}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Information));