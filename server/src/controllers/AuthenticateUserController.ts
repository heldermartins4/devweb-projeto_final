import { Request, Response } from "express";
import { prismaClient } from "@database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
class AuthenticateUserController{
async handle(request: Request, response: Response){
    const { email, password } = request.body;
    const user = await prismaClient.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new Error("E-mail & Senha incorretos!!!");
    }
    if (user.email != email) {
      throw new Error("E-mail & Senha incorretos!!!☣");
    }

   
    console.log(user,user.email != email)
    console.log(password)


    const passwordMath = await compare(password,user.password);
    console.log(passwordMath)
    if (!passwordMath) {
      throw new Error("E-mail & Senha incorretos!!!");
    }

    const Token = sign(
      {
        email: user.email,
        name: user.name,
      },
      "FlashPoint",
      {
        subject: user.id,
        expiresIn: "7d",
      }
    );
    console.log(Token);
    return response.json(Token);
}
}
export{AuthenticateUserController};