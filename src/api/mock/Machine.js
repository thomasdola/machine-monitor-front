import delay from '../../helpers/delay';
import _find from "lodash/find";
import db from "../../helpers/db";

export default class Machine{
    static get(value, type = "id"){
        const mrw = _find(db.machines, {[type]: value});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static deployments(value, type = "id", pagination){
        const mrw = _find(db.machines, {[type]: value});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static issues(value, type = "id", pagination){
        const mrw = _find(db.machines, {[type]: value});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }

    static logs(value, type = "id", pagination){
        const mrw = _find(db.machines, {[type]: value});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mrw ? resolve({data: mrw}) : reject({status: 404});
            }, delay);
        });
    }
}