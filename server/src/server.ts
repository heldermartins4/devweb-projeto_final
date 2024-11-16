import { serverHTTP } from "./http"
import './websockets';

const PORT = process.env.PORT || 5000

serverHTTP.listen(PORT,()=>{console.log("server is running")});