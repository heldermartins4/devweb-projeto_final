import { prismaClient } from "@database/prismaClient";
class SocketYoutube{
 async updateYoutube(youtubeId,link){
 await prismaClient.youtube.update({where:{id:youtubeId},data:{link:link}})
 }
}
export{SocketYoutube};