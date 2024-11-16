import { prismaClient } from "@database/prismaClient";
import { hash } from "bcryptjs";
import { Request, Response } from "express";
class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, password, email } = request.body;
        console.log(request.body);
        if (!name) {
            throw new Error("name incorrect");
        }
        if (!email) {
            throw new Error("Email incorrect");
        }
        console.log("Password", password);


        if (!password) {
            throw new Error("Password is empity");
        }

        const passwordHash = await hash(password, 8);

        const userEmail = await prismaClient.user.findFirst({ where: { email: email }, select: { email: true } });


        if (userEmail != null) {
            throw new Error("Este email ja esta cadastrado!");
        }
        const bixos = ["aguia", "bicho_preguica", "bode", "castor", "cavalo", "cervo", "coruja",
            "crocodilo", "elefante", "girafa", "gorila", "guaxinim", "hipopotamo", "lama", "leao",
            "lobo", "macaco", "meerkat", "panda", "pinguim", "raposa", "tigre", "touro", "urso",
            "zebra"];

            const bName = bixos[Math.floor(Math.random() * bixos.length)];

         let bImg = bName + ".png";
         console.log(bImg);


        const user = await prismaClient.user.create({
            data: { name: name, password: passwordHash, email: email, img: bImg }
        });

        return response.json(user);

    }
}
export { CreateUserController };