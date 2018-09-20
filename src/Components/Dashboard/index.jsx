import React from 'react';
import {Card, Elevation, Text, Intent, Tag} from '@blueprintjs/core';
const {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
import "./index.css";

const data = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];

class Dashboard extends React.Component{

    render(){

        const LineBarAreaComposedChart = React.createClass({
            render () {
              return (
                <ResponsiveContainer>
                    <ComposedChart width={600} height={400} data={data}
                      margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <CartesianGrid stroke='#f5f5f5'/>
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
                        <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
                        <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
                    </ComposedChart>
               </ResponsiveContainer>
            );
          }
        })

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
                        <div className="Content">
                            <LineBarAreaComposedChart/>
                        </div>
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