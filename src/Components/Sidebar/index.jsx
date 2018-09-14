import React from 'react';

import {Link} from "react-router-dom";
import './index.css';
import {connect} from "react-redux";
// import * as gates from '../../api/constants/Gates';
// import Can from "../../helpers/Can";

class Sidebar extends React.Component{
        render(){
            // const {authUser: {root}, authUser} = this.props;
            // const allowed = page => root || Can.User(authUser).access(page);

            return [
                <nav key="topNav">
                    <ul className="mm-sidebar-menu">
                        {/*{allowed(gates.DASHBOARD)*/}
                        {/*&& (*/}
                            <li className="mm-sidebar-menu-item">
                                <Link
                                    to={'/'}
                                    className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        {/*)}*/}

                        {/*{allowed(gates.MACHINES)*/}
                        {/*&& (*/}
                            <li className="mm-sidebar-menu-item">
                                <Link
                                    to={'/machines'}
                                    className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-walk">
                                    Machines
                                </Link>
                            </li>
                        {/*)}*/}

                        {/*{allowed(gates.REPORTS)*/}
                        {/*&& (*/}
                            {/*<li className="bms-sidebar-menu-item">*/}
                                {/*<Link*/}
                                    {/*to={'/reports'}*/}
                                    {/*className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-timeline-area-chart">*/}
                                    {/*Reports*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                        {/*)}*/}

                        {/*{allowed(gates.ROLES)*/}
                        {/*&& (*/}
                            {/*<li className="bms-sidebar-menu-item">*/}
                                {/*<Link*/}
                                    {/*to={'/roles'}*/}
                                    {/*className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-key">*/}
                                    {/*User Groups*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                        {/*)}*/}

                        {/*{allowed(gates.USERS)*/}
                        {/*&& (*/}
                            {/*<li className="bms-sidebar-menu-item">*/}
                                {/*<Link*/}
                                    {/*to={'/users'}*/}
                                    {/*className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-people">*/}
                                    {/*Users*/}
                                {/*</Link>*/}
                            {/*</li>*/}
                        {/*)}*/}

                    </ul>
                </nav>,

                <nav key="bottomNav">
                    <ul className="mm-sidebar-menu">

                        {/*{allowed(gates.LOGS)*/}
                        {/*&& (*/}
                            <li className="mm-sidebar-menu-item">
                                <Link
                                    to={'/audit-trail'}
                                    className="bp3-button bp3-large bp3-fill bp3-minimal bp3-icon-standard bp3-icon-console">
                                    Audit Trail
                                </Link>
                            </li>
                        {/*)}*/}

                    </ul>
                </nav>
            ];
        }
}

// export default connect(({authUser}) => ({authUser}))(Sidebar);
export default Sidebar;