import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../Loading';
import {AuthorizedRoute} from '../../index';
import * as gates from '../../api/constants/Gates';
import {connect} from "react-redux";

const Machines = Loadable({
    loader: () => import('../Machines'),
    loading: () => <Loading/>,
});

const Machine = Loadable({
    loader: () => import('../Machines/Machine'),
    loading: () => <Loading/>,
});

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

            <Route key={"Unauthorized"} path={"/unauthorized"} component={Unauthorized}/>
        ];
    }
}

export default withRouter(connect(({authUser}) => ({authUser}))(Content));