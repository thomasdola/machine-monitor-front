import * as actionTypes from '../helpers/constants';
import RegionsApi from '../api/actual/regionsApi';

export const selectRegion = region => ({type: actionTypes.SELECT_REGION, region});

export const loadRegions = (token, params = {}) => dispatch => {
    dispatch({type: actionTypes.LOAD_REGIONS});

    return RegionsApi
        .list(token, params)
        .then(({data: {regions}}) => {
            dispatch({type: actionTypes.LOAD_REGIONS_SUCCESSFUL, regions});
        })
        .catch(error => {
            dispatch({type: actionTypes.LOAD_REGIONS_FAILED});
            console.log(error);});
};