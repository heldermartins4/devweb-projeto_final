import React, { useContext, useEffect } from "react";

import * as C from "./styles";
import { ThemeContext } from "styled-components";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import SocketContext from "../../contexts/SocketContext";
import { host } from "../../utils/host";

const Logo_Cubs = "/assets/Icons-Cubs/CubsLogo.png";

type Props = {
  toggleTheme(): void;
  sidebarToggle: boolean;
  resizeSidebar(): void;
  handleMobileToggleMenu(): void;
  mobileMenu: boolean;
};

export const Sidebar: React.FC<Props> = ({
  toggleTheme,
  sidebarToggle,
  resizeSidebar,
  mobileMenu,
  handleMobileToggleMenu,
}) => {
  // router
  const router = useRouter();

  const { colors, title } = useContext(ThemeContext);
  const socket = useContext(SocketContext);

  const [logout, setLogout] = useState(false);

  // const [mobileMenu, setMobileMenu] = useState(false);
  const BaseURL = host;
  const [profile, setProfile] = useState(
    "https://www.shareicon.net/data/128x128/2016/08/05/806962_user_512x512.png"
  );
  const [nameUser, setNameUser] = useState("user");
  const [emailUser, seEmailUser] = useState("");

  const handlelogout = () => {
    // sessionStorage.removeItem("token");
    // router.push("/login");
    setLogout(!logout);
  };
  //pegar os dados dos usuarios
  useEffect(() => {
    socket.emit(
      "getProfileData",
      { Token: "Bearer " + sessionStorage.getItem("token") },
      (resp) => {
        const { email, icon, name, created_at } = resp;
        // console.log(email,icon, name)
        sessionStorage.setItem("nameProfile", name);
        sessionStorage.setItem("emailProfile", email);
        sessionStorage.setItem("iconProfile", icon);
        sessionStorage.setItem("profileWasCreated_at", created_at);
        setProfile((prevState) => {
          return `${BaseURL}/userprofile/${icon}`;
        });
        let xName = name.split(" ");
        let firstName = xName[0];
        if (firstName.length > 8) {
          setNameUser((prevState) => firstName.replace(firstName[5], "..."));
        } else {
          setNameUser((prevState) => firstName);
        }

        seEmailUser(email);
      }
    );
  }, []);

  const [themeToggle, setThemeToggle] = React.useState(false);

  const handleThemeToggle = () => {
    setThemeToggle(!themeToggle);
    toggleTheme();
    title === "dark";
  };

  // const handleMobileToggleMenu = () => {
  //   setMobileMenu(!mobileMenu);
  // };

  return (
    <>
      <C.SidebarToggleMenu menu={mobileMenu}>
        <span className="toggle-menu active" onClick={handleMobileToggleMenu}>
          <FontAwesomeIcon
            icon={faBars}
            style={{
              display: mobileMenu ? "none" : "initial",
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            style={{
              display: mobileMenu ? "initial" : "none",
            }}
          />
        </span>
      </C.SidebarToggleMenu>

      <C.Sidebar sidebarToggle={sidebarToggle} menu={mobileMenu}>
        <C.SidebarContainer menu={mobileMenu} sidebarToggle={sidebarToggle}>
          <div className="flex">
            <div className="resize-menu" onClick={resizeSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: sidebarToggle ? "initial" : "none" }}
                fill="currentColor"
                className="bi bi-chevron-double-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: sidebarToggle ? "none" : "initial" }}
                fill="currentColor"
                className="bi bi-chevron-double-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>

            <div className="menu-options">
              <span className="menu-item logo-item">
                <div className="logo">
                  <img src={Logo_Cubs} />
                </div>
                <p>Cub's</p>
              </span>

              <Link href="/workspace">
                <span className="menu-item">
                  <div className="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-grid"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                    </svg>
                  </div>
                  <p>Workspace</p>
                </span>
              </Link>

              <Link href="/agenda">
                <span className="menu-item">
                  <div className="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-calendar-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                  </div>
                  <p>Agenda</p>
                </span>
              </Link>
            </div>

            <div className="user-options">
              <div className="separator"></div>
              <span className="menu-item" onClick={handleThemeToggle}>
                <div className="icon-container theme">
                  {/** Tema Claro */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: themeToggle ? "initial" : "none" }}
                    fill="currentColor"
                    className="bi bi-moon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                  {/** Tema Escuro */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: themeToggle ? "none" : "initial" }}
                    fill="currentColor"
                    className="bi bi-sun"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                  </svg>
                </div>
                <p>Tema</p>
              </span>

              <Link href="/usuario">
                <span className="menu-item profile">
                  <div className="icon-container">
                    <img src={profile} />
                  </div>
                  <p>Usuario</p>
                </span>
              </Link>
            </div>
          </div>
        </C.SidebarContainer>
      </C.Sidebar>
    </>
  );
};
