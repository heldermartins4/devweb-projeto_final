import axios from "axios";
import { Resizable } from "re-resizable";
import { useEffect, useState, useRef, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import * as C from "./styles";
import FormData from "form-data";
import { host } from "../../utils/host";

export const Images = ({ imageId, data }) => {
  const socket = useContext(SocketContext);
  /*
    Qual é a ideia aqui.
    setUrl vai mudar tanto com o link quanto do upload, sendo do upload o 
    nome da imagem sendo salva no banco e no diretório `/public/upload/images/rooms`
    */
  const BaseURL = host;
  const [urlImage, setUrlImage] = useState("");
  const [url, setUrl] = useState(data.path);
  const [viewImageContent, setViewImageContent] = useState(true);
  const [viewImage, setViewImage] = useState(false);
  const [viewEmbedImg, setViewEmbedImage] = useState(true);

  useEffect(() => {
    if (data.path != "") {
      setViewImage(true);
      setViewEmbedImage(false);
    }
    socket.on("SpredingLoadImage", (data) => {
      if (data.imageId === imageId) {
        setUrl(data.link);
        setUrlImage(data.link);
        setViewImage(true);
        setViewEmbedImage(false);
      }
    });
  }, []);

  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // formatos válidos

  const changeURLImage = (e) => {
    setUrlImage(e.target.value);
  };

  const handleAddNewImage = (e) => {
    setUrl(urlImage);
    setViewEmbedImage(false);
    setViewImage(true);
    socket.emit("UploadLinkImage", {
      currentRoom: sessionStorage.getItem("currentRoom"),
      imageId: imageId,
      link: urlImage,
    });
  };

  // verifica se há allgum arquivo!
  const [file, setFile] = useState();

  const addImg = (e) => {
    // console.log(e.target.value, "arquivo")
    let fileImg = e.target.files; // filename, extension -> esse é o array completo
    // console.log(fileImg[0], "arquivo") -> fileImg[0] é o arquivo aparente.

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
      formData.append("file", fileImg[0]);

      console.log(formData);

      axios
        .post(BaseURL + "/DocumentImageUpload", formData, {
          headers: {
            Authorization:
              sessionStorage.getItem("currentRoom") + " " + imageId,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.table(response);
          setUrl((prevState) => {
            return `${BaseURL}/Document/${response.data.filename}`;
          });
          setUrlImage((prevState) => {
            return `${BaseURL}/Document/${response.data.filename}`;
          });
          setViewImage(true);
          setViewEmbedImage(false);
          socket.emit("uploadImageReflect", {
            imageId: imageId,
            currentRoom: sessionStorage.getItem("currentRoom"),
            link: `${BaseURL}/Document/${response.data.filename}`,
          });
        });
    }
  };

  const [fromLink, setToupload] = useState(false); // opções de adicionar imagem
  const [hover, setHover] = useState(false);

  return (
    <C.ContainerEmbedImage>
      <C.Image viewImage={viewImage}>
        <div className="options--image">
          <span
            onClick={() => {
              setViewEmbedImage(true);
            }}
          >
            <svg viewBox="0 0 512 512" fill="currentColor" className="bi">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </span>

          <span>
            <svg viewBox="0 0 448 512" fill="currentColor" className="bi">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </span>
        </div>
        <Resizable
          className="image-container"
          onResizeStart={() => {
            setHover(true);
          }}
          onResizeStop={() => {
            setHover(false);
          }}
          defaultSize={{
            width: 560,
            height: 320,
          }}
          style={{
            borderLeft: hover ? "1px solid #f00" : "#ccc",
            borderRight: hover ? "1px solid #f00" : "#ccc",
            borderTop: hover ? "1px solid #f00" : "#ccc",
            borderBottom: hover ? "1px solid #f00" : "#ccc",
            borderRadius: 20,
          }}
        >
          <img src={url} />
        </Resizable>
      </C.Image>

      <C.Container
        fromLink={fromLink}
        view={viewEmbedImg}
        viewImageContent={viewImageContent}
      >
        <div className="options">
          <span
            onClick={() => {
              setToupload(false);
            }}
          >
            Link
          </span>
          <span
            onClick={() => {
              setToupload(true);
            }}
          >
            Upload
          </span>
        </div>

        <div
          className="link"
          style={{
            display: fromLink ? "none" : "flex",
          }}
        >
          <input
            type="text"
            placeholder="Cole aqui o endereço da imagem"
            value={urlImage}
            onChange={changeURLImage}
            onBlur={handleAddNewImage}
          />
        </div>

        <div
          className="upload"
          style={{
            display: fromLink ? "flex" : "none",
          }}
        >
          <input type="file" value={file} onChange={addImg} />
        </div>
      </C.Container>
    </C.ContainerEmbedImage>
  );
};
