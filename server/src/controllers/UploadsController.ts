import { prismaClient } from "@database/prismaClient";

import { Request, Response } from "express";
import { close } from "fs";

class UploadsController {
    async userproflie(request: Request, response: Response) {
        const id = request.user_id;
        const { filename } = request.file;
        await prismaClient.user.update({ where: { id: id }, data: { img: filename } })
        return response.json(request.file)

    }
    async DocumentImage(request: Request, response: Response) {
        const { filename } = request.file;
        const [currentRoom,imageId] = request.headers.authorization.split(" ")
        console.log(currentRoom, "currentRoom")
        const { id} = await prismaClient.image.findFirst({ where: { id:imageId}, select: { id: true } });
        if (id) {
            await prismaClient.image.update({ where: { id: id }, data: { path: "http://localhost:5000/Document/"+filename } })
        } else {
            await prismaClient.image.create({ data: { path:"http://localhost:5000/Document/"+ filename, workspaceId: currentRoom } })
        }


        return response.json(request.file)


    }
}
export { UploadsController };