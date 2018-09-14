import axios from "axios";

export default class Machines{
    static list(params, token){
        return axios({
            method: "GET",
            url: "/api/browser/machines",
            headers: {"Authorization": `Bearer ${token}`},
            params
        });
    }
}