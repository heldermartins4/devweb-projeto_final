import { useContext, useEffect, useRef, useState } from "react";
import SocketContext from "../../../contexts/SocketContext";
import { FooterChat } from "../Footer";
import { HeaderChat } from "../Header";
import * as C from "./styles";
import { host } from "../../../utils/host";
interface IMessage {
  email: string;
  date: string;
  message: string;
  icon: string;
  time: string;
  name: string;
}

interface Props {
  data: Array<{
    icon: string;
    nameUser: string;
    title: string;
    content: string;
    time: string;
  }>;
  edit: boolean;
  setEdit(): void;
}

const BaseURL = host;
const pathProfile = BaseURL + "/userprofile/";

const CommunicateList = ({ data, edit, setEdit }: Props) => {
  console.log(data, "top");

  const [viewContent, setViewContent] = useState(false);
  const handleSetViewContent = () => {
    setViewContent(!viewContent);
  };

  return (
    <>
      {data.map((index, key) => {
        const [title, setTitle] = useState(index.title);
        const handleSetTitle = (e) => {
          setTitle(e.target.value);
        };

        const [content, setContent] = useState(index.content);
        const handleSetContent = (e) => {
          setContent(e.target.value);
        };

        return (
          <div className="item">
            <div className="flex item-header">
              <img src={index.icon} />
              <h2>{index.nameUser}</h2>
            </div>
            <span>{index.time}</span>
            <div className="flex content">
              <h3 style={{ display: edit ? "none" : "flex" }}>{title}</h3>
              <input
                type="text"
                style={{ display: edit ? "flex" : "none" }}
                value={title}
                onChange={handleSetTitle}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
                style={{ display: edit ? "none" : "initial" }}
                onClick={handleSetViewContent}
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            <div
              className="content-item"
              style={{
                // height: viewContent ? 'inherit' : '0',
                // fontSize: viewContent ? '1rem' : '0'
                display: viewContent ? "initial" : "none",
              }}
            >
              <span style={{ display: edit ? "none" : "flex" }}>{content}</span>
              <textarea
                style={{ display: edit ? "flex" : "none" }}
                value={content}
                onChange={handleSetContent}
              />
            </div>
            <div className="options">
              <div>
                {/** Apagar comunicado */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
                {/** Editar comunicado */}
                <svg
                  onClick={setEdit}
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Communicate = () => {
  const [scroll, setScroll] = useState(false);
  let scrolled = useRef(null);

  const data = [
    {
      icon: pathProfile.concat(
        "1670122542569_299571969_139856668749737_2726842531233715893_n.jpg"
      ),
      nameUser: "Helder Martins",
      title: "Reunião para planejar o desenvolvimento do Cub's",
      content:
        "A primeira reunião, nós nunca esqueceremos. Cada um em casa, com tanta ideias e nenhuma prestava.",
      time: "Segunda, 27 de janeiro às 09:10",
    },
    {
      icon: pathProfile.concat(
        "1670122542569_299571969_139856668749737_2726842531233715893_n.jpg"
      ),
      nameUser: "Helder Martins",
      title: "Adicionar funções ao Cub's",
      content:
        "Precisamos adicionar as funções de adicionar membros no projeto, tarefas no calendário e autores.",
      time: "Quinta, 01 de Dezembro às 08:32",
    },
    {
      icon: pathProfile.concat(
        "1670122524188_217882081_3490443287905844_8533724798751629911_n.jpg"
      ),
      nameUser: "Kaique Eduardo",
      title: "Reunião Domingo às 15h30min",
      content:
        "Reunião para discutirmos ordem de apresentação, roteiro e monografia.",
      time: "Sábado, 03 de dezembro às 16:48",
    },
    {
      icon: pathProfile.concat(
        "1670122542569_299571969_139856668749737_2726842531233715893_n.jpg"
      ),
      nameUser: "Helder Martins",
      title: "Reunião sobre o futuro do Cub's",
      content:
        "Reunião com a pauta principal, definir o futuro da plataforma e uma possivel hospedagem.",
      time: "Domingo, 04 de dezembro às 20:13",
    },
  ];

  const [edit, setEdit] = useState(false);
  const handleSetEditCommunicates = () => {
    setEdit(!edit);
  };

  // let icon, nameUser, title, content, time;

  // icon = data.map(e => e.icon)
  // nameUser = data.map(e => e.nameUser)
  // title = data.map(e => e.title)
  // content = data.map(e => e.content)
  // time = data.map(e => e.time)

  return (
    <div className="container">
      <div
        className="container-communicates"
        ref={scrolled}
        onScroll={() => {
          // setScroll(true)
          // console.log(scrolled.current.scrollTop)
          // console.log(scrolled.current.scrollHeight) -> esse é o final
          let height = scrolled.current.scrollHeight;

          if (scrolled.current.scrollTop + height > height) {
            // está descendo o scroll
            setScroll(true);
          } else {
            // está subindo o scroll
            setScroll(false);
          }
        }}
      >
        <CommunicateList
          data={data}
          edit={edit}
          setEdit={handleSetEditCommunicates}
        />
      </div>
      <div className="form-communicate">
        <button
          onClick={() => {}}
          style={{
            display: scroll ? "none" : "initial",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-envelope-plus-fill"
            viewBox="0 0 16 16"
          >
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const Chat = () => {
  const socket = useContext(SocketContext);
  const [messages, SetMessages] = useState<IMessage[]>([
    { email: "", date: "", message: "", icon: "", time: "", name: "" },
  ]);

  let inRoom, emailProfile;
  if (typeof window !== "undefined") {
    // do your stuff with sessionStorage
    emailProfile = sessionStorage.getItem("emailProfile");
    inRoom = sessionStorage.getItem("inRoom");
  }
  // criar uma função para pegar a mensagem no footer
  const getMessage = (message) => {
    SetMessages((prevState) => [...prevState, message]);
  };
  useEffect(() => {
    if (inRoom === "false") {
      SetMessages((prevState) => [
        { email: "", date: "", message: "", icon: "", time: "", name: "" },
      ]);
    } else if (inRoom === "true") {
      const sala = { currentRoom: sessionStorage.getItem("currentRoom") };
      socket.emit("GetMessages", sala, (resp) => {
        SetMessages((prevState) => resp);
      });
    }
  }, [inRoom]);

  useEffect(() => {
    socket.on("SpreadChatMessage", (data) => {
      const { message } = data;
      // console.log("🎃", message);
      SetMessages((prevState) => [...prevState, message]);
    });
  }, []);

  useEffect(() => {
    // push Notifications
    Notification.requestPermission().then((perm) => {
      // alert(perm)
      if (perm === "granted") {
        new Notification("TCC", {
          // O nome da sala
          body: "Helder: Fala meu irmão...", // concatenar nome do usuário com a nova mensagem
          icon: "/assets/Icons-Cubs/CubsLogo.png", // ícone da notificação
          vibrate: [200, 100, 200], // vibra o celular
        });
      }
    });
  });

  const messagesJSX = [];
  messages.map((m) => {
    let img = pathProfile.concat(m.icon);
    if (m.email === emailProfile) {
      messagesJSX.push(
        <C.Message>
          <div className="message">
            <div className="container-message">
              <div className="content">{m.message}</div>
              <div className="info">
                <div>{m.time}</div>
                <div>{m.date}</div>
              </div>
            </div>
            <div className="user">
              <img src={img} alt="" />
            </div>
          </div>
        </C.Message>
      );
    } else {
      messagesJSX.push(
        <>
          <C.ListMessages>
            <div className="message">
              <div className="user">
                <img src={img} alt="" />
              </div>
              <div className="container-message">
                <span className="username">{m.name}</span>
                <div className="content">{m.message}</div>
                <div className="info">
                  <div>{m.time}</div>
                  <div>{m.date}</div>
                </div>
              </div>
            </div>
          </C.ListMessages>
        </>
      );
    }
  });

  console.log("JSX Messages", messagesJSX, "messages", messages);
  const [chat, communicate] = useState(false);

  function setCommunicate() {
    communicate(true);
  }
  function setChat() {
    communicate(false);
  }

  return (
    <>
      <C.ContainerChat>
        <HeaderChat
          chat={chat}
          setCommunicate={setCommunicate}
          setChat={setChat}
        />
        <C.ContainerMessages>
          <C.Chat
            style={{
              display: chat ? "none" : "initial",
            }}
          >
            {/* messages need to be a jsx array */}
            {messagesJSX}
          </C.Chat>
          <C.Communicate
            style={{
              display: chat ? "initial" : "none",
            }}
          >
            <Communicate />
          </C.Communicate>
        </C.ContainerMessages>
        <div className="footer" style={{ display: chat ? "none" : "initial" }}>
          <FooterChat getMessage={getMessage} chat={chat} />
        </div>
      </C.ContainerChat>
    </>
  );
};
