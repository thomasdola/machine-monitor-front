import axios from 'axios';

export default class RegionsApi{

    static list(token, params = {}){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/regions"
        });
    }
}