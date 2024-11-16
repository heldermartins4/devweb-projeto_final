import * as C from "./styles";

import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import SocketContext from "../../contexts/SocketContext";

const Column = dynamic(() => import("../Column"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};
interface IDataObject {
  tasks: Array<{ id: number; content: string }>;
  columns: Array<{
    id: string;
    title: string;
    color: string;
    taskIds: Array<number>;
  }>;
  columnOrder: Array<number>;
}
export const KanbanBoard = ({ data, kanbanId }) => {
  // console.log("internalKanban", data, "kanbanID", kanbanId);
  const [dataObject, setDataObject] = useState<IDataObject>({
    tasks: [],
    columns: [],
    columnOrder: [],
  });
  const [kanbanTitle, setKanbanTitle] = useState("");
  const socket = useContext(SocketContext);
  console.log("dataObject", dataObject);

  //socket emits

  const emitKanbanUpdateMetadata = (metadata) => {
    const data = {
      kanbanId: kanbanId,
      metadata: metadata,
      currentRoom: sessionStorage.getItem("currentRoom"),
    };
    socket.emit("updateKanbanMetadata", data);
    // console.log("i was called", data);
  };

  const emitSpredingKanban = (metadata) => {
    const data = {
      currentRoom: sessionStorage.getItem("currentRoom"),
      kanbanId: kanbanId,
      metadata: metadata,
    };

    socket.emit("spredingkanban", data);
  };

  //renderiza as colunas
  const [renderColumns, setRenderColumns] = useState([]);

  const RenderColumnsFunction = (dataObject) => {
    let cache = [];
    dataObject.columnOrder.map((loadId) => {
      const column = dataObject.columns[loadId];
      const tasks = column.taskIds.map((i) => dataObject.tasks[i]);

      cache.push(
        <Column
          key={column.id}
          column={column}
          tasks={tasks}
          liftinFunctions={liftingFunctions}
        />
      );
    });
    console.log("Render columns", cache);
    setRenderColumns((prevState) => cache);
  };

  const DragTask = (source, destination) => {
    const fromCol = Number(source.droppableId);
    const fromIndex = source.index;
    const toCol = Number(destination.droppableId);
    const toIndex = destination.index;

    console.log("from ", fromCol, " to ", toCol);
    console.log("from ", fromIndex, " to ", toIndex);
    // setDataObject((prevState) =>{
    //   // console.log("item",prevState.columns[fromCol].taskIds[fromIndex])
    //   let item = prevState.columns[fromCol].taskIds[fromIndex];
    //   prevState.columns[toCol].taskIds.splice(toIndex,0,item);
    //   prevState.columns[fromCol].taskIds.splice(fromIndex,1);
    //  console.log( "ffff",prevState);

    //   return prevState;
    // })
  };

  //function packages
  const liftingFunctions = {
    newTask: (id: string) => {
      //add a new blank task at the kanban
      //need become realtime change
      const taskid = dataObject.tasks.length;
      const task = {
        id: taskid,
        content: "Nova Tarefa ✅",
      };
      setDataObject((prevState) => {
        const newTasksArray = [];
        prevState.tasks.map((t) => {
          newTasksArray.push(t);
        });
        newTasksArray.push(task);
        const newColumnsArray = prevState.columns.map((cl) => {
          if (cl.id === id) {
            let cache = [];
            cl.taskIds.map((t) => {
              cache.push(t);
            });
            cache.push(taskid);
            cl.taskIds = cache;
            return cl;
          } else {
            return cl;
          }
        });
        let objeto = {
          tasks: newTasksArray,
          columns: newColumnsArray,
          columnOrder: [...prevState.columnOrder],
        };
        emitKanbanUpdateMetadata(objeto);
        emitSpredingKanban(objeto);
        // console.log(objeto)
        return objeto;
      });
      console.log("please work", dataObject);
      // emit to server to update metadata kanban
    },
    addTaskContent: (text: string, taskId: number) => {
      //add a content
      //need become realtime change
      console.log(
        "content Task - insede the kanban",
        text,
        "task id: ",
        taskId
      );
      sessionStorage.setItem("GAGA",text);
      setDataObject((prevState) => {
        const newTaskArray = prevState.tasks.filter((t) => {
          if (t.id === taskId) {
            t.content = text;
            return t;
          } else {
            return t;
          }
        });

        let objeto = {
          tasks: newTaskArray,
          columns: [...prevState.columns],
          columnOrder: [...prevState.columnOrder],
        };
        return objeto;
      });
      console.log("change content", dataObject);
      // emit to server to update metadata kanban
      emitKanbanUpdateMetadata(dataObject);
      emitSpredingKanban(dataObject);
    },
    changeColumnTitle: (text: string, columnId: number) => {
      console.table({ texto: text, coluna: columnId });
      setDataObject((prevState) => {
        prevState.columns[columnId].title = text;
        return prevState;
      });
      emitKanbanUpdateMetadata(dataObject);
      emitSpredingKanban(dataObject);
    },
  };

  //this funcion is currently in liftingFunctions
  const newTask = (id: string) => {
    //add a new blank task at the kanban
    const taskid = dataObject.tasks.length;
    const task = {
      id: taskid,
      content: "",
    };

    setDataObject((prevState) => {
      const newTasksArray = [];
      prevState.tasks.map((t) => {
        newTasksArray.push(t);
      });
      newTasksArray.push(task);
      const newColumnsArray = prevState.columns.map((cl) => {
        if (cl.id === id) {
          let cache = [];
          cl.taskIds.map((t) => {
            cache.push(t);
          });
          cache.push(taskid);
          cl.taskIds = cache;
          return cl;
        } else {
          return cl;
        }
      });
      let objeto = {
        tasks: newTasksArray,
        columns: newColumnsArray,
        columnOrder: [...prevState.columnOrder],
      };
      // console.log(objeto)
      return objeto;
    });
    console.log("newTask", dataObject);
  };

  // effects area

  useEffect(() => {
    setDataObject(data);
    RenderColumnsFunction(data);
    socket.emit("getKanbanTitle", kanbanId, (resp) => {
      setKanbanTitle(resp);
    });
    socket.on("updateKanbanTitle", (data) => {
      console.log("updateKanbanTitle - COMP", data);
      if (data.kanbanId === kanbanId) {
        setKanbanTitle(data.kanbanTitle);
      }
    });
    socket.on("gettingSpreadData", (data) => {
      console.log("Spread Data - COMP", data);
      if (data.kanbanId === kanbanId) {
        
        setDataObject(prevState => data.metadata);
        RenderColumnsFunction(data.metadata);
      }
    });
  }, []);

  useEffect(() => {
    RenderColumnsFunction(dataObject);

    console.log("AAA", dataObject);
  }, [dataObject]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    console.log("destination", destination);
    console.log("source", source);
    // DragTask(source,destination);
    // Se o usuário dropar fora do contexto
    if (!destination) return;

    // Se o usuário retornar a mesma posição
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Altera a posição na coluna
    const sourceCol = dataObject.columns[source.droppableId];
    const destinationCol = dataObject.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newDataObject = {
        ...dataObject,
        columns: {
          ...dataObject.columns,
          [newColumn.id]: newColumn,
        },
      };

      setDataObject((prevState) => {
        const { columnOrder, columns, tasks } = newDataObject;
        // console.log("col data ", ...Object.values(columns));
        const obj = {
          tasks: [...tasks],
          columns: [...Object.values(columns)],
          columnOrder: [...columnOrder],
        };
        return obj;
      });

      return;
    }

    // Usuário movendo para outra coluna
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    let newDataObject = {
      ...dataObject,
      columns: {
        ...dataObject.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setDataObject((prevState) => {
      const { columnOrder, columns, tasks } = newDataObject;
      // console.log("col data ", [...Object.values(columns)]);
      let x = [...Object.values(columns)];
      const obj = {
        tasks: [...tasks],
        columns: x,
        columnOrder: [...columnOrder],
      };
      emitSpredingKanban(obj);
      emitKanbanUpdateMetadata(obj);
      return obj;
    });
  };

  const handleAddNewColumn = () => {
    setDataObject((prevState) => {
      const { columns, tasks, columnOrder } = prevState;
      let x = [...Object.values(columns)];
      const obj = {
        tasks: [...tasks],
        columns: [
          ...Object.values(columns),
          {
            id: `${x.length}`,
            title: "...",
            color: "#ff0f42",
            taskIds: [],
          },
        ],
        columnOrder: [...columnOrder, x.length],
      };
      emitSpredingKanban(obj);
      emitKanbanUpdateMetadata(obj);
      return obj;
    });
  };

  const updateKanbanTitle = () => {
    const data = {
      kabanId: kanbanId,
      title: kanbanTitle,
      currentRoom: sessionStorage.getItem("currentRoom"),
    };
    // console.log("onBlur")
    socket.emit("changeKanbanTitle", data);
  };

  const ChangeTitleKanban = (e) => {
    setKanbanTitle(e.target.value);
  };

  const [optionsKanban, setOptionsKanban]  = useState(false)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <C.KanbanBoard>
        <C.HeaderKanban optionsKanban={optionsKanban}>
          <input
            type="text"
            value={kanbanTitle}
            onChange={ChangeTitleKanban}
            onBlur={updateKanbanTitle}
          />
          <div className="options" onClick={() => {
            setOptionsKanban(!optionsKanban)
          }}>
            <FontAwesomeIcon icon={faGripVertical} />
          </div>

          <div className="options--kanban">
            <svg viewBox="0 0 448 512" fill="currentColor" className="bi">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            Apagar Kanban
          </div>
        </C.HeaderKanban>
        <C.ContainerColumns>
          <C.DisplayColumns>
            <C.Columns size={widthKanbanBoard}>
              {renderColumns}

              <C.AddColumn onClick={handleAddNewColumn}>+</C.AddColumn>
            </C.Columns>
          </C.DisplayColumns>
        </C.ContainerColumns>
      </C.KanbanBoard>
    </DragDropContext>
  );
};

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Caixa de entrada",
      color: "#1b95df",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "Emergência",
      color: "#ff0f42",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Em Progresso",
      color: "#f6d30e",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Testando",
      color: "#8321db",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Concluído",
      color: "#32d762",
      taskIds: [],
    },
  },
  // Ordem das colunas
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

// preciso da qntd das colunas aqui!!!
const col = initialData.columns;
let colSize = Object.keys(col).length; // tamanho do array de colunas!
// console.log(colSize, "tamanho")
const widthKanbanBoard = colSize * 410 + colSize * 10 + 40; // calculo para o tamanho do scroll
// console.log(widthKanbanBoard, "tamanho");
