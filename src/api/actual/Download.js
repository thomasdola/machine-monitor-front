import axios from 'axios';

export default class Download{
    static download(token, params){
        return axios({
            method: "GET",
            url: `/api/browser/download`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }
}