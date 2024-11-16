import { prismaClient } from "@database/prismaClient";

class SocketNote{
    async updateNote(NoteId,text){
         await prismaClient.note.update({where:{id:NoteId},data:{text:text}})

    }
}
export{SocketNote};