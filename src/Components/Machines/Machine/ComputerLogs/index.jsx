import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Icon, InputGroup,
    Intent,
    Popover,
    PopoverInteractionKind,
    Spinner,
    Tag,
    Text
} from "@blueprintjs/core";
import {bindActionCreators} from "redux";
import {loadMRWLogs} from "../../../../actions/MRWsActions";
import {connect} from "react-redux";
import "../../../Table/index.css";
import LogsTable from './Table';
import "./index.css";
import {DateRangeInput} from "@blueprintjs/datetime";

class ComputerLogs extends React.Component {

    state = {
        dEndDate: new Date(),
        dStartDate: new Date()
    };

    componentDidMount() {
        const {match: {params: {mrw}}, loadMRWLogs} = this.props;
        loadMRWLogs(mrw, "name");
    }

    render() {

        const {MRWLogs: {logs}, loadingLogs, loadingLogsFailed} = this.props;

        return [
            <div key={"toolbar"} className="toolbar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {false
                        ? <Spinner className="bp3-small"/>
                        : <Icon icon="list"/>
                    }
                    <Icon icon="blank"/>
                    <Text ellipsize={true}>
                        User Logs <small className="bp3-text-muted">({20})</small>
                    </Text>
                </div>
                <div className="actions">
                    <ButtonGroup>
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
                {loadingLogs
                    ? (
                        <div className="loadingDiv"><Spinner/></div>
                    )
                    : loadingLogsFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        )
                        : (
                            <LogsTable logs={logs}/>
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

        loadingLogsFailed: PropTypes.bool.isRequired,
        MRWLogs: PropTypes.object.isRequired,
        loadingLogs: PropTypes.bool.isRequired,
        loadMRWLogs: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({loadingLogs, MRWLogs, loadingLogsFailed}) => ({loadingLogs, MRWLogs, loadingLogsFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWLogs}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComputerLogs));