import React from 'react';
import PropTypes from 'prop-types';
import MRW from './Thumbnail/index';
import {withRouter} from "react-router-dom";
import {Hotkey, Hotkeys, HotkeysTarget, Intent, Spinner, Tag} from '@blueprintjs/core';
import Search from '../Search/index';
import {loadMachines} from '../../actions/MachinesActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import "./index.css";
import {initListeners, onMachinesUpdated} from "../../actions/socket/MachinesActions";

class Machines extends React.Component {

    state = {
        isOmnibarOpen: false
    };

    componentDidMount() {
        const {authUser: {token}, loadMachines, userChannel, onMachinesUpdated} = this.props;
        initListeners({channel: userChannel, onMachinesUpdated});
        loadMachines({}, token);
    }

    renderHotkeys() {
        return <Hotkeys>
            <Hotkey
                global={true}
                combo="shift + m"
                label="Show MRWs Omnibar"
                onKeyDown={() => this.handleOmnibarToggle()}
            />
            <Hotkey
                group="Fancy shortcuts"
                combo="shift + f"
                label="Be fancy only when focused"
                onKeyDown={() => console.log("So fancy!")}
            />
        </Hotkeys>;
    }

    render() {

        return (
            <div key="dashboard" className="Dashboard bp3-elevation-1">

                <Search
                    MRWs={this.props.machines}
                    isOpen={this.state.isOmnibarOpen}
                    onMRWSelect={this.handleItemSelect}
                    onClose={this.handleOmnibarClose}
                />
                {
                    this.props.loadingMachines
                        ? <div className="loadingDiv"><Spinner/></div>
                        : this.props.loadingMachinesFailed
                        ? (
                            <div className="power">
                                <Tag large minimal intent={Intent.DANGER}>Whoops! Something went wrong</Tag>
                            </div>
                        )
                        : (
                            this.props.machines.map(({name, power}) => (
                                <MRW key={name} active={power === 'ON'} name={name}/>
                            ))
                        )
                }

            </div>
        );
    }

    handleItemSelect = MRW => {
        this.props.history.push(`/${MRW.name}`);
    };

    handleOmnibarToggle = () => this.setState({isOmnibarOpen: !this.state.isOmnibarOpen});
    handleOmnibarClose = () => this.setState({isOmnibarOpen: false});

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,
        userChannel: PropTypes.object.isRequired,

        loadMachines: PropTypes.func.isRequired,
        onMachinesUpdated: PropTypes.func.isRequired,
        machines: PropTypes.array.isRequired,
        loadingMachines: PropTypes.bool.isRequired,
        loadingMachinesFailed: PropTypes.bool.isRequired,
    }
}

const mapStateToProps = ({authUser, userChannel, machines, loadingMachines, loadingMachinesFailed}) => (
    {authUser, userChannel, machines, loadingMachines, loadingMachinesFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMachines, onMachinesUpdated}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotkeysTarget(Machines)));