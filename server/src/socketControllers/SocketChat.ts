import { prismaClient } from "@database/prismaClient";



class SocketChat {
    async addNewMessage(data: any, id: string, currentRoom: string) {
        const user = await prismaClient.user.findFirst({ where: { id: id }, select: { img: true, name: true, email: true } });
        data["icon"] = user.img;
        data["name"] = user.name;
        data["email"] = user.email;
        // pegar messages no workspace chat e adicionar esta nova mensagem ao array e salvar devolta no banco
        console.log(data)
        const { chat } = await prismaClient.workspace.findFirst({ where: { id: currentRoom }, select: { chat: true } });
        const { messages } = JSON.parse(chat);
        // console.log(messages)
        messages.push(data)
        const stringChat = JSON.stringify({ messages: messages })
        // console.log(stringChat);
        await prismaClient.workspace.update({ where: { id: currentRoom }, data: { chat: stringChat } });
       return data;
    }
    async getMessages(currentRoom:string){
      const {chat}= await prismaClient.workspace.findFirst({where:{id:currentRoom},select:{chat:true}});
       const {messages} = JSON.parse(chat);
       return messages;
    }
}
export { SocketChat };