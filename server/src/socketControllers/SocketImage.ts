import { prismaClient } from "@database/prismaClient";

class SocketImage{

    async UpdateLink(imageId,link){
await prismaClient.image.update({where:{id:imageId},data:{path:link}})
    }
}
export{SocketImage};