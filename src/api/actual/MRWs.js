import axios from 'axios';
const queryString = require('query-string');

export default class MRWS{
    static list(params){
        return axios.get(`/api/mrws?${queryString.stringify(params)}`);
    }

    static single(value, column){
        return axios.get(`/api/mrws/${value}?by=${column}`);
    }

    static logs(value, column){
        return axios.get(`/api/mrws/${value}/logs?by=${column}`);
    }
}