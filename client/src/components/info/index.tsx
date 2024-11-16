import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import * as C from "./styles";
import parse from "react-html-parser";
import { host } from "../../utils/host";

export const TaskInfo = () => {
  const BaseURL = host;
  const pathProfile = BaseURL + "/userprofile";

  const router = useRouter();
  useEffect(() => {
    setTask((prevState) => sessionStorage.getItem("GAGA"));
  }, []);
  const [task, setTask] = useState("");

  const ChangeNameTask = (e) => {
    setTask(e.target.value);
  };

  // propertiesTask

  // status Kanban
  const [statusTask, setStatusTask] = useState(false);

  const handleChangeStatusTask = () => {
    setStatusTask(!statusTask);
  };

  // ownerTask
  const [viewDropdownOwner, setViewDropdownOwner] = useState(false);
  const users = [
    {
      icon: pathProfile.concat(
        "/1670122524188_217882081_3490443287905844_8533724798751629911_n.jpg"
      ),
      email: "kelsc@gmail.com",
    },
    {
      icon: pathProfile.concat(
        "/1670122556968_295143059_1014464099222180_6719623139721774489_n.jpg"
      ),
      email: "ju@gmail.com",
    },
  ];

  const [owner, setOwner] = useState("");
  const handleSetInputEmail = (e) => {
    setOwner(e.target.value);
  };

  // schedule
  const [viewDropdownSchedule, setViewDropdownSchedule] = useState(false);

  // contentTask
  const [contentTask, setContentTask] = useState("");
  const handleSetContentTask = (e) => {
    setContentTask(e.target.value);
  };

  return (
    <>
      <C.ContainerTask>
        <C.HeaderTask statusTask={statusTask}>
          <div>
            <span
              onClick={() => {
                router.back();
                //sessionStorage.removeItem("GAGA")
              }}
            >
              {" "}
              {/** back to the previous page */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Sem título"
              value={task}
              onChange={ChangeNameTask}
            />
            {/** Nome da task */}
          </div>
          <div>
            {/** status task */}
            <svg
              viewBox="0 0 512 512"
              className="bi bi-checked"
              onClick={handleChangeStatusTask}
            >
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337l-17 17-17-17-64-64-17-17L160 222.1l17 17 47 47L335 175l17-17L385.9 192l-17 17z" />
            </svg>
          </div>
        </C.HeaderTask>

        <C.PropertiesTask
          viewDropdownOwner={viewDropdownOwner}
          viewDropdownSchedule={viewDropdownSchedule}
        >
          {/** Adicionar proprietários a tarefa */}
          <div className="owner">
            Autores da tarefa
            <button
              onClick={() => {
                setViewDropdownOwner(!viewDropdownOwner);
              }}
            >
              <svg viewBox="0 0 448 512" fill="currentColor" className="bi">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </button>
          </div>
          {/** Modal -> Adc. usuários */}
          <div className="owner--modal">
            <input
              type="email"
              value={owner}
              onChange={handleSetInputEmail}
              placeholder="Quem será o responsável?"
            />
            <ul>
              {users
                .filter((key) =>
                  owner.length > 0
                    ? key.email.toLowerCase().includes(owner) &&
                      key.email[0].toLowerCase() == owner[0]
                    : ""
                )
                .map((index) => {
                  return (
                    <li
                      onClick={() => {
                        setOwner("");
                        setViewDropdownOwner(!viewDropdownOwner);
                      }}
                    >
                      <img src={index.icon} />
                      {index.email}
                    </li>
                  );
                })}
            </ul>
          </div>

          {/** Botão p/ configurar tempo da task & adc. no calendário */}
          <div
            className="options-calendar"
            onClick={() => {
              setViewDropdownSchedule(!viewDropdownSchedule);
            }}
          >
            <svg viewBox="0 0 448 512" fill="currentColor" className="bi">
              <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
            </svg>
          </div>
          {/** Modal -> Adc. prop. calendar */}
          <div className="schedule--modal">
            <div className="all-day"></div>
            Início
            <div className="start">
              <input type="date" />
              <input type="time" />
            </div>
            Fim
            <div className="end">
              <input type="date" />
              <input type="time" />
            </div>
            <button>Pronto</button>
          </div>
        </C.PropertiesTask>

        <C.ContentTask
          value={contentTask}
          onChange={handleSetContentTask}
          placeholder="Escreva aqui a descrição da tarefa"
        />
      </C.ContainerTask>
    </>
  );
};
