import React from 'react';
import PropTypes from 'prop-types';
import {Card, Elevation, Intent, Tag, Text, Tab, Tabs} from '@blueprintjs/core';
import BlankCards from "./BlankCards";
import Ribbons from "./Ribbons";
import Laminates from "./Laminates";
import ReceiptPaperRoll from "./ReceiptPaperRoll";
import queryString from "query-string";
import _isEqual from 'lodash/isEqual';
import "./index.css";
import {withRouter} from "react-router-dom";

class Consumables extends React.Component{

    state = {
        tabId: "BLANK_CARDS_TAB"
    };

    static getDerivedStateFromProps(nextProps, prevState){
        const {tabId: prevTabId} = prevState;
        const {location: {search: newSearch}} = nextProps;
        const {type: tabId} = queryString.parse(newSearch);

        if(_isEqual(prevTabId, tabId))
            return null;

        return { tabId };
    }

    _handleChangeOfTab = (nexTabId, prevTabId) => {
        if(nexTabId !== prevTabId){
            this.props.history.push(`?type=${nexTabId}`);
        }
    };

    render(){

        return (
            <div className="Consumables_Page">
                <div className="type">
                    <Tabs
                        selectedTabId={this.state.tabId}
                        onChange={(nextTabId, prevTabId) => this._handleChangeOfTab(nextTabId, prevTabId)}
                        large
                        renderActiveTabPanelOnly id={"consumablesTabs"}>

                        <Tab id={"BLANK_CARDS_TAB"}
                             title="Blank Cards" panel={<BlankCards />} />

                        <Tab id={"RIBBONS_TAB"}
                             title="Ribbons" panel={<Ribbons />} />

                        <Tab id={"LAMINATES_TAB"}
                             title="Laminates" panel={<Laminates />} />

                        <Tab id={"RECEIPT_PAPER_ROLL_TAB"}
                             title="Receipt Paper Roll" panel={<ReceiptPaperRoll />} />

                        <Tabs.Expander />

                    </Tabs>
                </div>
                <div className="logs">
                    <Card elevation={Elevation.THREE} className="Transaction_History_Card">
                        <div className="Header">
                            Transactions history
                        </div>
                        <div className="Content">
                            content
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(Consumables);