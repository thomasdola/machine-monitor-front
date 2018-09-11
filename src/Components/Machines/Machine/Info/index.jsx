import React from 'react';
import PropTypes from 'prop-types';
import {Classes, Dialog, Intent, Tag, Spinner} from '@blueprintjs/core';
import {withRouter} from 'react-router-dom';
import {loadMRWInformation} from '../../../../actions/MRWsActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "./index.css";
import laptop from '../../../../notebook-computer.default.svg';

class MoreInfo extends React.Component {

    componentDidMount() {
        const {match: {params: {mrw}}, loadMRWInformation} = this.props;
        loadMRWInformation(mrw, "name");
    }

    render() {

        const {history, match: {params: {mrw}}, loadingInfo, MRWInfo, loadingInfoFailed} = this.props;

        return (
            <Dialog
                className="MoreInfo"
                isOpen={true}
                icon="info-sign"
                lazy
                canOutsideClickClose={false}
                canEscapeKeyClose={false}
                onClose={() => history.goBack()}
                title={`${loadingInfo ? 'Loading' : mrw} Information`}
            >
                <div className={`${Classes.DIALOG_BODY} InfoBody`}>
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
                                <div className="power" key={"power"}>
                                    <Tag icon="power"
                                         large
                                         round
                                         intent={MRWInfo.status === 'ON' ? Intent.SUCCESS : Intent.DANGER}>
                                        {MRWInfo.status}
                                    </Tag>
                                </div>,

                                <div className="Meta" key={"meta"}>
                                    <div className="row">
                                        <span className="name">Name</span>
                                        <span><Tag minimal intent={Intent.NONE}>{MRWInfo.name}</Tag></span>
                                    </div>
                                    {/*<div className="row">*/}
                                        {/*<span className="name">Last Log in</span>*/}
                                        {/*<span><Tag interactive minimal intent={Intent.NONE}>{MRWInfo.user}</Tag></span>*/}
                                    {/*</div>*/}
                                </div>,

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
                                </div>,

                                <div className="Applications" key={"applications"}>
                                    <h3>Applications</h3>
                                    {
                                        MRWInfo.applications.map(app => (
                                            <div className="row" key={app.name}>
                                                <span className="name">{app.name}</span>
                                                <span>
                                                    <Tag minimal
                                                         intent={app.status === 'Stopped' ? Intent.DANGER : Intent.SUCCESS}>
                                                        {app.status}
                                                    </Tag>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>,

                                <div className="Services" key={"services"}>
                                    <h3>Services</h3>
                                    {
                                        MRWInfo.services.map(service => (
                                            <div className="row" key={service.name}>
                                                <span className="name">{service.name}</span>
                                                <span>
                                                    <Tag minimal
                                                         intent={service.status === 'Stopped' ? Intent.DANGER : Intent.SUCCESS}>
                                                        {service.status}
                                                    </Tag>
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            ]
                    }
                </div>
            </Dialog>
        );
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

const mapStateToProps = ({loadingInfo, MRWInfo, loadingInfoFailed}) => ({loadingInfo, MRWInfo, loadingInfoFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWInformation}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInfo));