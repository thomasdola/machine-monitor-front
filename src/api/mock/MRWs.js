import delay from '../../helpers/delay';
import db from '../../helpers/db';
import _find from 'lodash/find';

export default class MRWS{
    static list(params){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    {data: db.mrws})
            }, delay);
        });
    }

    static single(value, type = "id"){
        const mrw = _find(db.mrws, {[type]: value});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static logs(value, type){
        const mrw = _find(db.mrws, {[type]: value}) || {};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static deployments(value, type){
        const mrw = _find(db.mrws, {[type]: value}) || {};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static issues(value, type){
        const mrw = _find(db.mrws, {[type]: value}) || {};
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }
}