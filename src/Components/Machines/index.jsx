import React from 'react';
import PropTypes from 'prop-types';
import MRW from './Thumbnail/index';
import {withRouter} from "react-router-dom";
import {Hotkey, Hotkeys, HotkeysTarget, Intent, Spinner, Tag} from '@blueprintjs/core';
import Search from '../Search/index';
import {loadMRWs} from '../../actions/MRWsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import "./index.css";

class Machines extends React.Component {

    state = {
        isOmnibarOpen: false
    };

    componentDidMount() {
        this.props.loadMRWs({});
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
                    MRWs={this.props.MRWs}
                    isOpen={this.state.isOmnibarOpen}
                    onMRWSelect={this.handleItemSelect}
                    onClose={this.handleOmnibarClose}
                />
                {
                    this.props.loadingMRWs
                        ? <div className="loadingDiv"><Spinner/></div>
                        : this.props.loadingMRWsFailed
                        ? (
                            <div className="power">
                                <Tag large minimal intent={Intent.DANGER}>Whoops! Something went wrong</Tag>
                            </div>
                        )
                        : (
                            this.props.MRWs.map(({name, status}) => (
                                <MRW key={name} active={status === 'ON'} name={name}/>
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

        loadMRWs: PropTypes.func.isRequired,
        MRWs: PropTypes.array.isRequired,
        loadingMRWs: PropTypes.bool.isRequired,
        loadingMRWsFailed: PropTypes.bool.isRequired,
    }
}

const mapStateToProps = ({MRWs, loadingMRWs, loadingMRWsFailed}) => ({MRWs, loadingMRWs, loadingMRWsFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWs}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotkeysTarget(Machines)));