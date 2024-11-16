import { useState, useEffect } from "react";

import * as C from "./styles";
import { ThemeProvider } from "styled-components";

import light from "../../styles/themes/light";
import dark from "../../styles/themes/dark";
import GlobalStyle from "../../styles/global";
// Components
import { Sidebar } from "../Sidebar"; // Menu
import { useRouter } from "next/router";

import { Chat } from "../Chat/Content";

type Props = {
  sidebarToggle: boolean;
  logout: boolean;
};

export default function Layout({ children }, { logout }: Props) {
  const [theme, setTheme] = useState(light);
  const [sidebarToggle, setSidebarToggle] = useState(true);

  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileToggleMenu = () => {
    setMobileMenu(!mobileMenu);
    setChatInRoom(false);
  };

  const toggleTheme = () => {
    localStorage.setItem("theme", theme.title === "light" ? "dark" : "light");
    setTheme(theme.title === "light" ? dark : light);
  };
  // const socket = io("localhost:5000");
  //  socket.on("error",(err)=>{console.log(err,"dashBoard GetGeralError")});
  const router = useRouter();

  useEffect(() => {
    // verifica se existe o token de autenticação
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    let themeState = localStorage.getItem("theme");
    setTheme(themeState === "light" ? light : dark);
    // console.log(themeState);
  }, []);

  const resizeSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const [viewChat, hideChat] = useState(false);

  function setViewChat() {
    hideChat(!viewChat);
  }

  const [chatInRoom, setChatInRoom] = useState(false);

  useEffect(() => {
    if (router.pathname !== "/dashboard") {
      setChatInRoom(false);
    } else {
      setChatInRoom(true);

      if (mobileMenu !== false) {
        setChatInRoom(false);
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {/* Sidebar */}
      <Sidebar
        toggleTheme={toggleTheme}
        handleMobileToggleMenu={handleMobileToggleMenu}
        sidebarToggle={sidebarToggle}
        mobileMenu={mobileMenu}
        resizeSidebar={resizeSidebar}
      />
      {/** Chat-Button */}
      <C.ChatButton
        style={{
          display: chatInRoom ? "block" : "none",
        }}
        viewChat={viewChat}
        onClick={() => {
          setViewChat();
        }}
      >
        <svg
          style={{
            display: viewChat ? "none" : "block",
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-chat-dots-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: viewChat ? "initial" : "none" }}
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </C.ChatButton>
      <C.ContainerChat>
        {/** Chat */}
        <C.Chat viewChat={viewChat}>
          <Chat />
        </C.Chat>
      </C.ContainerChat>

      <C.Container sidebarToggle={sidebarToggle}>
        <GlobalStyle />
        {/* Area */}
        {children}
      </C.Container>
    </ThemeProvider>
  );
}
