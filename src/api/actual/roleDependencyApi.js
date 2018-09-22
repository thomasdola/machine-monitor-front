import axios from 'axios';

export default class RoleDependencyApi{

    static pages(token, params = {}){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/pages"
        });
    }

    static entities(token, params = {}){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/entities"
        });
    }

    static actions(token, params = {}){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/actions"
        });
    }
}