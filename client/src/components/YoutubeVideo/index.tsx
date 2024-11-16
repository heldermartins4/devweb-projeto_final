import * as C from "./styles";
import { Resizable } from "re-resizable";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../contexts/SocketContext";

export const YoutubeVideo = ({ youtubeId, data }) => {
  const [url, setURL] = useState(data.link);
  const isDisplayReady = data.link != "" ? true : false;
  const [displayVideo, setDisplayVideo] = useState(isDisplayReady);
  const socket = useContext(SocketContext);
  const embedYoutubeVideo = () => {
    if (url.includes("watch?v=") == true) {
      let link = url.replace("watch?v=", "embed/");
      setURL((prevState) => link); // na hora de salvar, temos que salvar assim
      socket.emit("UpdateYoutubeLink", {
        youtubeId: youtubeId,
        link: link,
        currentRoom: sessionStorage.getItem("currentRoom"),
      });
    } else {
      socket.emit("UpdateYoutubeLink", {
        youtubeId: youtubeId,
        link: url,
        currentRoom: sessionStorage.getItem("currentRoom"),
      });
    }
  };
  useEffect(() => {
    socket.on("SpreadingYoutubeLink", (data) => {
        console.table(data)
      if (youtubeId === data.youtubeId) {
        setURL((prevState) => data.link);
        setDisplayVideo(prevState => true);
      }
    });
  }, []);

  const setInput = (e) => {
    if (e.target.value !== "") {
      setURL(e.target.value);
      setDisplayVideo(true);
    } else {
      setDisplayVideo(false);
    }
  };

  return (
    <>
      <C.Container>
        <iframe
          src={url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: displayVideo ? "initial" : "none" }}
        ></iframe>
        <div className="embed">
          <input
            type="text"
            placeholder="Cole sua URL do youtube aqui"
            value={url}
            onBlur={embedYoutubeVideo}
            onChange={setInput}
          />
        </div>
      </C.Container>
    </>
  );
};
