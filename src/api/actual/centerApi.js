import axios from 'axios';

export default class CenterApi{

    static list(token, params){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/centers"
        });
    }

    static add(token, data){
        return axios({
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: "/api/browser/centers"
        });
    }

    static edit(token, center, data){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: `/api/browser/centers/${center}`
        });
    }

    static delete(token, center){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            url: `/api/browser/centers/${center}`
        });
    }
}