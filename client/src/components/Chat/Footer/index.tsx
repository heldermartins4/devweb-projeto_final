import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import SocketContext from "../../../contexts/SocketContext";
import * as C from "./styles";

export const FooterChat = ({ getMessage, chat }) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const AddNewMessage = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    //enviar para o chat currentRoom
    if (message == '') {} else {
      let data = {
        message: message,
        date: new Intl.DateTimeFormat(["ban", "id"]).format(new Date()),
        icon: "",
        time: new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }).format(new Date()),
      };
      let newData = {
        data: data,
        token: "Bearer " + sessionStorage.getItem("token"),
        currentRoom: sessionStorage.getItem("currentRoom"),
      };
      socket.emit("chatNewMessage", newData, (resp) => {
        getMessage(resp);
      });
      setMessage((prevState) => "");
      console.log(newData);
    }
  };

  return (
    <>
      <C.SendMessagesContainer>
        <input
          type="text"
          placeholder="Digite aqui sua mensagem"
          value={message}
          onChange={AddNewMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
        </button>
      </C.SendMessagesContainer>
    </>
  );
};
