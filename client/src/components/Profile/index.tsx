import * as C from "./styles";

import { useContext, useEffect, useState } from "react";
import SocketContext from "../../contexts/SocketContext";
import { useRouter } from "next/router";
import axios from "axios";
import FormData from "form-data";



export const Profile = () => {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const BaseURL = process.env.HOST_CLIENTSERVER || "http://ec2-3-17-183-122.us-east-2.compute.amazonaws.com:5000";
  const [profile, setProfile] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [logout, setLogout] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);

  //pegar os dados dos usuarios
  useEffect(() => {
    socket.emit(
      "getProfileData",
      { Token: "Bearer " + sessionStorage.getItem("token") },
      (resp) => {
        const { email, icon, name } = resp;
        console.log(email, icon, name);
        sessionStorage.setItem("nameProfile", name);
        sessionStorage.setItem("emailProfile", email);
        sessionStorage.setItem("iconProfile", icon);
        setProfile((prevState) => {
          return `${BaseURL}/userprofile/${icon}`;
        });
        let xName = name.split(" ");
        let firstName = xName[0];
        // if(firstName.length > 8) {
        // setNameUser(prevState => firstName.replace(firstName[5], "..."))
        // } else { setNameUser(prevState => firstName) }
        setNameUser((prevState) => name); // pega o nome todo do usuário

        setEmailUser(email);
      }
    );
  }, []);

  // aqui basicamente é onde rola a magic, onde quando você clicar
  // envia o nome da imagem e dá uma replace na que estava antes
  const bixos = [
    "aguia",
    "bicho_preguica",
    "bode",
    "castor",
    "cavalo",
    "cervo",
    "coruja",
    "crocodilo",
    "elefante",
    "girafa",
    "gorila",
    "guaxinim",
    "hipopotamo",
    "lama",
    "leao",
    "lobo",
    "macaco",
    "meerkat",
    "panda",
    "pinguim",
    "raposa",
    "tigre",
    "touro",
    "urso",
    "zebra",
  ];

  const addImg = (e) => {
    // console.log(e.target.value, "arquivo")
    let fileImg = e.target.files; // filename, extension -> esse é o array completo
    // console.log(fileImg[0].size, "arquivo")
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // formatos válidos

    console.log(fileImg[0]);

    // verify extension file
    if (allowedExtensions.exec(e.target.value)) {
      // alert(`O arquivo ${fileImg} é imagem!`)
      if (fileImg[0].size > 500000) {
        alert("O arquivo é maior que 500kb");
      } else {
        // alert("Upload em andamento...");
        const newImage = confirm("Tem certeza que deseja trocar de imagem?");
        if (newImage == true) {
          // aqui é onde deve começar o processo de upload...
          const token = sessionStorage.getItem("token");
          let formData = new FormData();
          formData.append("file", fileImg[0]);
          console.log(formData);
          axios
            .post(BaseURL + "/ProfileImageUpload", formData, {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              
                sessionStorage.setItem("iconProfile", response.data.filename)
                setProfile((prevState) => {
                  return `${BaseURL}/userprofile/${response.data.filename}`;
                });
            });
        }
      }
    } else {
      alert("Falha, o arquivo enviado não é uma imagem...");
    }
  };
  const changeBichos = (bicho) => {
    socket.emit(
      "changeAnimalProfile",
      { Token: "Bearer " + sessionStorage.getItem("token"), animal: bicho },
      (resp) => {
        sessionStorage.setItem("iconProfile", resp);
        setProfile((prevState) => {
          return `${BaseURL}/userprofile/${resp}`;
        });
      }
    );
  };

  const changeName = (e) => {
    setNameUser((PrevState) => e.target.value);
  };
  const sendNewName = () => {
    socket.emit(
      "changeUserName",
      { name: nameUser, Token: "Bearer " + sessionStorage.getItem("token") },
      (res) => {
        sessionStorage.setItem("nameProfile", res);
      }
    );
  };

  return (
    <>
      <C.Container>
        <C.FeaturedProfile photoModal={photoModal}>
          <div className="info-user">
            <input
              type="text"
              value={nameUser}
              onChange={changeName}
              onBlur={sendNewName}
            />
            <p>{emailUser}</p>
            <span>
              Criado em{" "}
              {new Date(
                sessionStorage.getItem("profileWasCreated_at")
              ).toLocaleDateString("pt-br")}
            </span>{" "}
            {/* É para puxar a data de criação do perfil */}
          </div>
          <div className="profile-img">
            <img src={profile} />
            <span
              onClick={() => {
                setPhotoModal(!photoModal);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-images"
                viewBox="0 0 16 16"
              >
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
              </svg>
            </span>
          </div>
          <div
            className="set-images modal"
            style={{
              display: photoModal ? "initial" : "none",
            }}
          >
            <div
              className="close-modal"
              onClick={() => {
                setPhotoModal(!photoModal);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className="header">
              <strong>Selecione um bichinho ou </strong>
              <input type="file" name="file" onChange={addImg} />
            </div>
            <div className="content">
              <div className="bixos">
                {bixos.map((img) => {
                  return (
                    <img
                      // src={pathProfile.concat(img + ".png")}
                      src={`${BaseURL}/userprofile/${img}.png`}
                      onClick={() => {
                        changeBichos(img + ".png");
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </C.FeaturedProfile>
        <C.Options>
          <div>
            <span
              onClick={() => {
                // const token = sessionStorage.removeItem("token");
                // router.push("/login");
                setLogout(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              Sair
            </span>
          </div>
        </C.Options>
      </C.Container>
      <C.Logout logout={logout}>
        <h3>Tem certeza que deseja encerrar esta sessão?</h3>
        <div className="options">
          <button
            onClick={() => {
              const token = sessionStorage.removeItem("token");
              router.push("/login");
            }}
          >
            <p>Sim</p>
            <p>Sair</p>
          </button>
          <button
            onClick={() => {
              setLogout(false);
            }}
          >
            <p>Não</p>
            <p>Cancelar</p>
          </button>
        </div>
      </C.Logout>
    </>
  );
};
