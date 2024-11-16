import styled from 'styled-components';

export const Modal = styled.div<{modal: boolean}>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.colors.background};
    box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);
    display: ${props => props.modal ? 'inherit' : 'none'};

    width: 80%;
    border-radius: 20px;
    transition: all ease 0.5s;

    @media (max-width: 980px) {
        width: 100%;
        position: fixed;
        height: 100vh;
        z-index: 9;
        box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);
    }

    @media (max-width: 768px) {
        border-radius: 0px;
    }
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    border-radius: 20px;

    button {
        border: none;
        outline: none;
        padding: 10px 20px;
        border-radius: 5px;
        background: transparent;
        cursor: pointer;
        font-size: 18px;
            
        color: ${props => props.theme.colors.text};
    }
`

export const MobileModal = styled.div`
    @media (max-width: 980px) {
        margin-top: 32px;
    }
`

export const ContainerModal = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 18px;
`


export const Container = styled.div`
    width: 100%;

    .title--document {
        width: 100%;
        margin: 30px 0;
        border: none;
        outline: none;
        font-size: 3rem;
        text-align: center;
        background: transparent;
        color: ${props => props.theme.colors.text} !important;
        display: flex;
    }

    @media (max-width: 768px) {
        .title--document {
            font-size: 4rem;
        }
    }
`;

export const Level = styled.div``;

export const LevelsPoint = styled.div<{form: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    

    .point {
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 50%;
    } .point:not(:first-child) { margin-left: 10px; }

    .point-1 {
        background: ${props => props.form ? "#853DDD" : "#c3c3c3"};
        cursor: ${props => props.form ? "default" : "pointer"};
    }
    .point-2 {
        background: ${props => props.form ? "#c3c3c3" : "#853DDD"};
    }
`

export const Area = styled.div`
    padding: 10px 0;
    overflow-x: hidden;

    .input--email {
        width: 300px;
        border: none;
        outline: none;
        font-size: 18px;
        border-radius: 20px;
        background: ${props => props.theme.colors.contrast};
        color: ${props => props.theme.colors.text};
        padding: 5px 10px;
        margin: 10px 0;
    } .checkAdmin {
        border: none;
    }

    .email { font-size: 14px; margin: 5px; }
    .admin { font-size: 18px; }

    @media (max-width: 768px) {
        .input--email {
            width: 100%;
            border-radius: 5px;
            padding: 10px !important;
        }
    }
`;

export const SelectUsers = styled.div``;

export const ButtonClose = styled.button``

export const Error = styled.span`
    color: red;
    font-size: 14px;
    margin: 5px;
`


export const Title = styled.h1`
    font-size: 1.5rem;
    transition: all ease 0.2s;

    @media (max-width: 768px) {
        padding: 30px 0;
    }
`;

export const Footer = styled.div`
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: flex-end;

    button {
        padding: 10px 20px;
        border: none;
        background: #753BD1;
        border-radius: 20px;
        transition: all ease 0.2s;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
    } button:hover { background: #853DDD; }
`;


export const User = styled.div`
    width: 60px;
    height: 60px;
    background: #753BD1;
    border-radius: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: end;
    animation: selectUser 0.2s linear forwards;
    
    transition: all ease 0.2s;

    a {
        width: 20px;
        height: 20px; 
        font-size: 14px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        cursor: pointer;
        background-color: #f00;
        border: 2px solid ${props => props.theme.colors.background};
    }

    &:not(:first-child) {
        margin-left: 10px;
    }

    @keyframes selectUser {
        0% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.9);
        }
    }
`;

export const ListUsers = styled.div`
    width: 99999px;
    display: flex;
`;

export const Admin = styled.div<{
    admin:boolean
}>`
    display: flex;
    align-items: center;
    margin: 20px 0;

    .checkAdmin {
        cursor: pointer;
        appearance: none; -webkit-appearance: none;
    }

    .checkAdmin::before {
        content: '✓';
        color: ${props=>props.admin ? 'var(--light)' : props.theme.colors.contrast};
        border-radius: 5px;
        background: ${props=>props.admin ? 'var(--main-color)' : props.theme.colors.contrast};
        font-weight: bolder;
        font-size: 1rem;
        padding: 5px 10px;
        margin-right: 10px;
    }
`;
