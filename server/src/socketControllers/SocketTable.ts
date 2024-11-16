import { prismaClient } from "@database/prismaClient";

class SocketTable{
async updateMetadata(tableId, metadata){
    let string = JSON.stringify(metadata)
await prismaClient.table.update({where:{id:tableId},data:{JsonString:string}})
}
}
export{SocketTable};