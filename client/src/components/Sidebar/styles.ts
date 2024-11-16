import styled from 'styled-components';

export const SidebarContainer = styled.div<{menu: boolean, sidebarToggle: boolean}>`
    .flex {
        width: 100%;
        min-height: 80vh;
        padding: ${props=>props.sidebarToggle ? '5px 10px' : '0px'};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .separator {
        width: 100%;
        height: 2px;
        margin: 10px 0;
        background: ${props=>props.theme.colors.contrast};
        transition: all ease 0.1s;
    }

    .flex .menu-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 5px;
        justify-content: ${props=>props.sidebarToggle ? 'initial' : 'center'};
    }

    .menu-item:not(:first-child):hover {
        background-color: #995CFA;
        /*
        box-shadow: 0 0 5px #995CFA,
                    0 0 20px rgb(153 92 250 / 0.8),
                    0 0 35px rgb(153 92 250 / 0.7),
                    0 0 50px rgb(153 92 250 / 0.6);
        */
        box-shadow: ${props=>props.theme.colors.shadowItensMenu};
        border-color: #fff;
        color: #fff;
    }

    .icon-container {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-container img {
        border-radius: 50%;
    }

    .bi {
        width: 20px;
        height: 20px;
    }

    .menu-item p {
        display: ${props=>props.sidebarToggle ? 'initial' : 'none'};
        margin-left: 10px;
        padding: 0px 10px;
    }

    .flex .menu-item img {
        width: 60px;
        height: 60px;
    }

    .logo {
        width: ${props=>props.sidebarToggle ? '40px' : '60px'};
        height: ${props=>props.sidebarToggle ? '40px' : '60px'};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }

    .logo-item {
        margin-bottom: 20px;
    }

    .logo-item p {
        font-weight: 900;
        font-size: 1.5rem;
        margin-left: ${props=>props.sidebarToggle ? '10px' : '0px'};
    }

    .profile img {
        width: 30px !important;
        height: 30px !important;
    }

    .logout img {
        width: 40px !important;
        height: 40px !important;
    }

    .bi-sun,
    .bi-moon {
        animation: iconTheme 0.1s linear forwards;
    }

    .resize-menu {
        background: var(--main-color);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all ease 0.2s;

        position: absolute;
        top: ${props=>props.sidebarToggle ? '40px' : '40px'};
        right: ${props=>props.sidebarToggle ? '-10px' : '-20px'};
    }

    .bi-chevron-double-left,
    .bi-chevron-double-right {
        color: var(--light);
        width: 16px;
        height: 16px;
    }

    @keyframes iconTheme {
        0% {
            transform: scale(0.6) rotate(180deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
        }
    }

    @media (max-width: 1150px) {
        .menu-item p {
            display: none !important;
        }

        .logo {
            width: 40px !important;
            height: 40px !important;
        }

        .logo-item p {
            margin-left: 0 !important;
        }

        .resize-menu {
            display: none !important;
        }

        .flex .menu-item {
            justify-content: center;
        }
    }

    @media (max-width: 980px) {
        width: 80%;
        position: absolute;
        top: 50%;
        left: ${props => (props.menu ? '50%' : '-100%')};
        transform: translate(-50%, ${props => (props.menu ? '-50%' : '0')});
        z-index: 999;

        .resize-menu {
            display: none;
        }

        .menu-item p {
            display: initial !important;
        }

        .flex .menu-item {
            justify-content: initial !important;
        }

        .logo {
            width: 50px !important;
            height: 50px !important;
        }

        .logo-item p {
            margin-left: 10px !important;
        }
    }
`;

export const SidebarToggleMenu = styled.div<{menu: boolean}>`
    width: 100%;

    .toggle-menu {
        display: none;
    }

    @media (max-width: 980px) {
        .toggle-menu {
            display: ${props=>props.menu ? "flex" : "block"};
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 5;
            cursor: pointer;
    
            width: ${props=>props.menu ? "30px" : "40px"};
            height: 20px;
            position: fixed;
            top: 20px;
            left: 20px;
            font-size: 2rem;
        }
    }
`;

export const Sidebar = styled.nav<{sidebarToggle:boolean, menu:boolean}>`
    background: ${props=>props.theme.colors.background};

    position: fixed;
    height: 90vh;
    z-index: 9;
    top: 50%;
    left: ${props=>props.sidebarToggle ? '32px' : '20px'};  
    transform: translateY(-50%);
    padding: 30px 10px;
    border-radius: 20px;
    font-size: 18px;
    box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);
    transition: all ease 0.4s;

    

    @media (max-width: 980px) {
        left: -200px; /* menu responsivo */
        background: ${props=>props.theme.colors.primary};
        
        transform: translate(${props=>props.menu ? "0" : "-100%"}, -50%); 
        span:first-child {
            display: ${props=>props.menu ? "none" : "inherit"};
        }
    }

    @media (max-width: 980px) {
        width: 100%;
        min-height: 100vh;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 50%;
        border-radius: 0;
        transition: 0;
    }
`;

export const Logout = styled.div<{logout: boolean}>`
    width: 400px;
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props=>props.logout ? "initial" : "none"};
    background: ${props=>props.theme.colors.background};
    padding: 20px 0;
    border-radius: 20px;
    font-size: 18px;
    text-align: center;
    
    box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);

    label {
        color: ${props=>props.theme.colors.text};
    }

    .button-flex {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
    } .button-flex button {
        background: #995CFA;
        border: none;
        padding: 10px 40px;
        color: #fff;
        border-radius: 20px;
        cursor: pointer;
        transition: all ease 0.2s;
    } .button-flex button:hover { background: #7A27FF; }

    @media (max-width: 768px) {
        width: 500px;
        .button-flex { margin-top: 20px; }
        label { font-size: 20px; }
        .button-flex button {
            font-size: 20px;
            padding: 10px 40px;
        }
    }
    
    @media (max-width: 500px) { width: 400px; }
    @media (max-width: 400px) { 
        width: 300px; 
        font-size: 14px;
    }
`;