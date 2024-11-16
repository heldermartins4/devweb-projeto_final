import { useState, useEffect, useReducer, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import * as C from "./styles";

const Tasks = ({ id, state, content, functions }) => {
  const [taskState, setTaskState] = useState(state);
  const [taskContent, setTaskContent] = useState(content);

  const handleChangeContentTask = (e) => {
    setTaskContent(e.target.value);
  };

  const saveText = (e) => {
    functions.saveText(e.target.value, e.target.parentNode.id);
  };
  const handleChangeStatusTask = (e) => {
    functions.toggleChecked(!taskState, e.target.parentNode.id);
    setTaskState(!taskState);
  };

  const handleTaskUpdate = (e) => {
    // se o usuário apertar enter
    if (e.key === "Enter") {
      // console.log("+++") -> Adiciona um item vazio
      functions.addTask();
    }
    // se não houver conteúdo no input e o usuário apertar p/ apagar
    if (e.key === "Backspace" && taskContent == "") {
      // console.log("---") -> Apaga a task
      functions.removeTask(e.target.parentNode.id);
    }
  };

  return (
    <C.ContainerTask state={taskState}>
      <li key={id} id={id}>
        {/** estado da tarefa */}
        <input
          type="checkbox"
          checked={taskState}
          onChange={handleChangeStatusTask}
        />

        {/** area de edição de conteúdo */}
        <input
          type="text"
          placeholder="Digite algo"
          className="content"
          value={taskContent}
          onChange={handleChangeContentTask}
          onBlur={saveText}
          onKeyDown={handleTaskUpdate}
          autoFocus
        />
      </li>
    </C.ContainerTask>
  );
};

export const CheckList = ({ data, checklistId }) => {
  const socket = useContext(SocketContext);
  const reducer = (state, action) => {
    const functions = {
      addTask: () => {
        dispatch({ type: "addTask" });
      },
      removeTask: (id) => {
        //filter no id para remover o bjeto no array
        dispatch({ type: "removeTask", payload: { id: id } });
      },
      toggleChecked: (isChecked, id) => {
        dispatch({
          type: "toggleChecked",
          payload: { id2: id, isChecked: isChecked },
        });
      },
      saveText: (text, saveTextId) => {
        dispatch({
          type: "saveText",
          payload: { saveTextId: saveTextId, text: text },
        });
      },
    };

    const updateMetadata = (metadata) => {
      let data = {
        checklistId: checklistId,
        metadata: metadata,
        currentRoom: sessionStorage.getItem("currentRoom"),
      };
      socket.emit("UpdateChecklistMetadata", data);
    };

    const render = (array) => {
      console.error("render", array);
      let obj = array.tasks.map((task) => {
        let id, state, content;

        id = task.taskId;
        state = task.taskState;
        content = task.taskContent;

        return (
          <Tasks
            id={id}
            state={state}
            functions={functions}
            content={content}
          />
        );
      });
      return obj;
    };

    let jsx;
    switch (action.type) {
      case "update":
        console.table(action.payload)
        jsx = render(action.payload);
          let t = action.payload;
          
        return { tasks:t.tasks, jsx: jsx };
      case "render":
        jsx = render(state);

        return { ...state, jsx: jsx };
      case "addTask":
        let v;

        v = state.tasks;
        v.push({
          taskId: v.length + 1,
          taskState: false,
          taskContent: " ",
        });
        console.table({ tasks: v });
        updateMetadata({ tasks: v });
        jsx = render({ tasks: v });
        return { tasks: v, jsx: jsx };

      case "removeTask":
        let { id } = action.payload;
        const newArray = state.tasks.filter((obj) => {
          if (obj.taskId !== Number(id)) {
            return obj;
          }
        });
        updateMetadata({ tasks: newArray });
        jsx = render({ tasks: newArray });

        return { tasks: newArray, jsx: jsx };
      case "toggleChecked":
        let { isChecked, id2 } = action.payload;
        const newArray2 = state.tasks.filter((obj) => {
          if (obj.taskId === Number(id2)) {
            return (obj.taskState = isChecked);
          }
          return obj;
        });
        //sockets

        updateMetadata({ tasks: newArray2 });
        return { ...state, tasks: newArray2 };

      case "saveText":
        let { text, saveTextId } = action.payload;
        const newArray3 = state.tasks.filter((obj) => {
          if (obj.taskId === Number(saveTextId)) {
            return (obj.taskContent = text);
          }
          return obj;
        });
        updateMetadata({ tasks: newArray3 });
        return { ...state, tasks: newArray3 };

      default:
        throw new Error();
        break;
    }
  };
  //NNNNNNNNNNNNNNNNNNNNNNão retire os espaços do task content please
  const initialState =
    data.data == null
      ? { tasks: [{ taskContent: " ", taskId: 1, taskState: false }] }
      : data.data;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "render" });
    socket.on("SpredingChecklistMetadata", (data) => {
      if (checklistId === data.checklistId) {
        dispatch({ type: "update", payload: data.metadata });
      }
    });
  }, []);

  console.log("🎃", state);

  return <C.Container>{state.jsx}</C.Container>;
};
