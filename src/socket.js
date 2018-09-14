import {Socket} from "phoenix"

const token = localStorage.getItem("token");

let socket = new Socket("/socket", {params: {token}});
socket.connect();

export default socket
