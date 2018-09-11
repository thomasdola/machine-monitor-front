import {MRW_UPDATED} from "../../helpers/constants";

export const initListeners = ({socket, channel, onMRWUpdated}) => {
    let cha = socket.channel(channel, {});
    cha.on(MRW_UPDATED, mrw => onMRWUpdated(JSON.parse(mrw)));
};

export const onMRWUpdated = mrw => ({type: MRW_UPDATED, mrw});