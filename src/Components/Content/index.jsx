import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../Loading';
import {AuthorizedRoute} from '../../index';
import * as gates from '../../api/constants/Pages';
import {connect} from "react-redux";
import MachinesMap from '../MachinesMap';

const Dashboard = Loadable({
    loader: () => import('../Dashboard'),
    loading: () => <Loading/>,
});

const Machines = Loadable({
    loader: () => import('../Machines'),
    loading: () => <Loading/>,
});

const Machine = Loadable({
    loader: () => import('../Machines/Machine'),
    loading: () => <Loading/>,
});

const Roles = Loadable({
    loader: () => import('../Roles'),
    loading: () => <Loading/>,
});

const Users = Loadable({
    loader: () => import('../Users'),
    loading: () => <Loading/>,
});

const AuditTrail = Loadable({
    loader: () => import('../AuditTrail'),
    loading: () => <Loading/>,
});

const Consumables = Loadable({
    loader: () => import('../Consumables'),
    loading: () => <Loading/>,
});
//
// const MachinesMap = Loadable({
//     loader: () => import('../MachinesMap'),
//     loading: () => <Loading/>,
// });

const Unauthorized = Loadable({
    loader: () => import('../Unauthorized'),
    loading: () => <Loading/>,
});

class Content extends React.Component{
    render(){
        const {authUser: user} = this.props;
        return [
            
            <AuthorizedRoute
                exact
                key={"Machines"}
                path={"/machines"}
                user={user}
                page={gates.MACHINES}
                component={Machines}/>,

            <AuthorizedRoute
                exact
                key={"Machine"}
                path={"/machines/:mrw"}
                user={user}
                page={gates.MACHINES}
                component={Machine}/>,

            <AuthorizedRoute
                key={"Roles"}
                path={"/roles"}
                user={user}
                page={gates.ROLES}
                component={Roles}/>,

            <AuthorizedRoute
                key={"Users"}
                path={"/users"}
                user={user}
                page={gates.USERS}
                component={Users}/>,

            <AuthorizedRoute
                key={"Map"}
                path={"/map"}
                user={user}
                page={gates.MAP}
                component={MachinesMap}/>,

            <AuthorizedRoute
                key={"Consumables"}
                path={"/consumables"}
                user={user}
                page={gates.CONSUMABLES}
                component={Consumables}/>,

            <AuthorizedRoute
                key={"AuditTrail"}
                path={"/audit-trail"}
                user={user}
                page={gates.LOGS}
                component={AuditTrail}/>,

            <Route key={"Unauthorized"} path={"/unauthorized"} component={Unauthorized}/>,

            <Route exact key={"Dashboard"} path={"/"} component={Dashboard}/>,
        ];
    }
}

export default withRouter(connect(({authUser}) => ({authUser}))(Content));