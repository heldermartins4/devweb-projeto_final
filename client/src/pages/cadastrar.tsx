import Link from "next/link";
import * as C from "../styles/Sign_Up/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { host } from "../utils/host";
const pathSignUp = "/assets/Sign_Up/Sign_Up.png";

// Erro ao validar valor dos formulários ( atribuições JSX )
const Error = ({ error, animateError }) => {
  return (
    <C.validateForm animateError={animateError}>
      <FontAwesomeIcon icon={faTriangleExclamation} /> {error}
    </C.validateForm>
  );
};

export default function Cadastrar() {
  // importando server
  const BaseURL = host;
  // router
  const router = useRouter();

  const [Iname, setIname] = useState("");
  const [Iemail, setIemail] = useState("");
  const [Ipassword, setIpassword] = useState("");
  const [IValidatePassword, setIValidatePassword] = useState("");

  const handleInputChangeName = (e) => {
    setIname(e.target.value);
  };
  const handleInputChangeEmail = (e) => {
    setIemail(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setIpassword(e.target.value);
  };
  const handleInputChangeValidatePassword = (e) => {
    setIValidatePassword(e.target.value);
  };

  const [passwordShown, setPasswordShown] = useState(true);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const [messageErro, setMessageErro] = useState<JSX.Element>();
  const [animateError, persistedError] = useState(false);
  function showError() {
    persistedError(!animateError);
  }

  const handleRegisterUsers = () => {
    let erro = "Preenchimento dos campos obrigatório!";

    // validação de email
    /**
     * Ex: (yourname) @ (domain) . (extension)(.again)
     * yourname - can be letter, numbers, dots and/or hyphens
     * domain - can be letters, numbers and/or hyphens
     * extension - (.) any letters
     * .again (occasionally) - (.) then any letters
     */
    const regex = new RegExp(
      /[a-zA-Z0-9._%+-]+@[a-z0-9•-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    );

    if (
      Iname === "" ||
      Iemail === "" ||
      Ipassword === "" ||
      IValidatePassword === ""
    ) {
      showError();
      setMessageErro(<Error animateError={animateError} error={erro} />);
    } else if (Ipassword.length < 8) {
      showError();
      setMessageErro(
        <Error
          animateError={animateError}
          error={"A senha deve conter ao menos 8 caracteres"}
        />
      );
    } else if (IValidatePassword !== Ipassword) {
      showError();
      setMessageErro(
        <Error animateError={animateError} error={"Senhas incorretas!"} />
      );
    } else if (regex.test(Iemail) == false) {
      showError();
      setMessageErro(
        <Error animateError={animateError} error={"Email inválido"} />
      );
    } else {
      const data = {
        name: Iname,
        email: Iemail,
        password: Ipassword,
      };

      console.log(data);
      axios
        .post(`${BaseURL}/CreateUser`, data)
        .then((response) => {
          console.log(response.data);
          router.push("/login");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
            erro = error.response.data.error;
          }

          showError();
          setMessageErro(<Error animateError={animateError} error={erro} />);
          console.log(error.toJSON());
        });
    }
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      handleRegisterUsers();
    }
  };

  useEffect(() => {
    // verifica se existe o token de autenticação
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <C.Container onKeyDown={pressEnter}>
      {/* GridLayout */}
      <C.GridLayout>
        {/* Col -- Svg image */}
        <C.Col>
          {/* Item */}
          <div className="image">
            <img src={pathSignUp} />
          </div>
        </C.Col>
        {/* Col -- Form */}
        <C.Col>
          {/* Form */}
          <div className="flex">
            <C.Form>
              <h1>Cadastrar</h1>
              {messageErro}
              <C.FormContainer>
                <input
                  type="text"
                  placeholder="Usuário"
                  onChange={handleInputChangeName}
                  value={Iname}
                  autoFocus
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  onChange={handleInputChangeEmail}
                  value={Iemail}
                />
                <input
                  type={passwordShown ? "password" : "text"}
                  placeholder="Senha"
                  onChange={handleInputChangePassword}
                  value={Ipassword}
                  //vou retirar o max lenght pq acho q ele atrapalha a experiencia do usuario
                  // maxLength={8}
                  min={8}
                />
                <input
                  type={passwordShown ? "password" : "text"}
                  placeholder="Confirmar senha"
                  onChange={handleInputChangeValidatePassword}
                  //vou retirar o max lenght pq acho q ele atrapalha a experiencia do usuario
                  // maxLength={8}
                  min={8}
                />
                <div className="showPassword">
                  <input type="checkbox" onClick={togglePassword} />
                  <label>Mostrar senhas </label>
                </div>
                <button onClick={handleRegisterUsers}>Cadastrar</button>
                <p>
                  Já possuo uma conta.{" "}
                  <Link href="/login">
                    <a>Entrar!</a>
                  </Link>
                </p>
              </C.FormContainer>
            </C.Form>
          </div>
        </C.Col>
      </C.GridLayout>
    </C.Container>
  );
}
