import {MACHINES_UPDATED} from "../../helpers/constants";

export const initListeners = ({channel, onMachinesUpdated}) => {
    channel.on(MACHINES_UPDATED, machines => onMachinesUpdated(machines));
};

export const onMachinesUpdated = ({machines}) => ({type: MACHINES_UPDATED, machines});