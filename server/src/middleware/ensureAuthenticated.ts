import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface IPayload{
    sub:string;
}

  export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    console.log({"AuthToken: ":` ${authToken}` })
    if (!authToken) {
      return response
        .status(401)
        .json({ message: "Sign in or sign up to use this function" });
    }
    const [, Token] = authToken.split(" ");

    try {
        const {sub}=verify( Token,"FlashPoint") as IPayload;
        request.user_id= sub;
      console.log(sub)
    } catch (err) {
        return response.status(401).json({message:"Your sign probabli expirate!! sign in again to solve this problem"})
    }
        return next();

  }