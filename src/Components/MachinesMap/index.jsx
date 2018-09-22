import React from 'react';
import PropTypes from 'prop-types';
import {Card, Elevation} from "@blueprintjs/core";
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {createXYZ} from 'ol/tilegrid';
import "./index.css";

import { apply } from 'ol-mapbox-style';

class MachinesMap extends React.Component {

    componentDidMount(){
        // const map = new MachinesMap({
        //     target: 'map',
        //     view: new  View({
        //         center: [0, 0],
        //         zoom: 2
        //     })
        // });
        //
        // const tilegrid = createXYZ({tileSize: 512, maxZoom: 14});
        //
        // const layer = new VectorTileLayer({
        //     source: new VectorTileSource({
        //         attributions: [
        //             '<a href="http://www.openmaptiles.org/" target="_blank"></a>',
        //             '<a href="http://www.openstreetmap.org/about/" target="_blank"></a>'
        //         ],
        //         format: new MVT(),
        //         tileGrid: tilegrid,
        //         tilePixelRatio: 8,
        //         url: `http://localhost:8080/data/v3/{z}/{x}/{y}.pbf`
        //     })
        // });

        // fetch('http://localhost:8080/styles/osm-bright/style.json').then(function(response) {
        //     response.json().then(function(glStyle) {
        //         olms.applyStyle(layer, glStyle, 'openmaptiles').then(function() {
        //             console.log("got styles");
        //             map.addLayer(layer);
        //         });
        //     });
        // });
    }

    render() {
        return (
            <div className="Map__Page">
                <div className="Map__Box">
                    <div id="map"/>
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

                    <div className="Content">
                        <div className="Machine">
                            <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-map-marker"/>
                            <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-send-to-map"/>
                            <div className={"Name"}>M0024</div>
                        </div>
                    </div>
                </Card>

            </div>
        );
    }
}

export default MachinesMap;