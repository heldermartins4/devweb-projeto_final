import React, { useEffect, useState, useRef,useContext } from "react";
import * as C from "./styles";
import SocketContext from "../../contexts/SocketContext";

export const TextEditor = ({text,NoteId}) => {
const socket = useContext(SocketContext);
  // Componente Editor de Texto
  let contentDiv = useRef(null)

  // contentDiv.current =text;
  console.log("text",text)

  const [content, setContent] = useState(text)
  const [elem, setElem] = useState("")
  const [mouseView, setMouseView] = useState(false)

  const [coord, setCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    socket.on("SpreadingNoteText",(data)=>{
     console.log("data",data)
      if(NoteId === data.NoteId){
       setContent(data.text)
      }
    })




    if (elem.length) {
      setMouseView(true)
    } else {
      setMouseView(false)
    }
  })

  function createMarkup () {
    return {__html: content}
  }

  const deleteTextEditor = (e) => {
    // console.log("A letra:", e.key)
    if (e.key == 'Backspace' && contentDiv.current?.innerHTML == '') {
      // função para deletar...
    }
  }


  const written = () => {
    // console.log(contentDiv.current?.innerHTML)
    
    setContent(contentDiv.current?.innerHTML)
    setMouseView(false)
   
    console.log(content, "Conteúdo para salvar no banco",contentDiv.current?.innerHTML)
    socket.emit("NoteUpdatingText",{
      currentRoom:sessionStorage.getItem("currentRoom"),
      NoteId:NoteId,
      text:contentDiv.current?.innerHTML.toString()
    })
   
  }

  const setToTitle = () => {
    setContent(content.replace(elem, `<h2>${elem}</h2>`))
    // console.log(elem)
  }

  const setToBold = () => {
    setContent(content.replace(elem, `<b>${elem}</b>`))
    // console.log(elem)
  }

  const setToItalic = () => {
    setContent(content.replace(elem, `<i>${elem}</i>`))
    // console.log(elem)
  }

  const setToBlockCode = () => {
    setContent(content.replace(elem, `<br><span>${elem}</span><br>`))
    // console.log(elem)
  }

  const selectText = (e) => {
    setElem(window.getSelection().toString())

    setCoord({ x: e.screenX, y: e.screenY });
  }

  return (
    <C.Container>
      <div 
          className="text-editor" 
          data-text="Escreva algo novo..."
          dangerouslySetInnerHTML={createMarkup()}
       
          onBlur={written}
          onMouseUp={selectText}
          onKeyDown={deleteTextEditor}
          ref={contentDiv}
          contentEditable></div>

          <div className="tools" 
          style={{
            position: "absolute",
            top: `${(coord.y / 2) + 30}px`,
            left: `${(coord.x / 2) + 40}px`,
            display: mouseView ? 'initial' : 'none'
          }}>
            <button className="title" onClick={setToTitle}>
              T
            </button>
            <button className="bold" onClick={setToBold}>
              B
            </button>
            <button className="italic" onClick={setToItalic}>
              I
            </button>
            
              <button className="code" onClick={setToBlockCode}>
                &lt;/&gt;
              </button>
           
          </div>
    </C.Container>
  )
};