import { prismaClient } from "@database/prismaClient";
class SocketKanban{
 async handleGetTitle(kanbanID:string){
     const {Title}=await prismaClient.kanban.findFirst({where:{id:kanbanID},select:{Title:true}});
     return Title;
 }
 async handleUpdateTitle(kanbanID:string,title:string){
    await prismaClient.kanban.update({where:{id:kanbanID},data:{Title:title}});

 }
 async handleUpdateKanbanMetadata(metadata,kabanId:string){
    // console.log(kabanId,metadata)
    const string = JSON.stringify(metadata);
await prismaClient.kanban.update({where:{id:kabanId},data:{metadata:string}})
 }
}
export{SocketKanban};
