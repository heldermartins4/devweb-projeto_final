import { useEffect, useState } from "react";

import Link from "next/link";
import * as C from "../styles/Sign_In/styles";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useRouter } from "next/router";
import { host } from "../utils/host";
const pathSignUp = "/assets/Sign_In/Sign_In.png";

// Erro ao validar valor dos formulários ( atribuições JSX )
const Error = ({ error, animateError }) => {
  return (
    <C.validateForm animateError={animateError}>
      <FontAwesomeIcon icon={faTriangleExclamation} /> {error}
    </C.validateForm>
  );
};

export default function Login() {
  // importando server
  const BaseURL = host;
  // router
  const router = useRouter();

  const [Iemail, setIemail] = useState("");
  const [Ipassword, setIpassword] = useState("");

  const handleInputChangeEmail = (e) => {
    setIemail(e.target.value);
  };

  const handleInputChangePassword = (e) => {
    setIpassword(e.target.value);
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

  const authUser = () => {
    let erro = "Preenchimento dos campos obrigatório!";

    if (Iemail === "" || Ipassword === "") {
      showError();
      setMessageErro(<Error animateError={animateError} error={erro} />);
    } else {
      const data = {
        email: Iemail,
        password: Ipassword,
      };

      console.log(data);

      axios
        .post(`${BaseURL}/AuthenticateUser`, data)
        .then((response) => {
          console.log(response.data);
          console.log(response.headers);
          sessionStorage.setItem("token", response.data);
          router.push("/workspace");
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
      authUser();
    }
  };

  useEffect(() => {
    // verifica se existe o token de autenticação
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/workspace");
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
              <h1>Login</h1>
              {messageErro}
              <C.FormContainer>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={Iemail}
                  onChange={handleInputChangeEmail}
                  autoFocus
                />
                <input
                  type={passwordShown ? "password" : "text"}
                  placeholder="Senha"
                  value={Ipassword}
                  onChange={handleInputChangePassword}
                />
                <div className="showPassword">
                  <input type="checkbox" onClick={togglePassword} />
                  <label>Mostrar senha</label>
                </div>
                <button onClick={authUser}>Entrar</button>
                <p>
                  Não possui uma conta?{" "}
                  <Link href="/cadastrar">
                    <a>Cadastra-se</a>
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
