import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faPenToSquare,
    faImage,
    faSquareCheck,
    faColumns,
    faTableCellsLarge,
    faTableCells
} from "@fortawesome/free-solid-svg-icons";

const handleAddNewComponent = () => {
    //loadID components.lenght - 1
    //Helder cria um botão para selecionar o tipo de componente
    let i = ["Table","Kanban","Note"]//isso é apenas para debug
    const component = {
      compType: i[1],
      compID: "",
      compData: {}
    };
    const info = {
      component,
      currentRoom: sessionStorage.getItem("currentRoom"),

    }

    socket.emit("newComponent",info );
};

export const tools = [
    {
        name:"Texto",
        icon:faPenToSquare,
        function:""
    },
    {
        name:"Imagem",
        icon:faImage,
        function:""
    },
    {
        name:"Lista de tarefas",
        icon:faSquareCheck,
        function:""
    },
    {
        name:"Quadro Kanban",
        icon:faColumns,
        function:"handleAddNewComponent"
    },
    {
        name:"Tabela descritiva",
        icon:faTableCellsLarge,
        function:""
    },
    {
        name:"Planilha",
        icon:faTableCells,
        function:""
    }
]