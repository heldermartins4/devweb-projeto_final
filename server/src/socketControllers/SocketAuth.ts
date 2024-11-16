import { verify } from "jsonwebtoken";
interface IPayload {
    sub: string;
}
class SocketAuth{
    authentication(token){
        const authToken = token;
        const [, Token] = authToken.split(" ");

        const { sub } = verify(Token, "FlashPoint") as IPayload;
       
        console.log(sub);
        return sub;
    }
}
export{SocketAuth};