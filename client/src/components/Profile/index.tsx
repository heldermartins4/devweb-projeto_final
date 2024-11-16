import * as C from "./styles";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../contexts/SocketContext";
import { useRouter } from "next/router";
import axios from "axios";
import FormData from "form-data";
import { host } from "../../utils/host";

export const Profile = () => {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const BaseURL = host;

  const [profile, setProfile] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [logout, setLogout] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);

  // Função para acessar sessionStorage de forma segura
  const getSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
    return null;
  };

  const setSessionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  };

  const removeSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  };

  // Pegar os dados dos usuários
  useEffect(() => {
    const token = getSessionStorage("token");
    if (token) {
      socket.emit("getProfileData", { Token: "Bearer " + token }, (resp) => {
        const { email, icon, name } = resp;
        setSessionStorage("nameProfile", name);
        setSessionStorage("emailProfile", email);
        setSessionStorage("iconProfile", icon);

        setProfile(`${BaseURL}/userprofile/${icon}`);
        setNameUser(name);
        setEmailUser(email);
      });
    }
  }, [socket, BaseURL]);

  // Função para trocar a imagem do perfil
  const addImg = (e) => {
    let fileImg = e.target.files;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (allowedExtensions.exec(e.target.value)) {
      if (fileImg[0].size > 500000) {
        alert("O arquivo é maior que 500kb");
      } else {
        const newImage = confirm("Tem certeza que deseja trocar de imagem?");
        if (newImage) {
          const token = getSessionStorage("token");
          if (token) {
            let formData = new FormData();
            formData.append("file", fileImg[0]);

            axios
              .post(BaseURL + "/ProfileImageUpload", formData, {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                setSessionStorage("iconProfile", response.data.filename);
                setProfile(`${BaseURL}/userprofile/${response.data.filename}`);
              });
          }
        }
      }
    } else {
      alert("O arquivo enviado não é uma imagem válida.");
    }
  };

  // Trocar bichos
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

  const changeBichos = (bicho) => {
    const token = getSessionStorage("token");
    if (token) {
      socket.emit(
        "changeAnimalProfile",
        { Token: "Bearer " + token, animal: bicho },
        (resp) => {
          setSessionStorage("iconProfile", resp);
          setProfile(`${BaseURL}/userprofile/${resp}`);
        }
      );
    }
  };

  const changeName = (e) => {
    setNameUser(e.target.value);
  };

  const sendNewName = () => {
    const token = getSessionStorage("token");
    if (token) {
      socket.emit(
        "changeUserName",
        { name: nameUser, Token: "Bearer " + token },
        (res) => {
          setSessionStorage("nameProfile", res);
        }
      );
    }
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
                getSessionStorage("profileWasCreated_at") || ""
              ).toLocaleDateString("pt-br")}
            </span>
          </div>
          <div className="profile-img">
            <img src={profile} alt="Perfil" />
            <span onClick={() => setPhotoModal(!photoModal)}>
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
          {photoModal && (
            <div className="set-images modal">
              <div className="close-modal" onClick={() => setPhotoModal(false)}>
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
                  {bixos.map((img) => (
                    <img
                      key={img}
                      src={`${BaseURL}/userprofile/${img}.png`}
                      alt={img}
                      onClick={() => changeBichos(img + ".png")}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </C.FeaturedProfile>

        <C.Options>
          <div>
            <span onClick={() => setLogout(true)}>
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

      {logout && (
        <C.Logout logout={logout}>
          <h3>Tem certeza que deseja encerrar esta sessão?</h3>
          <div className="options">
            <button
              onClick={() => {
                removeSessionStorage("token");
                router.push("/login");
              }}
            >
              Sim, Sair
            </button>
            <button onClick={() => setLogout(false)}>Não, Cancelar</button>
          </div>
        </C.Logout>
      )}
    </>
  );
};
