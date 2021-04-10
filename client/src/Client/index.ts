import { io } from "socket.io-client";

const socket = io("192.168.1.88:3002", { transports: ['websocket'] });

socket.on("connect", () => {

});
export default socket;
