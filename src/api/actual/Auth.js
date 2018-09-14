import axios from 'axios';

export default class Auth{
    static login(credentials){
        return axios.post("/api/browser/auth/login", credentials);
    }

    static logout(token){
        return axios.post("/api/browser/auth/logout", null, {headers: {"Authorization": `Bearer ${token}`}});
    }
}