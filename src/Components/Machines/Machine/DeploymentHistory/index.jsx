import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Icon,
    InputGroup,
    Intent,
    Popover,
    PopoverInteractionKind,
    Spinner,
    Tag,
    Text
} from "@blueprintjs/core";
import "./index.css";
import {bindActionCreators} from "redux";
import {getMachineDeployments} from "../../../../actions/MachineActions";
import connect from "react-redux/es/connect/connect";
import DeploymentsTable from "./Table";
import {DateRangeInput} from "@blueprintjs/datetime";

class DeploymentHistory extends React.Component{

    state = {
        dEndDate: new Date(),
        dStartDate: new Date()
    };

    componentDidMount() {
        const {match: {params: {mrw}}, getMachineDeployments, authUser: {token}} = this.props;
        getMachineDeployments(mrw, {}, token);
    }

    render(){
        const {loadingMachineDeployments, loadingMachineDeploymentsFailed, machineDeployments} = this.props;

        return [
            <div key={"toolbar"} className="toolbar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {loadingMachineDeployments
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
                        <Popover>
                            <Button intent={Intent.NONE} className="bp3-small" icon="filter"/>
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
                            <Button intent={Intent.NONE} className="bp3-small" icon="export"/>
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
                {loadingMachineDeployments
                    ? (
                        <div className="loadingDiv"><Spinner/></div>
                    )
                    : loadingMachineDeploymentsFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        )
                        : (
                            <DeploymentsTable deployments={machineDeployments}/>
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
        authUser: PropTypes.object.isRequired,

        loadingMachineDeploymentsFailed: PropTypes.bool.isRequired,
        machineDeployments: PropTypes.array.isRequired,
        loadingMachineDeployments: PropTypes.bool.isRequired,
        getMachineDeployments: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({authUser, loadingMachineDeployments, machineDeployments, loadingMachineDeploymentsFailed}) => (
    {authUser, loadingMachineDeployments, machineDeployments, loadingMachineDeploymentsFailed});
const mapDispatchToProps = dispatch => bindActionCreators({getMachineDeployments}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeploymentHistory));