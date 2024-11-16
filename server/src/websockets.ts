import { io } from "./http";
import { SocketAuth } from "./socketControllers/SocketAuth";
import { SocketChat } from "./socketControllers/SocketChat";
import { SocketChecklist } from "./socketControllers/SocketChecklist";
import { SocketDocument } from "./socketControllers/SocketDocument";
import { SocketImage } from "./socketControllers/SocketImage";
import { SocketKanban } from "./socketControllers/SocketKanban";
import { SocketNote } from "./socketControllers/SocketNote";
import { SocketTable } from "./socketControllers/SocketTable";
import { SocketUsers } from "./socketControllers/SocketUsers";
// import { prismaClient } from "../src/database/prismaClient";

import { SocketWorkspaces } from "./socketControllers/SocketWorkspace";
import { SocketYoutube } from "./socketControllers/SocketYoutube";



interface roomUsers {
    socket_id: string;
    user_id: string;
    room: string;
}

const users: roomUsers[] = [];
const socketWorkspaces = new SocketWorkspaces();
const socketAuth = new SocketAuth();
const socketUsers = new SocketUsers();
const socketDocument = new SocketDocument();
const socketKanban = new SocketKanban();
const socketChat = new SocketChat();
const socketYoutube = new SocketYoutube();
const socketNote = new SocketNote();
const socketImage = new SocketImage();
const socketTable = new SocketTable();
const socketChecklist = new SocketChecklist();


let user_id = "";

// io.use((socket, next) => {
//     // console.log(socket.handshake.auth.token,"socket token")
//     if (socket.handshake.auth.token) {
//         const authToken = socket.handshake.auth.token;
//         const [, Token] = authToken.split(" ");

//         const { sub } = verify(Token, "FlashPoint") as IPayload;
//         user_id = sub;
//         console.log(sub);

//         next();
//     }

//     const erro = new Error("Your sign probabli expirate!! sign in again to solve this problem");
//     next(erro);


// } 


//   );


