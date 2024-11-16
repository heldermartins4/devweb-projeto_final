import express,{Request,Response,NextFunction} from "express";
import http from "http";
import cors from 'cors';
import { Server } from "socket.io";
const app = express();
import "express-async-errors";
import {router} from "./routes";
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(router);
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            console.log(`ERRO: ${err.message}`)
          return response.status(400).json({
            error: err.message,
          });
        }
    
        return response.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
);

const serverHTTP = http.createServer(app);
const io = new Server(serverHTTP,{cors:{origin:'*'}});

export{serverHTTP,io};