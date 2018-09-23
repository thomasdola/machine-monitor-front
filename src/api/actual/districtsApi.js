import axios from 'axios';

export default class DistrictsApi{

    static list(token, params = {}){
        return axios({
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            params,
            url: "/api/browser/regions"
        });
    }
}