io.on("connection", (socket) => {
    // console.log(socket.id, "User");

    socket.on("get_rooms", async (data, callback) => {
        const id = socketAuth.authentication(data.token);

        socket.join(id);
        try {
            const rooms = await socketWorkspaces.handleListWorkspace(id);
            // console.log(rooms);
            callback(rooms);
            // io.to(id).emit("rooms",rooms);

        } catch (error) {
            console.log(error)
        }



    });
    socket.on("newRoom", async (data, callback) => {
        const { title, token } = data;
        const id = socketAuth.authentication(token);
        const newRoom = await socketWorkspaces.handleCreateRoom(id, title);
        console.log(newRoom);
        callback(newRoom);
        io.to(id).emit("rooms", newRoom);
    });

    socket.on("addNewMember", async (data, callback) => {

        const id = socketAuth.authentication(data.token);

        if (await socketUsers.verifyEmail(data.memberEmail)) {
            const json = await socketWorkspaces.handleAddNewMember(id, data);

            const newRoom = {
                id: data.workspaceId,
                title: json.workspaceTitle
            }
            socket.join(json.memberId);
            io.to(json.memberId).emit("rooms", newRoom);
            socket.join(id);
            console.log("json", json, "newRoom", newRoom);
        }

        else {
            callback("E-mail não existe");
        }

    });

    socket.on("getMembers", async (data, callback) => {
        const { email, token } = data;
        console.log(data)
        const emails = await socketUsers.getMembers(email);
        const id = socketAuth.authentication(token);
        const userEmail = await socketUsers.getUserEmail(id);
        console.log("userEmail: ", userEmail);
        const newEmails = emails.filter(d => d.email === userEmail ? false : true)
        //aplicar um filter no array de email com o email do usuario estraido via token
        console.log(newEmails);
        callback(newEmails);
    });


    socket.on("select_room", async (data, callback) => {
        console.log(data, "select_room")
        const header = await socketDocument.getHeaderData(data);
        // console.log(header);


        const components = await socketDocument.handleGetLoadOrder(data);
        //    console.log("components",components);

        const preLoad = {
            ...header,
            ...components
        }
        console.log(preLoad);

        //pegar o loadOrder  
        callback(preLoad)
        socket.join(data);
    });

    socket.on("changeDocTitle", async (data) => {
        let title = data.title;
        //update Title workspace
        await socketDocument.handleUpdateTitle(data.currentRoom, title)
        //emit to others rooms a new title
        // io.to(data.currentRoom).emit("updateDocTitle", {"DocTitle":title});
        socket.broadcast.to(data.currentRoom).emit("updateDocTitle", { "DocTitle": title });
        console.log("updateDocTitle: ", title);
    });

    socket.on("newComponent", async (data, callback) => {
        // console.log("newComponent",data)
        let { currentRoom, component } = data;
        const newComponent = await socketDocument.handleCreateNewComponent(currentRoom, component);
        console.log("New Component: 🍕", newComponent)
        callback(newComponent);
        // io.to(currentRoom).emit("addNewComponent", newComponent);
        socket.broadcast.to(currentRoom).emit("addNewComponent", newComponent)



    });

    socket.on("getKanbanTitle", async (data, callback) => {
        callback(await socketKanban.handleGetTitle(data));
    })
    socket.on("changeKanbanTitle", async (data) => {
        const { kabanId, title, currentRoom } = data;
        console.log(data)
        await socketKanban.handleUpdateTitle(kabanId, title);
        let date = await socketWorkspaces.updateDateNow(currentRoom);



        socket.broadcast.to(currentRoom).emit("updateKanbanTitle", { "kanbanTitle": title, "kanbanId": kabanId });
    })

    socket.on("updateKanbanMetadata", async (data) => {
        // console.log(data);
        const { kanbanId, metadata, currentRoom } = data;
        await socketKanban.handleUpdateKanbanMetadata(metadata, kanbanId);
        let date = await socketWorkspaces.updateDateNow(currentRoom);



    })

    socket.on("spredingkanban", (data) => {
        let { metadata, kanbanId, currentRoom } = data;

        socket.broadcast.to(currentRoom).emit("gettingSpreadData", { metadata: metadata, kanbanId: kanbanId })
    })

    socket.on("chatNewMessage", async (d, callback) => {

        const { token, data, currentRoom } = d;
        //criar um callback para adicionar a mensagem escrita
        const message = await socketChat.addNewMessage(data, socketAuth.authentication(token), currentRoom);
        socket.broadcast.to(currentRoom).emit("SpreadChatMessage", { message: message });
        callback(message);

    })
    socket.on("GetMessages", async (data, callback) => {
        const { currentRoom } = data;
        const messages = await socketChat.getMessages(currentRoom);

        callback(messages)

    })
    socket.on("getProfileData", async (data, callback) => {
        const { Token } = data;
        const dados = await socketUsers.getProfileData(socketAuth.authentication(Token));
        callback(dados)
    })

    socket.on("LeftRoom", async (data, callback) => {
        const { Token, room } = data;
        const id = socketAuth.authentication(Token);
        console.log(id, room)
        await socketWorkspaces.dropRoom(id, room);
        const rooms = await socketWorkspaces.handleListWorkspace(id);

        callback(rooms);
    })

    socket.on("changeUserName", async (data, callback) => {
        const { Token, name } = data;
        await socketUsers.changeUserName(socketAuth.authentication(Token), name);
        callback(name)
    })

    socket.on("UpdateYoutubeLink", async (data) => {

        const { youtubeId, link, currentRoom } = data;
        await socketYoutube.updateYoutube(youtubeId, link)
        socket.broadcast.to(currentRoom).emit("SpreadingYoutubeLink", { link: link, youtubeId: youtubeId })
    })

    socket.on("changeAnimalProfile", async (data, callback) => {
        const { Token, animal } = data;
        socketUsers.changeAnimal(socketAuth.authentication(Token), animal);
        callback(animal)
    })

    socket.on("NoteUpdatingText", async (data) => {
        const { currentRoom, NoteId, text } = data;
        console.table(data)
        socketNote.updateNote(NoteId, text)
        socket.broadcast.to(currentRoom).emit("SpreadingNoteText", { text: text, NoteId: NoteId })
    })



    socket.on("UploadLinkImage", async (data) => {
        // console.table(data)
        const { currentRoom, imageId, link } = data;
        await socketImage.UpdateLink(imageId, link)
        socket.broadcast.to(currentRoom).emit("SpredingLoadImage", { imageId: imageId, link: link })

    })
    socket.on("uploadImageReflect", (data) => {
        const { currentRoom, imageId, link } = data;
        console.table(data)
        socket.broadcast.to(currentRoom).emit("SpredingLoadImage", { imageId: imageId, link: link })
    })

    socket.on("UpdateTableMetadata", async (data) => {
        const { tableId, metadata, currentRoom } = data;
        console.table(data)
        await socketTable.updateMetadata(tableId, metadata);
        socket.broadcast.to(currentRoom).emit("SpredingTableMetadata", { tableId: tableId, metadata: metadata })

    })

    socket.on("uploadTableReflect", (data) => {
        const { currentRoom, tableId, metadata } = data;

        socket.broadcast.to(currentRoom).emit("SpredingTableMetadata", { tableId: tableId, metadata: metadata })
    })
    socket.on("UpdateChecklistMetadata", async (data) => {
        const { checklistId, metadata, currentRoom } = data;
        await socketChecklist.updateChecklist(checklistId, metadata);
        socket.broadcast.to(currentRoom).emit("SpredingChecklistMetadata", { checklistId: checklistId, metadata: metadata })
    })
    socket.on("LevelInRoom", async (data,callback) => {
        const { currentRoom, token } = data;
        const level = await socketUsers.userLevel(socketAuth.authentication(token),currentRoom)
          callback({level:level})
    })

    socket.on("GetMembersControllerInRoom",async(data,callback)=>{
        const {currentRoom, token}=data;
        const members =await socketDocument.getMembersControllers(socketAuth.authentication(token),currentRoom)
//    console.log(members)
        callback(members);
   
    })



});

console.log(users);