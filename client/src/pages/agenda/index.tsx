import { useEffect, useRef, useState } from "react";

import Layout from "../../components/Layout";
import * as C from "./styles"
// fullCalendar: https://fullcalendar.io

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import local from '@fullcalendar/core/locales/pt-br';

const AddNewTask = ({date}) => {

    // titleContent
    const [title, setTitle] = useState("")
    const handleSetTitleTask = (e) => {
        setTitle(e.target.value)
    }
    // textContent
    const [content, setContent] = useState("")
    const handleSetContentTask = (e) => {
        setContent(e.target.value)
    }
    
    // inicio da tarefa - data
    const [startDateTask, setStartTask] = useState(date)
    const handleSetStartTask = (e) => {
        setStartTask(e.target.value)
        console.log("Data de inicio: ", new Date(startDateTask))
    }

    // inicio da tarefa - tempo
    const [timeStartTask, setTimeStartTask] = useState("")
    const handleSetStartTimeTask = (e) => {
        setTimeStartTask(e.target.value)
        console.log(timeStartTask)
    }

    // fim da tarefa - data
    const [endDateTask, setEndDateTask] = useState("")
    const handleSetEndTask = (e) => {
        setEndDateTask(e.target.value)
        console.log("data final: ", new Date(endDateTask))
    }

    // fim da tarefa - tempo
    const [timeEndTask, setTimeEndTask] = useState("")
    const handleSetEndTimeTask = (e) => {
        setTimeEndTask(e.target.value)
        console.log(new Date(timeEndTask))
    }

    const addNewTask = () => {
        // function add newTask goes here
        const data = {
            title:title,
            content:content,
            start:startDateTask + 'T' + timeStartTask,
            end:endDateTask + 'T' + timeEndTask
        }
        console.log(data, "Submit")
    }

    return (
        <>
        <h2>Adicionar nova tarefa</h2>
        {/** Título da tarefa */}
        <input 
        type="text" 
        placeholder="Adicione um título"
        className="title"
        value={title} 
        onChange={handleSetTitleTask} />

        {/** Descrição da tarefa */}
        <textarea 
        value={content} 
        className="desc"
        placeholder="Sobre o que se trata..."
        onChange={handleSetContentTask}></textarea>

        {/** Data da tarefa  | Usuário pode alterar por aqui ou clicar em outra...*/}

        <div className="deadline">
            <span>
                Início
                <div className="timeline">
                    <input 
                    type="date" 
                    value={startDateTask} 
                    onChange={handleSetStartTask}/>
                    <input 
                    type="time"
                    value={timeStartTask}
                    onChange={handleSetStartTimeTask} />
                </div>
            </span>
            <span>
                Fim
                <div className="timeline">

                    <input 
                    type="date" 
                    value={endDateTask} 
                    onChange={handleSetEndTask} />

                    <input 
                    type="time"
                    value={timeEndTask}
                    onChange={handleSetEndTimeTask} />
                </div>
            </span>
        </div>
        <button 
        className="btn"
        onClick={addNewTask}>Adicionar</button>
        </>
    )
}

const EventEditable = ({data}) => {

    // titleContent
    const [title, setTitle] = useState(data.title)
    const handleSetTitleTask = (e) => {
        setTitle(e.target.value)
    }
    // textContent
    const [content, setContent] = useState("")
    const handleSetContentTask = (e) => {
        setContent(e.target.value)
    }
    
    // inicio da tarefa - data
    const [startDateTask, setStartTask] = useState("")
    const handleSetStartTask = (e) => {
        setStartTask(e.target.value)
        console.log("Data de inicio: ", new Date(startDateTask))
    }

    // inicio da tarefa - tempo
    const [timeStartTask, setTimeStartTask] = useState("")
    const handleSetStartTimeTask = (e) => {
        setTimeStartTask(e.target.value)
        console.log(timeStartTask)
    }

    // fim da tarefa - data
    const [endDateTask, setEndDateTask] = useState("")
    const handleSetEndTask = (e) => {
        setEndDateTask(e.target.value)
        console.log("data final: ", new Date(endDateTask))
    }

    // fim da tarefa - tempo
    const [timeEndTask, setTimeEndTask] = useState("")
    const handleSetEndTimeTask = (e) => {
        setTimeEndTask(e.target.value)
        console.log(new Date(timeEndTask))
    }

    const handleSetTask = () => {
        // function add newTask goes here
        const data = {
            title:title,
            content:content,
            start:startDateTask + 'T' + timeStartTask,
            end:endDateTask + 'T' + timeEndTask
        }
        console.log(data, "Submit")
    }

    const content2 = "Escrever a documentação e enviar por email para a correção.                                                                                                                                                                                                                                                                  Sugestão:                                                                                                                                                                     'MARTINELLI (2009)' - Coloque 'propõe'"


    return (
        <>  
        <h2>Editar conteúdo</h2>
        {/** Título da tarefa */}
        <input 
        type="text" 
        placeholder="Adicione um título"
        className="title"
        value={title} 
        onChange={handleSetTitleTask} />

        {/** Descrição da tarefa */}
        <textarea 
        value={content2} 
        className="desc"
        placeholder="Sobre o que se trata..."
        onChange={handleSetContentTask}></textarea>

        {/** Data da tarefa  | Usuário pode alterar por aqui ou clicar em outra...*/}

        <div className="deadline">
            <span>
                Início
                <div className="timeline">
                    <input 
                    type="date" 
                    value="2022-12-05" 
                    onChange={handleSetStartTask}/>
                    <input 
                    type="time"
                    value="09:00"
                    onChange={handleSetStartTimeTask} />
                </div>
            </span>
            <span>
                Fim
                <div className="timeline">

                    <input 
                    type="date" 
                    value="2022-12-18"
                    onChange={handleSetEndTask} />

                    <input 
                    type="time"
                    value="18:30"
                    onChange={handleSetEndTimeTask} />
                </div>
            </span>
        </div>

        <div className="options--event">
            <button 
            className="btn"
            onClick={handleSetTask}>Pronto</button>
            <button 
            className="drop"
            onClick={handleSetTask}>
                <svg viewBox="0 0 448 512" fill="currentColor" className="bi">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
            <button 
            className="check"
            onClick={handleSetTask}>
                <svg viewBox="0 0 512 512" fill="currentColor" className="bi"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            </button>
            
        </div>
        </>
    )
}

