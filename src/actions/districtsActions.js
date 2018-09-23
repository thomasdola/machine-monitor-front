import * as actionTypes from '../helpers/constants';
import DistrictsApi from '../api/actual/districtsApi';

export const selectDistrict = district => ({type: actionTypes.SELECT_DISTRICT, district});

export const loadDistricts = (token, params = {}) => dispatch => {
    dispatch({type: actionTypes.LOAD_DISTRICTS});

    return DistrictsApi
        .list(token, params)
        .then(({data: {districts}}) => {
            dispatch({type: actionTypes.LOAD_DISTRICTS_SUCCESSFUL, policies: districts});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_DISTRICTS_FAILED});
            console.log(error);});
};