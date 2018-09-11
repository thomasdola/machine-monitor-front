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
import {loadMRWIssues} from "../../../../actions/MRWsActions";
import connect from "react-redux/es/connect/connect";

class IssuesTracker extends React.Component {

    state = {
        issueResolutionDate: new Date(),
        dEndDate: new Date(),
        dStartDate: new Date()
    };

    componentDidMount() {
        const {match: {params: {mrw}}, loadMRWIssues} = this.props;
        loadMRWIssues(mrw, "name");
    }

    render() {
        const {MRWIssues: {issues}, loadingIssues, loadingIssuesFailed} = this.props;

        return [
            <div key={"toolbar"} className="toolbar">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {false
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
                {loadingIssues
                    ? (
                        <div className="loadingDiv"><Spinner/></div>
                    )
                    : loadingIssuesFailed
                        ? (
                            <div className="power">
                                <Tag large intent={Intent.DANGER}>MRW Not Found !</Tag>
                            </div>
                        )
                        : (
                            <Timeline>
                                {issues.map(({report_date, reported_to, occurrence_date, resolved, description, resolved_by, observation, resolution_date}) => {
                                    return (
                                        <TimelineEvent
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


                {/*<Timeline>*/}
                {/*<TimelineEvent title="Reported to John Doe on 2016-09-12 10:06 PM"*/}
                {/*createdAt="Occurred on 2016-09-12 10:06 PM"*/}
                {/*iconColor={Colors.WHITE}*/}
                {/*bubbleStyle={{backgroundColor: Colors.RED5}}*/}
                {/*icon={<span className="bp3-icon-standard bp3-icon-error"/>}*/}
                {/*>*/}
                {/*<div className={"content__Container"}>*/}
                {/*<div className={"description"}>*/}
                {/*I received the payment for $543. Should be shipping the item within a couple of hours.*/}
                {/*</div>*/}
                {/*<div className={"actions"}>*/}
                {/*<ButtonGroup>*/}
                {/*<Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>*/}
                {/*<Button minimal intent={Intent.SUCCESS} className="bp3-small" icon="tick"/>*/}
                {/*<form style={{padding: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}} action="">*/}
                {/*<div style={{marginBottom: 5}}>*/}
                {/*<InputGroup placeholder={"Received from ?"}/>*/}
                {/*</div>*/}
                {/*<div style={{marginBottom: 5}}>*/}
                {/*<FormGroup labelInfo="Received on ?">*/}
                {/*<DateInput*/}
                {/*formatDate={date => date.toLocaleString()}*/}
                {/*onChange={this.handleDateChange}*/}
                {/*parseDate={str => new Date(str)}*/}
                {/*placeholder={"M/D/YYYY"}*/}
                {/*value={this.state.issueResolutionDate}*/}
                {/*/>*/}
                {/*</FormGroup>*/}
                {/*</div>*/}
                {/*<div style={{marginBottom: 5}}>*/}
                {/*<FormGroup labelInfo={"Any observations ?"}>*/}
                {/*<TextArea*/}
                {/*intent={Intent.NONE}*/}
                {/*/>*/}
                {/*</FormGroup>*/}
                {/*</div>*/}
                {/*<ButtonGroup fill minimal>*/}
                {/*<Button minimal small intent={Intent.DANGER}*/}
                {/*icon="cross"/>*/}
                {/*<Button minimal small intent={Intent.SUCCESS}*/}
                {/*icon="tick"/>*/}
                {/*</ButtonGroup>*/}
                {/*</form>*/}
                {/*</Popover>*/}
                {/*</ButtonGroup>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</TimelineEvent>*/}
                {/*<TimelineEvent*/}
                {/*title="You sent an email to John Doe"*/}
                {/*createdAt="2016-09-11 09:06 AM"*/}
                {/*iconColor={Colors.WHITE}*/}
                {/*bubbleStyle={{backgroundColor: Colors.GREEN5}}*/}
                {/*icon={<span className="bp3-icon-standard bp3-icon-tick"/>}*/}
                {/*>*/}
                {/*<div className="content__Container">*/}
                {/*<div className="description">*/}
                {/*Like we talked, you said that you would share the shipment details? This is an urgent order and*/}
                {/*so I*/}
                {/*am losing patience.*/}
                {/*</div>*/}
                {/*<div className="resolution" style={{marginTop: 10}}>*/}
                {/*<blockquote className="bp3-blockquote">*/}
                {/*<header className="title">Received from*/}
                {/*<span className={"bp3-text-muted"}>John Doe</span> on*/}
                {/*<span className={"bp3-text-muted"}>2016-09-11 09:06 AM</span>*/}
                {/*</header>*/}
                {/*Can you expedite the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!*/}
                {/*</blockquote>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</TimelineEvent>*/}
                {/*</Timeline>*/}
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

        loadingIssuesFailed: PropTypes.bool.isRequired,
        MRWIssues: PropTypes.object.isRequired,
        loadingIssues: PropTypes.bool.isRequired,
        loadMRWIssues: PropTypes.func.isRequired,
    }
}

const mapStateToProps = ({loadingIssues, MRWIssues, loadingIssuesFailed}) => (
    {loadingIssues, MRWIssues, loadingIssuesFailed});
const mapDispatchToProps = dispatch => bindActionCreators({loadMRWIssues}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IssuesTracker));