import * as C from "./styles";

import { Tags } from "../AddTags";

import { useContext, useEffect, useState } from "react";
// import { KanbanBoard } from "../KanbanBoard";
import { KanbanBoard } from "../KanbanBoard";
import { Table } from "../Table";
import SocketContext from "../../contexts/SocketContext";
import { YoutubeVideo } from "../YoutubeVideo";
import { TextEditor } from "../TextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Images } from "../Images";
import { CheckList } from "../CheckList";

export const Document = () => {
  // const [loading, setLoading] = useState(false)
  const BaseURL = process.env.HOST_CLIENTSERVER || "http://ec2-3-17-183-122.us-east-2.compute.amazonaws.com:5000";

  const pathProfile = BaseURL + "/userprofile";
  // const imageIcon = "image-solid.svg";

  const socket = useContext(SocketContext);

  // informações da sala
  const [bichos, setBichos] = useState([]);
  const [date, setDate] = useState("");

  // adicionar membros na sala
  const [addMember, setAddMember] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [selectMembers, setSelectMembers] = useState(false);

  const [userControler, setUserController] = useState([]);
  const [userSelect, setUserSelect] = useState([]);

  // set value of input
  const newMember = (e) => {
    setEmailUser(e.target.value);
    if (e.target.value !== "") {
      setSelectMembers(true);
      socket.emit(
        "getMembers",
        {
          email: e.target.value,
          token: "Bearer " + sessionStorage.getItem("token"),
        },
        (data) => {
          console.log(data);
          setUserSelect((prevState) => data);
        }
      );
    } else {
      setSelectMembers((s) => false);
    }
  };

  // adiciona novo membro
  const inviteANewMember = () => {
    if (emailUser !== "" && sessionStorage.getItem("level") === "owner") {
      let email = emailUser;
      // segue o jogo
      socket.emit("addNewMember", {
        token: "Bearer " + sessionStorage.getItem("token"),
        memberEmail: emailUser,
        workspaceId: sessionStorage.getItem("currentRoom"),
        admin: false,
      });
      setEmailUser((prevState) => "");
    }
  };

  // Altera o cargo do membro
  const [selectAdmin, setSelectAdmin] = useState("olaaaa");

  const changeStatus = (e) => {
    setSelectAdmin(e.target.value);
    console.log(selectAdmin, "administro");
  };

  // somente para definir um scroll
  const [scrollable, setScrollable] = useState(false);

  // Adicionar novos itens/ferramentas
  const [selectTool, setSelectTool] = useState(false);
  const [toolSelected, setToolSelected] = useState("");

  // dados para atualizar a tela
  const [updateRenderData, setUpdateRenderData] = useState({
    components: [],
    loadOrder: [],
  });

  // engenharia de renderização
  const [renderComponents, setRenderComponents] = useState([]);
  const [title, setTitle] = useState("");

  const loadComponets = () => {
    const currentRoom = sessionStorage.getItem("currentRoom");
    socket.emit("select_room", currentRoom, (resp) => {
      console.log("front-SelectRoom", resp);
      setTitle(resp.title);
      setBichos(resp.imgs);
      setDate(resp.update_at);

      const d = {
        components: resp.components,
        loadOrder: resp.loadOrder,
      };
      // console.log(d);
      setUpdateRenderData(d);
    });
  };

  useEffect(() => {
    loadComponets();
    // console.log("Fetching initial data");

    socket.emit(
      "LevelInRoom",
      {
        currentRoom: sessionStorage.getItem("currentRoom"),
        token: "Bearer " + sessionStorage.getItem("token"),
      },
      (data) => {
        sessionStorage.setItem("level", data.level);
      }
    );

    socket.on("addNewComponent", async (data) => {
      // console.log("eita nois", data);
      const { newComponent, position } = data;

      // console.log("🍕 socket.on", data);

      setUpdateRenderData((prevState) => ({
        components: [...prevState.components, newComponent],
        loadOrder: [...prevState.loadOrder, position],
      }));
    });

    socket.on("updateDocTitle", (data) => {
      const { DocTitle } = data;
      // console.log("banana");
      setTitle(DocTitle);
    });
  }, []);

  useEffect(() => {
    console.log("renderComponents at scream", updateRenderData);
    const c = updateRenderData.components;
    const l = updateRenderData.loadOrder;
    RenderComponentsFunction(c, l);
  }, [updateRenderData]);

  useEffect(() => {
    if (users.length > 3) {
      setScrollable(true);
    } else {
      setScrollable(scrollable);
    }
  });

  const RenderComponentsFunction = (components, loadOrder) => {
    const cache = [];

    console.log("comp: ", components, "load: ", loadOrder);
    for (let i = 0; i < components.length; i++) {
      console.log(components[loadOrder[i]].compType);
      console.log(components[loadOrder[i]]);
      console.log(loadOrder[i]);
      let type = components[loadOrder[i]].compType;
      switch (type) {
        case "Kanban":
          cache.push(
            <KanbanBoard
              key={loadOrder[i]}
              kanbanId={components[loadOrder[i]].compID}
              data={components[loadOrder[i]].compData}
            />
          );
          break;
        case "Youtube":
          cache.push(
            <YoutubeVideo
              key={loadOrder[i]}
              youtubeId={components[loadOrder[i]].compID}
              data={components[loadOrder[i]].compData}
            />
          );
          break;
        case "Note":
          let { text } = components[loadOrder[i]].compData;
          cache.push(
            <TextEditor
              text={text}
              NoteId={components[loadOrder[i]].compID}
            ></TextEditor>
          );
          break;
        case "Table":
          cache.push(
            <Table
              TableId={components[loadOrder[i]].compID}
              data={components[loadOrder[i]].compData}
            />
          );
          break;
        case "Image":
          cache.push(
            <Images
              data={components[loadOrder[i]].compData}
              imageId={components[loadOrder[i]].compID}
            />
          );
          break;
        case "Checklist":
          cache.push(
            <CheckList
              data={components[loadOrder[i]].compData}
              checklistId={components[loadOrder[i]].compID}
            />
          );
          break;
      }
    }
    setRenderComponents(cache);
    console.log("component array: ", renderComponents);
  };

  const handleChangeTitleDocument = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeInputTitle = (e) => {
    let value = e.target.value;

    if (value != "") {
      let data = {
        title: value,
        currentRoom: sessionStorage.getItem("currentRoom"),
      };
      socket.emit("changeDocTitle", data);
      setTitle(value);
    }
  };

  const handleAddNewComponent = (comp: string) => {
    //loadID components.lenght - 1
    //Helder cria um botão para selecionar o tipo de componente
    // let i = ["Table","Kanban","Note"]//isso é apenas para debug
    const component = {
      compType: comp,
      compID: "",
      compData: {},
    };
    const info = {
      component,
      currentRoom: sessionStorage.getItem("currentRoom"),
    };

    socket.emit("newComponent", info, (resp) => {
      const { newComponent, position } = resp;

      console.log("🍕 button", resp);

      setUpdateRenderData((prevState) => ({
        components: [...prevState.components, newComponent],
        loadOrder: [...prevState.loadOrder, position],
      }));
    });
  };

  return (
    <>
      <C.ContainerDocument>
        <C.HeaderDocument addMember={addMember}>
          <div className="title">
            {/* <span>{content.emoji}</span> */}
            <input
              type="text"
              value={title}
              onChange={handleChangeTitleDocument}
              onBlur={handleChangeInputTitle}
            />
          </div>

          <div
            className="members"
            onClick={() => {
              setAddMember(!addMember);
              socket.emit("GetMembersControllerInRoom", {
                currentRoom: sessionStorage.getItem("currentRoom"),
                token: "Bearer " + sessionStorage.getItem("token"),
              },(data)=>{console.log(data)});
            }}
          >
            {" "}
            {bichos.map((key) => {
              return (
                <>
                  <img src={pathProfile.concat("/" + key)} alt="" />
                </>
              );
            })}
          </div>
        </C.HeaderDocument>
        <C.AddMembers addMember={addMember}>
          <div className="options-room">
            <div className="header">
              <button
                onClick={() => {
                  setAddMember(!addMember);
                 
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>

            <div className="add-member">
              <h2>Adicionar membros</h2>
              <div className="form">
                <div className="invite">
                  <input
                    type="text"
                    placeholder="E-mail do usuário"
                    value={emailUser}
                    onChange={newMember}
                    style={{
                      border: "none",
                      outline: "none",
                    }}
                  />
                  <C.listMembers
                    style={{
                      display: selectMembers ? "initial" : "none",
                    }}
                  >
                    {userSelect
                      .filter((d) => d.email.includes(emailUser)) // a sua forma de filtrar é melhor
                      .map((d) => {
                        return (
                          <span
                            onClick={() => {
                              setEmailUser((prevState) => d.email);
                              setSelectMembers((s) => false);
                            }}
                          >
                            <img
                              src={pathProfile + d.img}
                            />
                            {d.email}
                          </span>
                        );
                      })}
                  </C.listMembers>
                  <button onClick={inviteANewMember}>Convidar</button>
                </div>
                {/** Cara eu esqueci como fizemos aquele outro select no Modal
                 * Então se quiser dar um map aí com base nos valores que vamos
                 * receber e só por aqui...
                 *
                 * Use o useState do selectMembers lá em cima!
                 */}
              </div>

              <div className="options-users">
                <h2>Membros</h2>
                <div
                  className="container"
                  style={{
                    overflowY: scrollable ? "scroll" : "hidden",
                  }}
                >
                  {userControler.map((key) => {
                    // console.log(users.length, "qntd members")
                    return (
                      <div className="user">
                        <div className="info">
                          <img src={key.img} alt="erro" />
                          <span>{key.email}</span>
                        </div>
                        <div
                          className="options"
                          style={
                            {
                              // display: "none"
                              /* Eu preciso de uma condicional aqui. 
                      Se o user for proprietário da sala, então ele terá estas opções. 
                      */
                            }
                          }
                        >
                          <select
                            value={selectAdmin} // valor temporário, esse nós puxamos do banco
                            onChange={changeStatus}
                          >
                            {" "}
                            {/** Recebe o valor atual, e depois pode ser atualizado */}
                            <option value="admin">admin</option>
                            <option value="convidado">convidado</option>
                          </select>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </C.AddMembers>
        <C.Update>Última atualização em {date}</C.Update>
        {/*
      <C.Tags>
        <Tags />
      </C.Tags>
      */}
        <C.Area>
          {/** conteúdo do projeto */}
          {/* <TextEditor text={""}/> */}

          {renderComponents}
        </C.Area>
        <C.NewComponent
          tool={selectTool}
          onClick={() => {
            setSelectTool(!selectTool);
          }}
        >
          + Novo item
          <C.ToolsToDocRooms tool={selectTool}>
            <div
              onClick={() => {
                setSelectTool(!selectTool);

                handleAddNewComponent("Note");
              }}
            >
              <svg
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
              <span>Texto</span>
            </div>
            <div
              onClick={() => {
                setSelectTool(!selectTool);

                handleAddNewComponent("Youtube");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-link-45deg"
                viewBox="0 0 16 16"
              >
                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
              </svg>
              <span>Link</span>
            </div>
            <div
              onClick={() => {
                setSelectTool(!selectTool);

                handleAddNewComponent("Image");
              }}
            >
              <svg
                fill="currentColor"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>
              <span>Imagem</span>
            </div>
            <div
              onClick={() => {
                setSelectTool(!selectTool);
                setToolSelected("Quadro Kanban");
                handleAddNewComponent("Kanban");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-kanban"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
              </svg>
              <span>Kanban</span>
            </div>
            <div
              onClick={() => {
                setSelectTool(!selectTool);

                handleAddNewComponent("Checklist");
              }}
            >
              <svg
                fill="currentColor"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
              </svg>
              <span>Tarefas</span>
            </div>
            <div
              onClick={() => {
                setSelectTool(!selectTool);

                handleAddNewComponent("Table");
              }}
            >
              <svg
                fill="currentColor"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
              </svg>
              <span>Tabela</span>
            </div>
          </C.ToolsToDocRooms>
        </C.NewComponent>{" "}
        {/** Botão para adicionar novos elementos */}
      </C.ContainerDocument>
    </>
  );
};

const users = [
  {
    email: "heldi@gmail.com",
    img: "/profile_animalimgs/elefante.png",
  },
  {
    email: "kelsc@gmail.com",
    img: "/profile_animalimgs/coruja.png",
  },
  {
    email: "ju@gmail.com",
    img: "/profile_animalimgs/leao.png",
  },
];
