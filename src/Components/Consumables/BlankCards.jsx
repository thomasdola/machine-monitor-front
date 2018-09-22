import React from 'react';
import {Button, Intent, NumericInput, Radio, RadioGroup, Text} from "@blueprintjs/core";
import {DateInput, TimePrecision} from "@blueprintjs/datetime";

class BlankCards extends React.Component{

    state = {
        amount: null,
        type: 1,
        date: new Date()
    };

    _handleInputChange = (name, value) => {
        this.setState(() => {
            return {
                [name]: value
            };
        })
    };

    render(){
        const {amount, type, date} = this.state;
        return (
            <div className={"Blank_Card_Tab"}>
                <div className="Status">
                    <div className="Received">
                        <h4 className="Header"><Text ellipsize={true}>Received</Text></h4>
                        <p className="Value">
                            12000
                        </p>
                    </div>
                    <div className="Left">
                        <h4 className="Header"><Text ellipsize={true}>Left</Text></h4>
                        <p className="Value">
                            12
                        </p>
                    </div>
                </div>
                <div className="New_Transaction">
                    <div className="Header">New Transaction</div>
                    <section className="Content">
                        <form action="">
                            <label className="bp3-label">
                                {/*Amount*/}
                                <NumericInput
                                    buttonPosition={"none"}
                                    allowNumericCharactersOnly
                                    onValueChange={(valueNumber, valueString) => this._handleInputChange("amount", valueNumber)}
                                    placeholder="Enter amount of blank cards"
                                    value={amount}
                                    />
                            </label>
                            <label className="bp3-label">

                                <RadioGroup
                                    name={"type"}
                                    inline={true}
                                    label="Transaction Type"
                                    onChange={({target: {name, value}}) => this._handleInputChange(name, value)}
                                    selectedValue={type}
                                >
                                    <Radio label="Check In" value="1" />
                                    <Radio label="Check Out" value="0" />
                                </RadioGroup>
                            </label>
                            <label className="bp3-label">
                                {/*Date*/}
                                <DateInput
                                    placeholder={"Choose date"}
                                    timePrecision={TimePrecision.MINUTE}
                                    formatDate={date => date.toLocaleString()}
                                    parseDate={str => new Date(str)}/>
                            </label>
                            <Button
                                intent={Intent.PRIMARY}
                                icon="tick"
                                text="commit"
                            />
                        </form>
                    </section>
                </div>
            </div>
        );
    }

}

export default BlankCards;