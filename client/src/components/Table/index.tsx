import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import { useRef, useState, useEffect, useContext, useReducer } from "react";
import SocketContext from "../../contexts/SocketContext";
import * as C from "./styles";

const Columns = ({ dataCell, id, saveText }) => {
  const cellContent = useRef(null);

  const [cell, setCell] = useState(dataCell);

  /* Não há um outro jeito de armazenar os dados inteiros, então. */
  useEffect(()=>{
    setCell(prevState => dataCell)
  },[])
  const handleSetDataCell = (e) => {
    setCell(cellContent.current?.innerText);

    console.log(
      "Dados: ",
      cellContent.current?.innerText,
      "parent id",
      e.target.parentNode.id,
      "id",
      id
    );

    saveText(e.target.parentNode.id, id, cellContent.current?.innerText);
  };

  return (
    <td
      contentEditable
      ref={cellContent}
      id={id}
      dangerouslySetInnerHTML={{ __html: cell }}
      onBlur={handleSetDataCell}
    ></td>
  );
};

const Celulas = ({ cells, id }) => {
  return <tr id={id}>{cells}</tr>;
};

export const Table = ({ TableId, data }) => {

  const [options, setOptions] = useState(false)

  const socket = useContext(SocketContext);
  const reducer = (state, action) => {
    const updateMetadata = (prevState) => {
      let data = {
        tableId: TableId,
        metadata: prevState,
        currentRoom: sessionStorage.getItem("currentRoom"),
      };
      socket.emit("UpdateTableMetadata", data);
    };
    const saveText = (parentId, cellId, text) => {
      const obj = { parentId: parentId, cellId: cellId, text: text };
      dispatch({ payload: obj, type: "saveText" });
    };

    const updateJSX = (state) => {
      const jsx = state.columns.map((data, columnId) => {
        const celulas = data.map((c, index) => {
          return <Columns id={index} saveText={saveText} dataCell={c} />;
        });

        return <Celulas id={columnId} cells={celulas} />;
      });
      return jsx;
    };
    let columns = [];
    let jsx;

    switch (action.type) {
      case "upload":
        console.warn("entrada", action.payload);
        jsx = updateJSX(action.payload);
        console.warn("saida", { jsx: jsx, columns: action.payload.columns });

        return { jsx: jsx, columns: action.payload.columns };
      case "addColumn":
        columns = [];

        for (let index = 0; index < state.columns.length; index++) {
          columns.push([...state.columns[index], ""]);
        }
        updateMetadata({ columns: columns });
        jsx = updateJSX({ columns: columns });

        return { columns: columns, jsx: jsx };

      case "addRow":
        columns = [];
        for (let index = 0; index < state.columns[0].length; index++) {
          columns.push("");
        }
        jsx = updateJSX({ columns: [...state.columns, columns] });

        updateMetadata({ columns: [...state.columns, columns] });
        return { jsx: jsx, columns: [...state.columns, columns] };
      case "saveText":
        const { parentId, cellId, text } = action.payload;
        state.columns[Number(parentId)][cellId] = text;
        updateMetadata({ columns: state.columns });
        jsx = updateJSX({ columns: state.columns });
        console.log({ ...state, jsx: jsx });
        return { ...state, jsx: jsx };

      case "renderJSX":
        jsx = updateJSX(state);
        return { ...state, jsx: jsx };
      case "JSXClean":
        jsx = updateJSX({columns:[]});
        console.log(jsx,"a")
        return { ...state, jsx:  jsx};
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, data);

  // const [dataObject, setDataObject] = useState(data);
  // const [tableJSX, setTableJSX] = useState([]);

  // atualiza o status em tempo real
  // console.table("Tabela: ", dataObject); // é por aqui

  useEffect(() => {
    // loadTable();
    dispatch({ type: "renderJSX" });
    socket.on("SpredingTableMetadata", (data) => {
      if (TableId === data.tableId) {
        dispatch({ type: "JSXClean" });
        if (TableId) {
          dispatch({ payload: data.metadata, type: "upload" });
        }
        

        //suspeito estar corrompendo o objeto por isso outros serviços explodem
        console.error(state);
      }
    });
  }, []);

  const inputFile = useRef(null);
  const handleInputFile = (e) => {
    inputFile.current.click();
  };

  // caminho da imagem
  const BackBaseUrl = "http://localhost:5000/";

  var allowedExtensions = /(\.csv|\.xls|\.xlsx|\.json|\.ods)$/i; // formatos válidos

  const updateSVG = (e) => {
    // console.log(e.target.value, "arquivo")
    let fileSVG = e.target.files; // filename, extension -> esse é o array completo
    // console.log(fileSVG[0], "arquivo") -> fileSVG[0] é o arquivo aparente.

    // verify extension file
    if (!allowedExtensions.exec(e.target.value)) {
      alert("Invalid type file!");
      // basicamente aqui confirma que o arquivo é uma imagem
      // ou seja, você kelsc deve iniciar a função de upload por aqui.
    } else {
      // upload successfuly
      // auto upload
      alert("Upload successfuly!");
      const token = sessionStorage.getItem("token");
      let formData = new FormData();
      formData.append("file", fileSVG[0]);

      console.log(formData);

      axios
        .post(BackBaseUrl + "ExcelUpload", formData, {
          headers: {
            Authorization: TableId,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.table(response.data);
          dispatch({ payload: response.data, type: "upload" });

          socket.emit("uploadTableReflect", {
            tableId: TableId,
            currentRoom: sessionStorage.getItem("currentRoom"),
            metadata: response.data,
          });
        });
    }
  };

  return (
    <C.Container options={options}>
      <div className="header--table">
        <svg
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
          onClick={() => {
            setOptions(!options)
          }}
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        {/* Delete Table */}
        <span>
          <button>
            <svg viewBox="0 0 448 512" fill="currentColor">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
            Apagar tabela
          </button>
        </span>

        {/* Upload excel */}
        <span>
          <input type="file" ref={inputFile} onChange={updateSVG} />
          <label htmlFor="file" onClick={handleInputFile}>
            <svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
            </svg>
            Upload de arquivo
          </label>
        </span>
      </div>

      <C.TableContainer>
        <div className="table">
          <div className="table--vertical">
            <div className="table--row">
              <table>
                {/* {tableJSX} */}
                {state.jsx}
              </table>

              <button
                className="botao btn--column"
                onClick={() => {
                  dispatch({ type: "addColumn" });
                }}
              >
                +
              </button>
            </div>
            <button
              className="botao btn--row"
              onClick={() => {
                dispatch({ type: "addRow" });
              }}
            >
              +
            </button>
          </div>
        </div>
      </C.TableContainer>
    </C.Container>
  );
};
