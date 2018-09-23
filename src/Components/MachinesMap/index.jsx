import React from 'react';
import PropTypes from 'prop-types';
import {Card, Elevation, Text} from "@blueprintjs/core";
// import MapBox from 'mapbox-gl';
import ReactMapboxGl, {Layer, Feature, Marker, Popup} from "react-mapbox-gl";
import styled from 'styled-components';
import "./index.css";

const MapStyles = "http://localhost:8080/styles/osm-bright/style.json";
// const MapStyles = "http://localhost:8080/styles/klokantech-basic/style.json";
// const MapStyles = "mapbox://styles/mapbox/streets-v9";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidGhvbWFzZG9sYSIsImEiOiJjam1kMjc1Z3YwZHVqM3ZvOTgwNnQyYnRkIn0.UNorgXPzOgTn0790NM1g3Q",
    minZoom: 5
});

const Mark = styled.div`
  background-color: #e74c3c;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 4px solid #eaa29b;
`;

// const bonds = [[-0.31778, 5.51299], [-0.13891, 5.62848]];
// const bonds = [[ -0.437, 5.475], [-0.071, 5.675 ]];
const bonds = [[-0.24197,5.52626], [-0.14721,5.64585]];
const center = [-0.1791814, 5.6260225];

class MachinesMap extends React.Component {

    state = {current: null};

    render() {
        return (
            <div className="Map__Page">
                <div className="Map__Box">
                    <Map
                        fitBounds={bonds}
                        zoom={[13]}
                        center={this.state.current || center}
                        containerStyle={{height: '100%', width: '100%'}}
                        style={MapStyles}>

                        {this.state.current && (
                            <Popup
                                className={"Center__Details__Popup"}
                                coordinates={this.state.current}
                                offset={{'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]}}>
                                <Card elevation={Elevation.ONE} className={"Header"}>
                                    <Text ellipsize={true}>Center Name (code)</Text>
                                </Card>
                                <div className={"Content"}>
                                    <div className="Machine">
                                        <span className="Name">M0214</span>
                                        <span className="Status">ON</span>
                                    </div>
                                    <div className="Machine">
                                        <span className="Name">M0215</span>
                                        <span className="Status">OFF</span>
                                    </div>
                                </div>
                            </Popup>
                        )}

                        <Marker onClick={() => this.setState({current: center})}
                                coordinates={center}>
                            <Mark />
                        </Marker>

                        <Marker onClick={() => this.setState({current: [-0.17349749999993946, 5.622225199999999]})}
                                coordinates={[-0.17349749999993946, 5.622225199999999]}>
                            <Mark />
                        </Marker>

                        <Marker onClick={() => this.setState({current: [-0.18847200000004705, 5.579750000000001]})}
                                coordinates={[-0.18847200000004705, 5.579750000000001]}>
                            <Mark />
                        </Marker>

                    </Map>
                </div>

                <Card
                    elevation={Elevation.TWO}
                    className="Machines__Box">
                    <div className="Header">
                        <div className="bp3-input-group .modifier">
                            <span className="bp3-icon bp3-icon-search"/>
                            <input type="text" className="bp3-input" placeholder="M0024..."/>
                            <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"/>
                        </div>
                    </div>
                </Card>

            </div>
        );
    }
}

export default MachinesMap;