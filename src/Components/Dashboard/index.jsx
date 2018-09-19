import React from 'react';
import {Card, Elevation, Text, Intent, Tag} from '@blueprintjs/core';
import "./index.css";

class Dashboard extends React.Component{

    render(){

        return (
            <div className="Dashboard">
                <Card className="Box">
                    
                    <div className="Row Active">
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Computers</Text></h3>
                            <div className="Content">
                                <div className="On">
                                    <h4 className="Header"><Text ellipsize={true}>Active</Text></h4>
                                    <p className="Value">
                                        120
                                    </p>
                                </div>
                                <div className="Off">
                                    <h4 className="Header"><Text ellipsize={true}>Inactive</Text></h4>
                                    <p className="Value">
                                        120
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Processes</Text></h3>
                            <div className="Content">
                                <div className="Services">
                                    <h4 className="Header"><Text ellipsize={true}>Services</Text></h4>
                                    <p className="Value">
                                        120
                                    </p>
                                </div>
                                <div className="Applications">
                                    <h4 className="Header"><Text ellipsize={true}>Applications</Text></h4>
                                    <p className="Value">
                                        120
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card interactive elevation={Elevation.ONE} className="Row Certificates">
                        <h3 className="Item_Header"><Text ellipsize={true}>Machine Certificate</Text></h3>
                        <div className="Content">
                                <div className="Valid">
                                    <h4 className="Header"><Text ellipsize={true}>Still Valid</Text></h4>
                                    <p className="Value">
                                        120
                                    </p>
                                </div>
                                <div className="Due">
                                    <h4 className="Header"><Text ellipsize={true}>Due</Text></h4>
                                    <p className="Value">
                                        12
                                    </p>
                                </div>
                            </div>
                    </Card>

                    <div className="Row Consumables">
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Blank Cards</Text></h3>
                            <div className="Content">
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
                        </Card>
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Ribbons</Text></h3>
                            <div className="Content">
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
                        </Card>
                    </div>

                    <div className="Row Consumables">
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Laminates</Text></h3>
                            <div className="Content">
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
                        </Card>
                        <Card interactive elevation={Elevation.ONE} className="Item">
                            <h3 className="Item_Header"><Text ellipsize={true}>Receipt Paper Roll</Text></h3>
                            <div className="Content">
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
                        </Card>
                    </div>

                </Card>

                <Card className="Box">
                    <Card interactive elevation={Elevation.ONE} className="Row Centers">
                        <h3 className="Item_Header"><Text ellipsize={true}>Centers</Text></h3>
                        <div className="Content">
                            <div className="Total">
                                <h4 className="Header"><Text ellipsize={true}>Total</Text></h4>
                                <p className="Value">
                                    12000
                                </p>
                            </div>
                            <div className="Running">
                                <h4 className="Header"><Text ellipsize={true}>Running</Text></h4>
                                <p className="Value">
                                    12
                                </p>
                            </div>
                            <div className="Closed">
                                <h4 className="Header"><Text ellipsize={true}>Closed Recently</Text></h4>
                                <p className="Value">
                                    3
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card interactive elevation={Elevation.ONE} className="Row Centers_Status">
                        <div className="Header">
                            <div className="Name">Name</div>
                            <div className="Computers">Computers</div>
                            <div className="Status">Status</div>
                        </div>
                        <div className="Content">
                            <div className="Center">
                                <div className="Name">030144D56</div>
                                <div className="Computers">5 / 10</div>
                                <div className="Status"><Tag minimal intent={Intent.SUCCESS}>Running</Tag></div>
                            </div>
                            <div className="Center">
                                <div className="Name">030144D54</div>
                                <div className="Computers">0 / 15</div>
                                <div className="Status"><Tag minimal intent={Intent.DANGER}>Closed</Tag></div>
                            </div>
                        </div>
                    </Card>
                </Card>

                <Card className="Box">
                    <Card interactive elevation={Elevation.ONE} className="Row Uptime">
                    <h3 className="Item_Header"><Text ellipsize={true}>Log for Uptime</Text></h3>
                        <p>Card content</p>
                    </Card>
                    <Card interactive elevation={Elevation.ONE} className="Row Downtime">
                    <h3 className="Item_Header"><Text ellipsize={true}>Log for Downtime</Text></h3>
                        <p>Card content</p>
                    </Card>
                </Card>
            </div>
        );
    }
}

export default Dashboard;