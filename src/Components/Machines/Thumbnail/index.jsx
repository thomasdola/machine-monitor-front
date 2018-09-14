import React from 'react';
import PropTypes from 'prop-types';
import {Card, ContextMenuTarget, Elevation, Intent, Menu, Tag} from "@blueprintjs/core";
import {Link, withRouter} from 'react-router-dom';
import laptopInactive from '../../../notebook-computer.inactive.svg';
import laptopActive from '../../../notebook-computer.active.svg';
import "./index.css";

class Machine extends React.Component {

    render() {
        const {name} = this.props;
        const actionsMenu = (
            <Menu>
                <Link to={`${name}`} className="bp3-menu-item bp3-icon-info-sign">More Information</Link>
                <Link to={`${name}/logs`} className="bp3-menu-item bp3-icon-person">Logs</Link>
            </Menu>
        );

        return (
            <Link to={`/machines/${name}`}>
                <Card interactive={true} elevation={Elevation.TWO} className="MRW_Card">
                    <div className="Content">
                        <img alt="MRW" width={25} height={25} src={this.props.active ? laptopActive : laptopInactive}/>
                        <div className="Extra">
                            <Tag minimal intent={this.props.active ? Intent.SUCCESS : Intent.DANGER}>
                                {this.props.name.substr(3)}
                            </Tag>
                        </div>
                    </div>
                </Card>
            </Link>
        );
    }

    renderContextMenu = () => {
        // return a Machines element, or nothing to use default browser behavior
        return (
            <Menu>
                <a className="bp3-menu-item bp3-icon-info-sign">More Information</a>
                <a className="bp3-menu-item bp3-icon-person">Logs</a>
            </Menu>
        );
    };

    onContextMenuClose = () => {
        // Optional method called once the context menu is closed.
    };

    viewMachine = (name) => {
        const {match: {path}, history} = this.props;
        history.push(`/${path}/${name}`);
    };

    static propTypes = {
        active: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    };
}

export default withRouter(ContextMenuTarget(Machine));