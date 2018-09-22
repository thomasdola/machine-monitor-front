import axios from 'axios';

export default class BackupApi{
    static list(token, params){
        return axios({
            method: "GET",
            url: `/api/browser/logs`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }

    static export(token, params){
        return axios({
            method: "GET",
            url: `/api/browser/logs/export`,
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }
}