import axios from 'axios';

export default class UserApi{

    static list(token, params){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/users"
        });
    }

    static add(token, data){
        return axios({
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: "/api/browser/users"
        });
    }

    static edit(token, user, data){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            data,
            url: `/api/browser/users/${user}`
        });
    }

    static delete(token, user){
        return axios({
            method: "PUT",
            headers: {"Authorization": `Bearer ${token}`},
            url: `/api/browser/users/${user}`
        });
    }
}