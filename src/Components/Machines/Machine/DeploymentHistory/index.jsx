import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {Button, ButtonGroup, Icon, InputGroup, Intent, Popover, Spinner, Tag, Text, PopoverInteractionKind} from "@blueprintjs/core";
import "./index.css";
import {bindActionCreators} from "redux";
import {loadMRWDeployments} from "../../../../actions/MRWsActions";
import connect from "react-redux/es/connect/connect";
import DeploymentsTable from "./Table";
import {DateRangeInput} from "@blueprintjs/datetime";

class DeploymentHistory extends React.Component{

    state = {
        dEndDate: new Date(),
        dStartDate: new Date()
    };

    componentDidMount() {
        const {match: {params: {mrw}}, loadMRWDeployments} = this.props;
        loadMRWDeployments(mrw, "name");
    }

    render(){
        const {MRWDeployments: {deployments}, loadingDeployments, loadingDeploymentsFailed} = this.props;

        return [
            <div key={"toolbar"} className="toolbar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {false
                        ? <Spinner className="bp3-small"/>
                        : <Icon icon="list"/>
                    }
                    <Icon icon="blank"/>
                    <Text ellipsize={true}>
                        Deployments History
                    </Text>
                </div>
                <div className="actions">
                    <ButtonGroup>
                        <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
                            <Button intent={Intent.NONE} className="pt-small" icon="add"/>
                            <form style={{padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} action="">
                                <div style={{marginBottom: 5}}>
                                    <InputGroup placeholder={"Center"}/>
                                </div>
                                <div style={{marginBottom: 5}}>
                                    <DateRangeInput
                                        allowSingleDayRange={true}
                                        formatDate={date => date.toLocaleString()}
                                        onChange={this.handleRangeChange}
                                        parseDate={str => new Date(str)}
                                        value={[this.state.dStartDate, this.state.dEndDate]}
                                    />
                                </div>
                                <ButtonGroup fill minimal>
                                    <Button minimal small intent={Intent.DANGER}
                                            icon="cross"/>
                                    <Button minimal small intent={Intent.SUCCESS}
                                            icon="tick"/>
                                </ButtonGroup>
                            </form>
                        </Popover>
                        <Popover>
                            <Button intent={Intent.NONE} className="pt-small" icon="filter"/>
                            <form style={{padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} action="">
                                <div style={{marginBottom: 5}}>
                                    <DateRangeInput
                                        allowSingleDayRange={true}
                                        formatDate={date => date.toLocaleString()}
                                        onChange={this.handleRangeChange}
                                        parseDate={str => new Date(str)}
                                        value={[this.state.dStartDate, this.state.dEndDate]}
                                    />
                                </div>
                                <ButtonGroup fill minimal>
                                    <Button minimal small intent={Intent.DANGER}
                                            icon="cross"/>
                                    <Button minimal small intent={Intent.SUCCESS}
                                            icon="tick"/>
                                </ButtonGroup>
                            </form>
                        </Popover>
                        <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
                            <Button intent={Intent.NONE} className="pt-small" icon="export"/>
                            <form style={{padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} action="">
                                <div style={{marginBottom: 5}}>
                                    <InputGroup placeholder={"Filename"}/>
                                </div>
                                <ButtonGroup fill minimal>
                                    <Button minimal small intent={Intent.DANGER}
                                            icon="cross"/>
                                    <Button minimal small intent={Intent.SUCCESS}
                                            icon="tick"/>
                                </ButtonGroup>
                            </form>
                        </Popover>
                    </ButtonGroup>
                </div>
            </div>,
            <div key={"content"} className={"content"}>
                {loadingDeployments
                    ? (
                        <div className="loadingDiv"><Spinner/></div>
                    )
                    : loadingDeploymentsFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        )
                        : (
                            <DeploymentsTable deployments={deployments}/>
                        )
                }
            </div>
        ];
    }

    handleRangeChange = ([start, end]) => {
        this.setState({dStartDate: start, dEndDate: end})
    };

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        loadingDeploymentsFailed: PropTypes.bool.isRequired,
        MRWDeployments: PropTypes.object.isRequired,
        loadingDeployments: PropTypes.bool.isRequired,
        loadMRWDeployments: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({loadingDeployments, MRWDeployments, loadingDeploymentsFailed}) => (
    {loadingDeployments, MRWDeployments, loadingDeploymentsFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWDeployments}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeploymentHistory));