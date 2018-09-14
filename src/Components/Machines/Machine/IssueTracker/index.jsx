import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Colors,
    FormGroup,
    Icon,
    InputGroup,
    Intent,
    Popover,
    PopoverInteractionKind,
    Spinner,
    Tag,
    Text,
    TextArea
} from "@blueprintjs/core";
import {Timeline, TimelineEvent} from 'react-event-timeline'
import "./index.css";
import {DateInput, DateRangeInput} from "@blueprintjs/datetime";
import {bindActionCreators} from "redux";
import {getMachineIssues} from "../../../../actions/MachineActions";
import connect from "react-redux/es/connect/connect";

class IssuesTracker extends React.Component {

    state = {
        issueResolutionDate: new Date(),
        dEndDate: new Date(),
        dStartDate: new Date()
    };

    componentDidMount() {
        const {match: {params: {mrw}}, getMachineIssues, authUser: {token}} = this.props;
        getMachineIssues(mrw, {}, token);
    }

    render() {
        const {loadingMachineIssues, loadingMachineIssuesFailed, machineIssues} = this.props;

        return [
            <div key={"toolbar"} className="toolbar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {loadingMachineIssues
                        ? <Spinner className="bp3-small"/>
                        : <Icon icon="list"/>
                    }
                    <Icon icon="blank"/>
                    <Text ellipsize={true}>
                        Issues Tracker
                    </Text>
                </div>
                <div className="actions">
                    <ButtonGroup>
                        <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
                            <Button intent={Intent.NONE} className="pt-small" icon="add"/>
                            <form style={{
                                padding: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            }} action="">
                                <div style={{marginBottom: 5}}>
                                    <FormGroup labelInfo="Occurred on ?">
                                        <DateInput
                                            formatDate={date => date.toLocaleString()}
                                            onChange={this.handleDateChange}
                                            parseDate={str => new Date(str)}
                                            placeholder={"M/D/YYYY"}
                                            value={this.state.issueResolutionDate}
                                        />
                                    </FormGroup>
                                </div>
                                <div style={{marginBottom: 5}}>
                                    <InputGroup placeholder={"Reported to ?"}/>
                                </div>

                                <FormGroup labelInfo="Reported on ?">
                                    <DateInput
                                        formatDate={date => date.toLocaleString()}
                                        onChange={this.handleDateChange}
                                        parseDate={str => new Date(str)}
                                        placeholder={"M/D/YYYY"}
                                        value={this.state.issueResolutionDate}
                                    />
                                </FormGroup>

                                <div style={{marginBottom: 5}}>
                                    <FormGroup labelInfo={"Full description of the issue"}>
                                                <TextArea
                                                    intent={Intent.NONE}
                                                />
                                    </FormGroup>
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
                            <form style={{
                                padding: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            }} action="">
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
                            <form style={{
                                padding: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            }} action="">
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
            <div key={"content"}>
                {loadingMachineIssues
                    ? (
                        <div className="loadingDiv"><Spinner/></div>
                    )
                    : loadingMachineIssuesFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        )
                        : (
                            <Timeline>
                                {machineIssues.map(({id, report_date, reported_to, occurrence_date, resolved, description, resolved_by, observation, resolution_date}) => {
                                    return (
                                        <TimelineEvent
                                            key={id}
                                            title={`Reported to ${reported_to} on ${report_date}`}
                                            createdAt={`Occurred on ${occurrence_date}`}
                                            iconColor={Colors.WHITE}
                                            bubbleStyle={{backgroundColor: resolved ? Colors.GREEN5 : Colors.RED5}}
                                            icon={<span
                                                className={`bp3-icon-standard ${resolved ? "bp3-icon-tick" : "bp3-icon-error"}`}/>}
                                        >
                                            <div className="content__Container">
                                                <div className="description">
                                                    {description}
                                                </div>

                                                {!resolved && (
                                                    <div className={"actions"}>
                                                        <ButtonGroup>
                                                            <Popover
                                                                interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
                                                                <Button minimal intent={Intent.SUCCESS}
                                                                        className="bp3-small" icon="tick"/>
                                                                <form style={{
                                                                    padding: 5,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'space-evenly'
                                                                }} action="">
                                                                    <div style={{marginBottom: 5}}>
                                                                        <InputGroup placeholder={"Received from ?"}/>
                                                                    </div>
                                                                    <div style={{marginBottom: 5}}>
                                                                        <FormGroup labelInfo="Received on ?">
                                                                            <DateInput
                                                                                formatDate={date => date.toLocaleString()}
                                                                                onChange={this.handleDateChange}
                                                                                parseDate={str => new Date(str)}
                                                                                placeholder={"M/D/YYYY"}
                                                                                value={this.state.issueResolutionDate}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                                    <div style={{marginBottom: 5}}>
                                                                        <FormGroup labelInfo={"Any observations ?"}>
                                                                            <TextArea
                                                                                intent={Intent.NONE}
                                                                            />
                                                                        </FormGroup>
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
                                                )}

                                                {resolved && (
                                                    <div className="resolution" style={{marginTop: 10}}>
                                                        <blockquote className="bp3-blockquote">
                                                            <header className="title">Received from
                                                                <strong
                                                                    className={"bp3-text-muted"}> {resolved_by}</strong> on
                                                                <strong
                                                                    className={"bp3-text-muted"}> {resolution_date}</strong>
                                                            </header>
                                                            {observation}
                                                        </blockquote>
                                                    </div>
                                                )}
                                            </div>
                                        </TimelineEvent>
                                    );
                                })}
                            </Timeline>
                        )
                }
            </div>
        ];
    }

    handleDateChange = date => {
        this.setState({issueResolutionDate: date})
    };

    handleRangeChange = ([start, end]) => {
        this.setState({dStartDate: start, dEndDate: end})
    };

    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        authUser: PropTypes.object.isRequired,

        loadingMachineIssuesFailed: PropTypes.bool.isRequired,
        machineIssues: PropTypes.array.isRequired,
        loadingMachineIssues: PropTypes.bool.isRequired,
        getMachineIssues: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({authUser, loadingMachineIssues, machineIssues, loadingMachineIssuesFailed}) => (
    {authUser, loadingMachineIssues, machineIssues, loadingMachineIssuesFailed});
const mapDispatchToProps = dispatch => bindActionCreators({getMachineIssues}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuesTracker));