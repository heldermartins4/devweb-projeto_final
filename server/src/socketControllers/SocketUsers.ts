import { prismaClient } from "@database/prismaClient";
class SocketUsers {
    async getMembers(text: string) {
        if (text != "" && text != null) {
            const Emails = await prismaClient.user.findMany({ where: { email: { startsWith: text } }, select: { email: true, img: true } });
            return Emails;
        }


    }
    async verifyEmail(email: string) {
        const user = await prismaClient.user.findFirst({ where: { email: email } });
        if (!user) {
            console.log("e-mail não existe");
            return false;
        }
        else {
            console.log("e-mail existe");
            return true;
        }
    }
    async getUserEmail(id: string) {
        const email = await prismaClient.user.findFirst({ where: { id: id }, select: { email: true } });
        return email.email;
    }
    async getProfileData(id: string) {
        const user = await prismaClient.user.findFirst({ where: { id: id }, select: { img: true, email: true, name: true,created_at:true } });
        const data = {
            email: user.email,
            icon: user.img,
            name: user.name,
            created_at:user.created_at
        }
        return data;
    }
    async changeUserName(id,name){
       await prismaClient.user.update({where:{id:id},data:{name:name}})

    }
    async changeAnimal(id,animal){
        await prismaClient.user.update({where:{id:id},data:{img:animal}})
    }
    async userLevel(id,currentRoom){
        //pegar dono da sala, comparar caso seja retornar, caso não checar nivel de membro
        const {owner}= await prismaClient.workspace.findFirst({where:{id:currentRoom},select:{owner:true}})
        if (id === owner) {
            return "owner";
        }
        else{
           const {admin}= await prismaClient.members.findFirst({where:{userId:id,workspaceId:currentRoom},select:{admin:true}})
            if (admin ===true) {
                return "admin";
            }else{
                return "guest";
            }
       
        }
    
    
    }
}
export { SocketUsers };