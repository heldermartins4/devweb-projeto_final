import { prismaClient } from "@database/prismaClient";
class SocketDocument {
    async getHeaderData(id: string) {
        const workspaceData = await prismaClient.workspace.findFirst({ where: { id: id }, select: { title: true, owner: true, updated_at: true } });
        const Members = await prismaClient.members.findMany({ where: { workspaceId: id }, select: { userId: true } })
        const topMembers = [];
        // console.log("workspaceData",workspaceData);
        // console.log("Members",Members);
        topMembers.push(workspaceData.owner);
        if (Members.length >= 2) {
            for (let index = 0; index < 2; index++) {
                topMembers.push(Members[index].userId);

            }
        } else if (Members.length > 0) {
            topMembers.push(Members[0].userId);
        }
        const bichos = [];

        for (let index = 0; index <= topMembers.length; index++) {

            const bicho = await prismaClient.user.findFirst({ where: { id: topMembers[index] }, select: { img: true } });
            bichos.push(bicho.img);

        }


        bichos.pop();
        let date = workspaceData.updated_at;
        //    let stringData = date.toLocaleDateString("pt-br",{year:"numeric",month:"long",day:"numeric"});
        let stringData = new Intl.DateTimeFormat("pt-br", { dateStyle: "full", timeStyle: "full", }).format(date)

        let header = {
            "imgs": bichos,
            "title": workspaceData.title,
            "update_at": stringData
        }
        return header;
    }

    async handleUpdateTitle(currentRoom: string, title: string) {
        await prismaClient.workspace.update({ where: { id: currentRoom }, data: { title: title } });
        await prismaClient.members.updateMany({ where: { workspaceId: currentRoom }, data: { workspaceName: title } })
    }
    async handleGetLoadOrder(currrentRoom: string) {
        const w = await prismaClient.workspace.findFirst({ where: { id: currrentRoom }, select: { loadOrder: true } })
        const string = w.loadOrder
        let metadados = JSON.parse(string);
        // console.log("string", typeof string)
        // console.log("components",typeof components )
        let { components, loadOrder } = metadados;
        for (let i = 0; i < components.length; i++) {
            switch (components[i].compType) {
                case "Kanban":
                    const kanbanData = await prismaClient.kanban.findFirst({ where: { id: components[i].compID }, select: { metadata: true } });
                    let k = JSON.parse(kanbanData.metadata)
                    components[i].compData = k;

                    break;
                case "Table":
                    const { JsonString } = await prismaClient.table.findFirst({ where: { id: components[i].compID }, select: { JsonString: true } });
                    //    console.log("table: ",typeof JsonString);

                    let t = JSON.parse(JsonString);
                    components[i].compData = t;
                    break;
                case "Note":
                    const noteData = await prismaClient.note.findFirst({ where: { id: components[i].compID }, select: { text: true } });
                    components[i].compData = { text: noteData.text };
                    break;
                case "Youtube":
                    const youtubeLink = await prismaClient.youtube.findFirst({ where: { id: components[i].compID }, select: { link: true } });
                    components[i].compData = { link: youtubeLink.link };
                    break;
                case "Image":
                    const imagePath = await prismaClient.image.findFirst({ where: { id: components[i].compID }, select: { path: true } });
                    components[i].compData = { path: imagePath.path };
                    break;
                case "Checklist":
                    const checklisData = await prismaClient.checkList.findFirst({ where: { id: components[i].compID }, select: { metadata: true } });
                    let check = JSON.parse(checklisData.metadata)
                    components[i].compData = { data: check };
                    break;
            }

        }


        let output = {
            components,
            loadOrder
        }



        //filtrar por meio de um map o tipo de componente para pegar na tabela correta os meta dados
        return output;

    }

