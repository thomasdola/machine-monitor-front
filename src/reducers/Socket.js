import * as actions from "../helpers/constants";

export const socket = (state = {}, action) => {
    switch (action.type){
        case actions.SOCKET_READY:
            return action.socket;
        default:
            return state;
    }
};

export const userChannel = (state = {}, action) => {
    switch (action.type){
        case actions.SOCKET_READY:
            return action.userChannel;
        default:
            return state;
    }
};