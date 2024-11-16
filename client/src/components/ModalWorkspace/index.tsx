import * as C from "../../styles/ModalWorkspace/styles";
import * as M from "../SelectMembers/styles";

import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import SocketContext from "../../contexts/SocketContext";

type Props = {
  handleClose: () => void;
};

const BaseURL = process.env.HOST_CLIENTSERVER || "http://ec2-3-17-183-122.us-east-2.compute.amazonaws.com:5000"
const pathProfile = BaseURL + "/userprofile/";

export const ModalWorkspace = ({ handleClose }: Props) => {
  return (
    <>
      <C.Level>
        <CreateDocument handleClose={handleClose} />
      </C.Level>
    </>
  );
};

// Dois Forms

export const CreateDocument = ({ handleClose }: Props, props) => {
  const { colors } = useContext(ThemeContext);

  const [form, setForm] = useState(true);

  let [admin, setAdmin] = useState(false);
  let [selectMembers, setSelectMembers] = useState(false);

  const [IDocument, setIDocument] = useState("");

  const [IUserEmail, setIUserEmail] = useState("");
  const [header, setHeader] = useState({});
  const [dataMembers, setDataMembers] = useState([]);

  const socket = useContext(SocketContext);
  const newRoom = (t) => {
    t = { ...t, token: "Bearer " + sessionStorage.getItem("token") };
    socket.emit("newRoom", t, (resp) => {
      sessionStorage.setItem("workspaceId", resp.id);
    });
  };

  const AddNewMember = (t) => {
    t = { ...t, token: "Bearer " + sessionStorage.getItem("token") };
    socket.emit("addNewMember", t, (err) => {
      console.log(err, "addMemberError");
    });
  };

  const [members, setMembers] = useState([]); // recebe a lista dos emails
  // console.log(members, "emails");

  const getMembers = (email: string) => {
    if (email != "" && email != null) {
      const dado = {
        email: email,
        token:  "Bearer " +  sessionStorage.getItem("token")
      };

      socket.emit("getMembers", dado, (emails) => {
        // getMembers !!!!!!!!!!!!!!!
        // setSelectMembers(<Members members={emails} />);
        // console.log(email, "email")
        setMembers(emails); // altera o array members com dos dados recebidos!!!!!!
        setSelectMembers(!selectMembers);
      });
    } else {
      // selectMembersList()
      setSelectMembers(false);
    }
  };

  useEffect(() => {
    setHeader({
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    console.log(header);
  }, []);

  const handleBackForm = () => {
    setIDocument("");
    setIUserEmail("");
    setAdmin(false);
    setForm(form);
  };

  const handleForm = () => {
    setForm(false);

    if (IDocument == "") {
      setForm(true);
      console.log("Vazio"); // verifica se o campo está vazio, se sim, não permite criar o documento
    } else {
      const title = {
        title: IDocument,
        privateState: false,
      };
      newRoom(title);
    }

    setAdmin(false);
  };

  const handleIDocument = (e) => {
    setIDocument(e.target.value);
  };

  const handleIUserEmail = (e) => {
    setIUserEmail(e.target.value);
    getMembers(e.target.value);
  };

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const handleSubmit = async () => {
    const title = { title: IDocument };

    dataMembers.map((d) => {
      const addMember = {
        workspaceId: sessionStorage.getItem("workspaceId"),
        memberEmail: d.memberEmail,
        admin: d.admin,
      };
      console.log(addMember);
      AddNewMember(addMember);
    });

    // await axios
    //   .post(`${BaseURL}/AddMember`, addMember, header)
    //   .then((resp) => {
    //     console.log(resp.data);
    //   })
    //   .catch((err) => {});

    //  if () {}

    handleClose();
    setIDocument("");
    setIUserEmail("");
    setForm(true);
    setDataMembers([]);

    if (admin == true) {
      setAdmin(!admin);
    }
  };

  const removeMember = (e) => {
    const cache = [];
    const target = e.currentTarget.id;
    dataMembers.map((d) => {
      cache.push(d);
    });
    let newCache = cache.filter((f) => f.memberEmail != target);

    setDataMembers(newCache);
    console.log("remove", e.currentTarget.id, newCache);
  };

  const pressEnterForm = (e) => {
    if (e.key === "Enter") {
      handleForm();
    }
  };

  const pressEnterSubmit = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
      setAdmin(false);
    }
  };

  return (
    <>
      <C.LevelsPoint form={form}>
        <a className="point point-1" onClick={handleBackForm}></a>

        <a className="point point-2"></a>
      </C.LevelsPoint>

      <C.Container
        style={{
          display: form ? "initial" : "none",
        }}
      >
        <C.Title>Crie uma nova sala</C.Title>
        <input
          type="text"
          placeholder="Título"
          className="title--document"
          value={IDocument}
          onChange={handleIDocument}
          onKeyDown={pressEnterForm}
        />{" "}
        {/** Nome do documento */}
        <C.Footer>
          <button onClick={handleForm}>Próximo</button>
        </C.Footer>
      </C.Container>

      <C.Container
        style={{
          display: form ? "none" : "initial",
        }}
      >
        <C.Title>Adicionar integrantes</C.Title>
        <C.Area>
          <C.ListUsers>
            {dataMembers.map((d) => {
              const path = pathProfile.concat(d.img);
              return (
                <C.User
                  style={{
                    backgroundImage: `url(${path})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <a onClick={removeMember} id={d.memberEmail}>
                    <FontAwesomeIcon icon={faXmark} />
                  </a>
                </C.User>
              );
            })}
          </C.ListUsers>
          <input
            type="email"
            className="input--email"
            value={IUserEmail}
            onChange={handleIUserEmail}
            onKeyDown={pressEnterSubmit}
          />

          <br />

          {/** listMembers */}
          <M.SelectMembersContainer selectMembers={selectMembers}>
            {members.map((index) => {
              const cache = [];
              // console.log(index.email, "hehe");
              // aqui é onde é armazenado os dados do lista de membros
              // const [dataMembers, setDataMembers] = useState([]);
              const path = pathProfile.concat(index.img);

              return (
                <>
                  <M.ListMembers
                    onClick={() => {
                      // aqui vai
                      dataMembers.map((d) => {
                        cache.push(d);
                      });
                      cache.push({
                        img: index.img,
                        memberEmail: index.email,
                        admin: admin === false ? false : true,
                      });
                      setDataMembers(cache);
                      console.log(cache, "cache");
                      setIUserEmail("");
                      setSelectMembers(false);
                    }}
                  >
                    <div className="img">
                      <img src={path} />
                    </div>
                    <p>{index.email}</p>
                  </M.ListMembers>
                </>
              );
            })}
          </M.SelectMembersContainer>

          <label className="email">E-mail do usuário</label>
          <C.Admin admin={admin}>
            <input
              type="checkbox"
              onChange={handleAdmin}
              className="checkAdmin"
            />
            <label className="admin">Admin</label>
          </C.Admin>
        </C.Area>
        <C.Footer>
          <button onClick={handleSubmit}>Pronto</button>
        </C.Footer>
      </C.Container>
    </>
  );
};
