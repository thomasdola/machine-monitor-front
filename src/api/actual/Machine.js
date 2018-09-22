import axios from 'axios';

export default class Machine{
    static get(name, type = "id", token){
        return axios({
            method: "GET",
            url: `/api/browser/machines/${name}`,
            headers: {"Authorization": `Bearer ${token}`},
            params: {type}
        });
    }

    static logs(value, params, token){
        return axios({
            method: "GET",
            url: `/api/browser/machines/${value}/logs`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }

    static deployments(value, params, token){
        return axios({
            method: "GET",
            url: `/api/browser/machines/${value}/deployments`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }

    static issues(value, params, token){
        return axios({
            method: "GET",
            url: `/api/browser/machines/${value}/issues`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }
}