import * as actions from '../helpers/constants';
// import MachinesApi from '../api/mock/Machines';
import MachinesApi from '../api/actual/Machines';

export const loadMachines = (params, token) => dispatch => {
    dispatch({type: actions.LOAD_MACHINES});
    return MachinesApi
        .list(params, token)
        .then(({data}) => {
            dispatch({type: actions.LOAD_MACHINES_SUCCESS, machines: data});
        })
        .catch(error => {
            dispatch({type: actions.LOAD_MACHINES_FAILED});
            console.log(error);
        });
};