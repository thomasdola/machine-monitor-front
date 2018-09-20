import React from 'react';
import {Card, Elevation, Text, Intent, Tag} from '@blueprintjs/core';
import {ResponsiveContainer, ComposedChart, Line, Pie, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Sector, Cell} from 'recharts';
import "./index.css";

const data = [{day: 'Monday', seconds: 590},
              {day: 'Tuesday', seconds: 868},
              {day: 'Wenesday', seconds: 1397},
              {day: 'Thursday', seconds: 1480},
              {day: 'Friday', seconds: 0}];

const centersData = [{name: 'Opened', value: 400}, {name: 'Closed', value: 300}];

const COLORS = ['#0088FE', '#ff7300', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Centers ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Percentage ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };


class TwoLevelPieChart extends React.Component{
    
    state = {
        activeIndex: 0,
    };

  onPieEnter = (data, index) => {
      this.setState({activeIndex: index})
  }

  render(){

    return (
        <ResponsiveContainer>
            <PieChart width={800} height={400}>
                <Pie 
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape} 
                data={centersData} 
                innerRadius={60}
                outerRadius={80} 
                fill="#8884d8"
                onMouseEnter={this.onPieEnter}
                >
                    {
                        centersData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
  }
}

class Dashboard extends React.Component{

    render(){

        const CentersStatusChart = () => {
            return (
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={centersData} fill="#8884d8" label={renderCustomizedLabel} innerRadius={40} outerRadius={80}>
                        {
                            centersData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            );
        };

        const UptimeChart = () => {
            return (
                <ResponsiveContainer>
                    <ComposedChart width={600} height={400} data={data}
                            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <CartesianGrid stroke='#f5f5f5'/>
                        <XAxis dataKey="day"/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey='seconds' barSize={20} fill='#413ea0'/>
                        <Line type='monotone' dataKey='seconds' stroke='#ff7300'/>
                    </ComposedChart>
               </ResponsiveContainer>
            );
        };

        const DowntimeChart = () => {
            return (
                <ResponsiveContainer>
                    <ComposedChart width={600} height={400} data={data}
                            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <CartesianGrid stroke='#f5f5f5'/>
                        <XAxis dataKey="day"/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey='seconds' barSize={20} fill='#413ea0'/>
                        <Line type='monotone' dataKey='seconds' stroke='#ff7300'/>
                    </ComposedChart>
               </ResponsiveContainer>
            );
        };

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
                            <UptimeChart/>
                        </div>
                    </Card>
                    <Card interactive elevation={Elevation.ONE} className="Row Downtime">
                        <h3 className="Item_Header"><Text ellipsize={true}>Log for Downtime</Text></h3>
                        <div className="Content">
                            <UptimeChart/>
                        </div>
                    </Card>

                    <Card interactive elevation={Elevation.ONE} className="Row CentersStatusChart">
                        <h3 className="Item_Header"><Text ellipsize={true}>Centers</Text></h3>
                        <div className="Content">
                            <TwoLevelPieChart/>
                        </div>
                    </Card>
                </Card>
            </div>
        );
    }
}

export default Dashboard;