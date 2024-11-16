import { prismaClient } from "@database/prismaClient";

import { Request, Response } from "express";

class WorkspaceController {
    async handleCreate(request: Request, response: Response) {
        const { title, privateState } = request.body;
        console.log(request.body);
        console.log(request.user_id);
        const user_id = request.user_id;

        if (!title) {
            throw new Error("title is empty")
        }

        const userId = request.user_id;

        let loadOrder = {
            "components":[]
        } 

        let stringloadOrder = JSON.stringify(loadOrder);
        console.log("loadOrder", stringloadOrder)

        const workspace = await prismaClient.workspace.create({
            data: {
                owner: userId, private: privateState, title: title, loadOrder: stringloadOrder,chat:""
            }
        })
        
        const workspaceId = await prismaClient.workspace.findFirst({ where: { owner: user_id, title: title }, select: { id: true } })

        console.log(workspaceId);
        return response.json(workspaceId);

    }


    async hadleAddMember(request: Request, response: Response) {
        const { workspaceId, memberEmail, admin } = request.body;
        const user = request.user_id;
        if (!memberEmail || admin === null) {
            throw new Error("É necessário um E-mail e e status de admin");
        }
        if (!workspaceId) {
            throw new Error("É necessário o ID do Workspace");
        }

        const workspace = await prismaClient.workspace.findFirst({ where: { id: workspaceId, owner: user } });
        const member = await prismaClient.members.findFirst({ where: { userId: user, workspaceId: workspaceId }, select: { admin: true, workspaceName: true } })
        if (workspace) {

            const getNewMember = await prismaClient.user.findUnique({ where: { email: memberEmail }, select: { id: true, name: true } });
            const addNewMember = await prismaClient.members.create({ data: { userName: getNewMember.name, workspaceName: workspace.title, userId: getNewMember.id, workspaceId: workspaceId, admin: admin } })
            return response.send().status(200);
        }
        if (member) {
            if (member.admin === true) {
                const getNewMember = await prismaClient.user.findUnique({ where: { email: memberEmail }, select: { id: true, name: true } });
                const addNewMember = await prismaClient.members.create({ data: { userName: getNewMember.name, workspaceName: member.workspaceName, userId: getNewMember.id, workspaceId: workspaceId, admin: admin } })
                return response.send().status(200);
            }

        }
        else {
            throw new Error("Precisa ser o dono do workspace ou administrador para adicionar um membro");
        }


    }





    async handleListWorkspace(request: Request, response: Response) {
        const user = request.user_id;
        const array = [];
        const userWorkspaces = await prismaClient.workspace.findMany({ where: { owner: user }, orderBy: { created_at: 'asc' } });

        if (userWorkspaces) {
            userWorkspaces.map((m) => { array.push({ id: m.id, title: m.title, private: m.private }) });
            const userMember = await prismaClient.members.findMany({ where: { userId: user }, include: { Workspace: { select: { title: true, id: true, private: true } } } })
            console.log(userMember);
            userMember.map((m) => { array.push({ id: m.Workspace.id, title: m.Workspace.title, private: m.Workspace.private }) });
        } else {
            const userMember = await prismaClient.members.findMany({ where: { userId: user }, include: { Workspace: { select: { title: true, id: true, private: true } } }, orderBy: { Workspace: { created_at: "asc" } } })
            console.log(userMember);
            userMember.map((m) => { array.push({ id: m.Workspace.id, title: m.Workspace.title, private: m.Workspace.private }) });

        }

        console.log(array);
        return response.json(array);

    }



}
export { WorkspaceController };