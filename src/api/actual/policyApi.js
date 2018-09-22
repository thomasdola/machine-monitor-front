import axios from 'axios';

export default class PolicyApi{

    static list(token, params){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/policies"
        });
    }

    static add(token, data){
        return axios({
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: "/api/browser/policies"
        });
    }

    static edit(token, policy, data){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: `/api/browser/roles/${policy}`
        });
    }

    static delete(token, policy){
        return axios({
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`},
            url: `/api/browser/roles/${policy}`
        });
    }
}