import { prismaClient } from "@database/prismaClient";
class SocketChecklist {
    async updateChecklist(checklistId, metadata) {
        let s = JSON.stringify(metadata)
        await prismaClient.checkList.update({ where: { id: checklistId }, data: { metadata: s } })
    }
}
export { SocketChecklist };