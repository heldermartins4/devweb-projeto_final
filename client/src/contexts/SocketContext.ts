import React from "react";
import { io } from "socket.io-client";

const host = process.env.HOST_CLIENTSERVER || "http://127.0.0.1:5000";

export const socket = io(host);
const SocketContext = React.createContext(socket);
export const SocketProvider = SocketContext.Provider;
// export const SocketConsumer = SocketContext.Consumer;
export default SocketContext;