export default function Scheduler () {

    const calendarRef = useRef(null);
    const [viewModal, setViewModal] = useState<JSX.Element | null>(null)
    const handleCloseModal = () => {
        setViewModal(null)
    }

    // caso clique na data!
    const handleDateClick = (arg) => { 
        // alert(arg.dateStr) // retorna a data da tarefa

        setViewModal(
        <C.Modal>
            <div className="header">
                <button onClick={handleCloseModal}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                </button>
            </div>
            <AddNewTask date={arg.dateStr} />
        </C.Modal>
        )
    }


    // caso clique no evento | ex: apagar evento
    const handleClickEvent = (e) => {
        // console.log(e) // tudo que você quiser saber sobre o evento
        setViewModal(
        <C.Modal>
            <div className="header">
                <button onClick={handleCloseModal}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
                </button>
            </div>
            <EventEditable data={e.event} />
        </C.Modal>
        )
    }

    // let day,week,month;
    // day = "timeGridDay"
    // week = "dayGridWeek"
    // month = "dayGridMonth"

    const [viewCalendar, setViewCalendar] = useState("dayGridMonth")

    // muda a visualização do calendário (dia, semana, mês)
    useEffect(() => {
        console.log("View Changed", viewCalendar);
        const { current: calendarDom } = calendarRef;
        const API = calendarDom ? calendarDom.getApi() : null;
        API && API.changeView(viewCalendar);
      }, [viewCalendar]);

    const tasks = [
        {
            id:"1",
            title: "TCC - Cub's > Documentação",
            start: "2022-12-05T09:00:00",
            end: "2022-12-18T18:30:00"
        },
    ]

    function formatDate (date) {
        return new Date(date)
    }

    for (let i = 0; i < tasks.length; i++) {
        // const element = tasks[i];
        // console.log(element, "***")

        let start, end, today;
        start = formatDate(tasks[i].start.replace('T', ' '))
        end = formatDate(tasks[i].end.replace('T', ' '))
        today = new Date()
        // verifica se a data do evento no mesmo dia 
        if (today.toDateString() == start.toDateString()) {
            console.log("É hoje!")
        } else {
            console.log(`O evento: ${tasks[i].title} - não é hoje!`)
        }


        let date_1 = formatDate(tasks[i].start.replace('T', ' '))
        let date_2 = formatDate(tasks[i].end.replace('T', ' '))
        let difference_time = date_2.getTime() - date_1.getTime()
        let difference_days = difference_time / (1000 * 3600 * 24)
        let days = Math.round(difference_days)

        if (days <= (days*33/100)) {
            console.log(`Já se passou 33% dos dias para o evento: ${tasks[i].title}`)
        }
        else if (days <= (days*50/100)) {
            console.log(`Já se passou 50% dos dias para o evento: ${tasks[i].title}`)
        }
        else if (days == 0) {
            console.log(`O evento: ${days} - É hoje!`)
        }
        else if (days < 0) {
            console.log(`O evento: ${tasks[i].title} - já aconteceu`)
        }
    }

    return (
        <Layout>
            {viewModal}
            <C.Container>
                <FullCalendar
                ref={calendarRef}
                locale={local}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={viewCalendar}
                customButtons={{
                    hoje: {
                      text: 'Hoje',
                      click: function() {
                        setViewCalendar("timeGridDay")
                      },
                    },
                    semana: {
                      text: 'Semana',
                      click: function() {
                        setViewCalendar("dayGridWeek")
                      },
                    },
                    mes: {
                      text: 'Mês',
                      click: function() {
                        setViewCalendar("dayGridMonth")
                      },
                    },
                  }}
                headerToolbar={{
                    start: "prev,next",
                    center: "title",
                    end: 'hoje semana mes'
                }}
                events={tasks}
                eventClick={handleClickEvent}
                dateClick={handleDateClick}
                editable
                selectable
                />
            </C.Container>
        </Layout>
    )
}