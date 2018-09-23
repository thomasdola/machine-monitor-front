import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../Common/loading';

export const CentersTable = Loadable({
    loader: () => import('./centers'),
    loading: () => <Loading/>,
});

export const DeploymentTable = Loadable({
    loader: () => import('./deployment'),
    loading: () => <Loading/>,
});