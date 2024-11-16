import React from "react";
import { io } from "socket.io-client";
import { host } from "../utils/host";

export const socket = io(host);
const SocketContext = React.createContext(socket);
export const SocketProvider = SocketContext.Provider;
// export const SocketConsumer = SocketContext.Consumer;
export default SocketContext;
