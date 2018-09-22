import _forOwn from 'lodash/forOwn';
import _isArray from 'lodash/isArray';
import _every from 'lodash/every';

export const makeid = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export function isFormValid(form){
    let valids = [];
    _forOwn(form, (value, key) => {
        if(typeof(value) === "number"){
            if(value){
                valids = [...valids, {[key]: value, valid: true}]
            }else{
                valids = [...valids, {[key]: value, valid: false}]
            }
        }else if(typeof(value) === "string"){
            if(value.trim().length > 0){
                valids = [...valids, {[key]: value, valid: true}]
            }else{
                valids = [...valids, {[key]: value, valid: false}]
            }
        }else if(_isArray(value)){
            if(value.length > 0){
                valids = [...valids, {[key]: value, valid: true}]
            }else{
                valids = [...valids, {[key]: value, valid: false}]
            }
        }else{
            valids = [...valids, {[key]: value, valid: false}]
        }
    });

    console.log('form validation', valids);

    return _every(valids, 'valid');
}