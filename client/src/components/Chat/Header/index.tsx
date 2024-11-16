import { faAngleDoubleRight, faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as C from "./styles";

interface Props {
    setChat: () => void;
    setCommunicate: () => void;
}

export const HeaderChat = ({chat, setChat, setCommunicate}) => {
    return (
        <>
            <C.HeaderChat>
                <span onClick={() => {setChat()}}
                ><FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon></span>
                <span onClick={() => {setCommunicate()}}
                ><FontAwesomeIcon icon={faBell}></FontAwesomeIcon></span>
            </C.HeaderChat>
        </>
    )
}