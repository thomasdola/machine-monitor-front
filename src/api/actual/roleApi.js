import axios from 'axios';

export default class RoleApi{

    static list(token, params){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/roles"
        });
    }

    static add(token, data){
        return axios({
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: "/api/browser/roles"
        });
    }

    static edit(token, role, data){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: `/api/browser/roles/${role}`
        });
    }

    static delete(token, role){
        return axios({
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`},
            url: `/api/browser/roles/${role}`
        });
    }
}