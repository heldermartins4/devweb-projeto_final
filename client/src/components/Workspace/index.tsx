import * as C from "./styles";
import * as M from "../../styles/ModalWorkspace/styles";

import { faAdd, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { shade } from "polished";

import { 
  useContext, 
  useState, 
  useEffect, 
  useRef } from "react";

import { ThemeContext } from "styled-components";

import { ModalWorkspace } from "../ModalWorkspace";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import SocketContext from "../../contexts/SocketContext";

export const WorkspaceBoard = () => {

  const router = useRouter();

  const socket = useContext(SocketContext);
  const { colors } = useContext(ThemeContext);

  const [salas, setSalas] = useState([]);
  const [modal, setModal] = useState(false);
  // pesquisar por titulos de salas ou por tags
  const [search, setSearch] = useState("");
  const [activeSearch, seViewSearch] = useState(true)
  // sair da sala*
  const [trash, setTrash] = useState(false);
  const [leftRoomList, setLeftRoomList] = useState([]);
  const trashOption = useRef(null);
  const [optionTrash, setOptionTrash] = useState(false);

  const icon = "";
  

  const handleModal = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const loadRooms = () => {
    socket.emit(
      "get_rooms",
      { token: "Bearer " + sessionStorage.getItem("token") },
      (response) => {
        let cache = [];
        response.map((d) => {
          cache.push(d);
        });
        console.log(cache, "loadRooms");
        setSalas(cache);
      }
    );
  };

  const clickRooms = (e) => {
    sessionStorage.setItem("currentRoom", e.currentTarget.id);
    sessionStorage.setItem("inRoom", "true");
    router.push("/dashboard");
  };

  //deleção de salas
  const leftSomeRoom = (e) => {
    if(e.target.checked === true){
      setLeftRoomList((prevState) => [...prevState, e.target.value]);
      // mover p/ lixeira
      setOptionTrash(true)
    }
    else{
      setLeftRoomList((prevState)=>{
        const cache = prevState.filter((id)=> id != e.target.value);
        setOptionTrash(false)
        // console.log(cache);
        return cache;
      })
    }
    
   
  };

  const moveToTrashcan = () =>{
    // console.table(leftRoomList);
    setTrash(false)
    leftRoomList.map((id)=>{
      socket.emit("LeftRoom", { Token: "Bearer " + sessionStorage.getItem("token"), room: id},
      (response)=>{
        let cache = [];
        response.map((d) => {
          cache.push(d);
        });
        console.log(cache, "Deleção");
        setSalas(cache);
      })
    })
    setLeftRoomList(prevState => []);
    setOptionTrash(false)
  }

  const roomsJSX = []; //as salas estão armazenadas nesta variavel

  salas
  .filter(key => search.length > 0 ? key.title.toLowerCase().includes(search) && key.title[0].toLowerCase() == search[0] : '%')
  .map((index) => {
    // let xRoomName = index.title.split(" ")
    // let name = xRoomName.replace(xRoomName[5], "...")

    roomsJSX.push(
      <>
        <C.Room
        optionTrash={optionTrash}
          style={{
            backgroundColor: shade(0.1, colors.background),
            color: shade(0.1, colors.text),
          }}
        >
          <div className="header-room">
            <input
              type="checkbox"
              width={30}
              height={30}
              value={index.id}
              onChange={leftSomeRoom}
            />
          </div>
          <div
            className="body-room"
            onClick={clickRooms}
            key={index.id}
            id={index.id}
          >
            <h1>🚀</h1>
            <h3>
              {
                index.title.length >= 35 ? 
                // se o número de caracteres for maior que 35:
                index.title.replace(index.title.substring(35,), "...") : 
                // se não for maior que 35, então:
                index.title
              }
            </h3>
          </div>
        </C.Room>
      </>
    );
  });

  useEffect(() => {
    const header = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    sessionStorage.setItem("inRoom", "false");

    loadRooms();
  }, []);
  // console.log(salas);
  socket.on("rooms", (data) => {
    console.log(data, "rooms");
    loadRooms();

    setSalas((prevState) => [...prevState, data]);
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search)
  };

  return (
    <>
      <C.Container>
        <C.Button onClick={handleModal}>
          <FontAwesomeIcon icon={faAdd} />
        </C.Button>

        <C.Header trash={trash} activeSearch={activeSearch}>
          <C.Title>Workspace</C.Title>
          <div className="options-workspace">

          <div className="search">
            <span onClick={() => {
              seViewSearch(!activeSearch)
            }}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={handleSearch}
            />
          </div>
          
            <span className='trash' 
            onClick={() => {setTrash(!trash)}} 
            style={{
              display: optionTrash ? 'flex' : 'none'
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
              <p>Mover para a lixeira</p>
            </span>

            <div className="trash-modal">
              Deseja confirmar a ação?
              <div>
                <span>
                  <button onClick={moveToTrashcan}>Sim</button>
                  <button onClick={() => {setTrash(false)}}>Não</button>
                </span>
              </div>
            </div>
          </div>
        </C.Header>
        <C.Area>
          <C.ContainerArea>
            {/* <C.Room>Lorem</C.Room> */}
            {roomsJSX}
          </C.ContainerArea>
        </C.Area>
      </C.Container>
      <M.Modal modal={modal}>
        <M.MobileModal>
          <M.ModalHeader>
            <M.ButtonClose onClick={handleClose}>
              {" "}
              {/** X - Fecha o modal */}
              <FontAwesomeIcon icon={faXmark} />
            </M.ButtonClose>
          </M.ModalHeader>
          <M.ContainerModal>
            <ModalWorkspace handleClose={handleClose} />
          </M.ContainerModal>
        </M.MobileModal>
      </M.Modal>
    </>
  );
};