    async handleCreateNewComponent(currentRoom: string, component: any) {
        //filtrar o componete 

        const updateLoadOrder = async (currentRoom: string, component: any) => {
            let w = await prismaClient.workspace.findFirst({ where: { id: currentRoom }, select: { loadOrder: true } });
            const { components, loadOrder } = JSON.parse(w.loadOrder);
            components.push(component);
            loadOrder.push(components.length - 1);
            let data = { components: components, loadOrder: loadOrder }
            let metadata = JSON.stringify(data);
            await prismaClient.workspace.update({ where: { id: currentRoom }, data: { loadOrder: metadata } })
            console.log("components: ", components);

            const newComp = {
                newComponent: component,
                position: components.length - 1
            }

            // console.log("New Component:  ", newComp)
            return newComp;

        }


        const getCompData = async (newComponentObject: any) => {
            const { newComponent, position } = newComponentObject;
            // console.log("😀",newComponent)
            let data;

            switch (newComponent.compType) {
                case "Kanban":
                    console.log("😎")
                    const kanbanData = await prismaClient.kanban.findFirst({ where: { id: newComponent.compID }, select: { metadata: true } });
                    let k = JSON.parse(kanbanData.metadata);

                    newComponent.compData = k;

                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
                    break;
                case "Table":
                    const { JsonString } = await prismaClient.table.findFirst({ where: { id: newComponent.compID }, select: { JsonString: true } });
                    //    console.log("table: ",typeof JsonString);

                    let t = JSON.parse(JsonString);
                    newComponent.compData = t;
                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
                    break;
                case "Note":
                    const noteData = await prismaClient.note.findFirst({ where: { id: newComponent.compID }, select: { text: true } });
                    newComponent.compData = { text: noteData.text };
                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
                    break;
                case "Youtube":
                    const { link } = await prismaClient.youtube.findFirst({ where: { id: newComponent.compID }, select: { link: true } });
                    newComponent.compData = { link: link }
                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
                case "Image":
                    const { path } = await prismaClient.image.findFirst({ where: { id: newComponent.compID }, select: { path: true } });
                    newComponent.compData = { path: path }
                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
                case "Checklist":
                    const { metadata } = await prismaClient.checkList.findFirst({ where: { id: newComponent.compID }, select: { metadata: true } });
                    let datinha = JSON.parse(metadata)
                    newComponent.compData = datinha
                    data = {
                        newComponent: newComponent,
                        position: position
                    }
                    // console.log("New Component:  ", data)
                    return data;
            }

        }


        const metaKanban = {
            tasks: [
                { id: 0, content: "Tarefa 1" },
                { id: 1, content: "Tarefa 2 " },
                { id: 2, content: "Tarefa 3" }
            ],
            columns: [
                {
                    id: "0",
                    title: "Caixa de entrada",
                    color: "#1b95df",
                    taskIds: [0, 1, 2],
                }, {
                    id: "1",
                    title: "Emergência",
                    color: "#e4254f",
                    taskIds: [],
                }, {
                    id: "2",
                    title: "Em Andamento",
                    color: "#e0c111",
                    taskIds: [],
                }, {
                    id: "3",
                    title: "Em teste",
                    color: "#8321db",
                    taskIds: [],
                }, {
                    id: "4",
                    title: "Concluído",
                    color: "#32d762",
                    taskIds: [],
                }
            ],
            columnOrder: [0, 1, 2, 3, 4]
        }
        const metaTable = {
            columns: [
                ["", "", ""],
                [
                    "",
                    "",
                    "",
                ],
                [
                    "",
                    "",
                    "",
                ],
                [
                    "",
                    "",
                    "",
                ],
            ],
        }
        const checklistMetadata = {
            tasks: [
                {
                    taskId: 1,
                    taskState: false,
                    taskContent: "Comprar pão às 16h"
                },
                {
                    taskId: 2,
                    taskState: false,
                    taskContent: "Fazer notification p/ Cub's"
                },
                {
                    taskId: 3,
                    taskState: true,
                    taskContent: "Estudar o componente Calendário"
                },
            ]
        }

        const type = component.compType;
        console.log("c", component, type)
        let newComp;
        switch (type) {
            case "Kanban":
                const kanban = await prismaClient.kanban.create({ data: { Title: "Kanban", workspaceId: currentRoom, metadata: JSON.stringify(metaKanban) } });
                component.compID = kanban.id;
                console.log(component);
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp);

                break;
            case "Table":
                const table = await prismaClient.table.create({ data: { tableName: "Tabela", workspaceId: currentRoom, JsonString: JSON.stringify(metaTable) } })
                component.compID = table.id;
                console.log(component);
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp)

                break;
            case "Note":
                const note = await prismaClient.note.create({ data: { text: "", workspaceId: currentRoom } })
                component.compID = note.id;
                console.log(component);
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp);

                break;
            case "Youtube":
                const youtube = await prismaClient.youtube.create({ data: { link: "", workspaceId: currentRoom } });
                component.compID = youtube.id;
                console.log(component);
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp);
            case "Image":
                const image = await prismaClient.image.create({ data: { workspaceId: currentRoom, path: "" } })
                component.compID = image.id;
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp);
            case "Checklist":
                const checklist = await prismaClient.checkList.create({ data: { metadata: JSON.stringify(checklistMetadata), workspaceId: currentRoom } })
                component.compID = checklist.id;
                newComp = await updateLoadOrder(currentRoom, component)
                return await getCompData(newComp);

        }


    }







    async getMembersControllers(id, currentRoom) {
        const newMembers = [];
        const { owner } = await prismaClient.workspace.findFirst({ where: { id: currentRoom }, select: { owner: true } })
        if (owner === id) {
            let members = await prismaClient.members.findMany({ where: { workspaceId: currentRoom }, select: { userId: true, admin: true } })
          
            members.map(async (m) => {
                const { email, img, name } = await prismaClient.user.findFirst({ where: { id: m.userId }, select: { img: true, email: true, name: true } })
                newMembers.push({ email: email, img: img, name: name, admin: m.admin })
                // console.log({ email: email, img: img, name: name, admin: m.admin })
            })
            console.log(newMembers)
            return newMembers;
        }






    }







}
export { SocketDocument };