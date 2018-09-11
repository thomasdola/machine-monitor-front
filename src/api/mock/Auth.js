import delay from '../../helpers/delay';
import db from '../../helpers/db';

export default class Auth{
    static login(credentials){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({user: db.user})
            }, delay);
        });
    }

    static logout(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({logout: true})
            }, delay);
        });
    }
}