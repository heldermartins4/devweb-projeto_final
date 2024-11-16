import * as C from "./styles";

import { useRouter } from "next/router";

import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks, liftinFunctions}) => {

  const BaseURL = process.env.HOST_CLIENTSERVER || 'http://localhost:5000';
  const pathProfile = BaseURL + "/userprofile";

  const router = useRouter();

  const color = column.color;

  // to kanban functions
  const getTaskContent = (text:string,taskId:number) =>{
    //essa função eleva esses dados ao kanban
    // console.log("content Task - inside the column", text, "task id: ", taskId,"columnid: ", columnId)
    liftinFunctions.addTaskContent(text,taskId);
  }

  const handleAddTask = () => {
    // função para adicionar novas tarefas
   liftinFunctions.newTask(column.id)
    
  }

  const [updateTask, setUpdateTask] = useState(false);
  
  // const [statusTasks, setStatusTasks] = useState(false);
  // const handleChangeStatusTask = () => {
  //   setStatusTasks(!statusTasks); // muda o status da task no kanban
  // }

  const [columnTitle, setColumnTitle] = useState(column.title);
  const [selectOptions, setSelectOptions] = useState(false);

  const ChangeTitleKanban = (e) => {
    setColumnTitle(e.target.value);
  }

  const [options, setOptions] = useState(false); // visualizar opções das tasks

  const handleChangeColor = () => {
    setOptions(!options);
  }

  // aqui vai uma função que se conseguir simplficar é sucesso
  const [columnColor, setColumnColor] = useState(color);

  // muda para a cor verde
  const handleColorRed = () => {
    setColumnColor("#e4254f");
  }
  const handleColorGreen = () => {
    setColumnColor("#32d762");
  }
  const handleColorBlue = () => {
    setColumnColor("#47a0e9");
  }
  const handleColorYellow = () => {
    setColumnColor("#e0c111");
  }
  const handleColorPink = () => {
    setColumnColor("#eb60c1");
  }
  const handleColorPurple = () => {
    setColumnColor("#8c3ecc");
  }

  return (
    <>
    <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
      <C.Columns 
          color={columnColor}
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
        <C.HeaderColumns color={columnColor}>
          <div className="header--column">
            <input 
            type="text" 
            value={columnTitle} 
            onChange={ChangeTitleKanban}
            onBlur={(e)=>{liftinFunctions.changeColumnTitle(e.target.value,Number(column.id))}}
            />
          <div>
            <span onClick={() => {
              setSelectOptions(!selectOptions)
              setOptions(false)
            }}>
            <svg fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            </span>
            </div>
          </div>
          <C.OptionsColumn style={{
            display: selectOptions ? "block" : "none"
          }}>
            <div className="col-1" style={{
              display: options ? "none" : "block"
            }}>
              <ul>
                <a onClick={() => {
                  setColumnTitle("");
                }} className="option--column">
                  <li>
                  <svg viewBox="0 0 512 512" fill="currentColor" className="bi">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                  </svg>
                    <span>Renomear</span>
                  </li>
                </a>
                
                <a onClick={handleChangeColor} className="option--column">
                  <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="bi"><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm0-96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zM288 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 96c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z"/></svg>
                    <span>Alterar cor</span>
                  </li>
                </a>
                
                <a onClick={() => {
                  // seria a função de apagar a task
                }} className="option--column">
                  <li>
                  <svg viewBox="0 0 448 512" fill="currentColor" className="bi"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    <span>Lixeira</span>
                  </li>
                </a>
                
              </ul>
            </div>
            <div className="col-2" style={{
              display: options ? "block" : "none"
            }}>
              <div className="display">
                <div className="option--color red" onClick={handleColorRed}></div>
                <div className="option--color green" onClick={handleColorGreen}></div>
                <div className="option--color blue" onClick={handleColorBlue}></div>
                <div className="option--color yellow" onClick={handleColorYellow}></div>
                <div className="option--color pink" onClick={handleColorPink}></div>
                <div className="option--color purple" onClick={handleColorPurple}></div>
              </div>
            </div>
          </C.OptionsColumn>
        </C.HeaderColumns>

        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <C.AreaTasks
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {/** esse provavelmente é o caminho para dropar as colunas */}
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={`${task.id}`} index={index}> 
                  {(draggableProvided, draggableSnapshot) => {

                    const [contentTask, setContentTask] = useState(task.content);
                   
                    const RenameTask = (e) => {
                      setContentTask(e.target.value);
                    }

                    if (draggableSnapshot.isDragging) {
                      // if (draggableSnapshot) {
                      //   isDragging(true)
                      //   // console.log(drag, "isdrag")
                      // }
                      
                      draggableProvided.draggableProps.style.opacity = 0.5;
                      draggableProvided.draggableProps.style.left = undefined;
                      draggableProvided.draggableProps.style.top = undefined;
                      draggableProvided.draggableProps.style.position = undefined; // limita erros de position --item
                    }
                    return (
                      <C.Card
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <C.Task>
                          <C.TaskContent>
                            <p
                              style={{
                                display: updateTask ? "none" : "block"
                              }}
                            >{contentTask}</p>

                            <textarea 
                            value={contentTask}
                            onChange={RenameTask}
                            onBlur={(e)=>{// get data from task
                            getTaskContent(e.target.value,task.id);
                           
                            setUpdateTask(!updateTask);
                            }}
                          
                            placeholder="Sem título"
                            style={{
                              display: updateTask ? "block" : "none"
                            }}
                            autoFocus
                            ></textarea>
                          </C.TaskContent>

                            <C.OptionsTasks>
                              <div className="options--tasks">
                                <span onClick={() => {
                                  setUpdateTask(true); // editar nome da task(apenas abre)
                                }}>
                                <svg viewBox="0 0 512 512" fill="currentColor" className="bi">
                                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                </svg>
                                </span>
                                <span onClick={() => {
                                  // direcionar as informações sobre a task
                                  router.push("/info");
                                }}>
                                <svg viewBox="0 0 512 512" fill="currentColor" className="bi"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>
                                </span>

                                <span>
                                  <svg fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                  </svg>
                                </span>
                                
                              </div>
                            </C.OptionsTasks>
                        </C.Task>
                      </C.Card>
                    )}
                  }
                </Draggable>
              ))}
              <C.AddTask onClick={handleAddTask}>+</C.AddTask>
            </C.AreaTasks>
          )}
        </Droppable>
      </C.Columns>
      )}</Droppable>
    </>
  );
};

export default Column;
