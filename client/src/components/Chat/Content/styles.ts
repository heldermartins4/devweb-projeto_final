import { darken } from "polished";
import styled from "styled-components";

export const ContainerChat = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 10px 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ContainerMessages = styled.div`
    height: 80vh;

    display: flex;
    align-items: flex-end;
`

export const Chat = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4; 
        border-radius: 10px;
    }

    @media (max-width: 980px) {
        /* Track */
        ::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${props=>props.theme.colors.primary};
        }
    }
`

export const Message = styled.div`
    color: var(--light);
    text-align: right;
    float: right;

    .message {
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }

    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 20px;
    } img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .container-message {
        width: 300px;
        padding: 10px 20px;
        border-radius: 20px 0 20px 20px;
        background: linear-gradient(45deg, #7B0CDE, #9F33FF);
    }

    .username {
        font-weight: bold;
    }

    .content {
        padding: 10px 0;
        word-wrap: break-word;
        text-align: left;
        font-size: 1.05rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 980px) {
        flex-direction: column;
        
        width: 500px; /* largura minima para não dar b.o!!! */

        .container-message {
            width: 500px;
        }

        .user {
            width: 30px;
            height: 30px;
        }

        .message {
            justify-content: flex-start;
        }
    }

    @media (max-width: 980px) {
        width: 100%;
        
        .user {
            display: none;
        }
    }

    @media (max-width: 560px) {
        flex-direction: column;
        
        width: 300px; /* largura minima para não dar b.o!!! */

        .container-message {
            width: 300px;
        }

        .user {
            width: 30px;
            height: 30px;
        }

        .message {
            justify-content: flex-start;
        }
    }

    @media (max-width: 320px) {
        max-width: 200px;
    }
`

export const ListMessages = styled.div`
    color: var(--light);
    float: left;


    .message {
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }

    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    } img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .container-message {
        width: 300px;
        padding: 10px 20px;
        border-radius: 0 20px 20px 20px;
        background: var(--transparent-black);
    }

    .username {
        font-weight: bold;
    }

    .content {
        padding: 10px 0;
        word-wrap: break-word;
        text-align: left;
        font-size: 1.05rem;
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 980px) {
        flex-direction: column;
        
        width: 500px; /* largura minima para não dar b.o!!! */

        .container-message {
            width: 500px;
            margin-left: 10px;
        }

        .user {
            width: 30px;
            height: 30px;
        }

        .message {
            justify-content: flex-start;
        }
    }

    @media (max-width: 560px) {
        flex-direction: column;
        
        width: 300px; /* largura minima para não dar b.o!!! */

        .container-message {
            width: 300px;
            margin-left: 10px;
        }

        .user {
            width: 30px;
            height: 30px;
        }

        .message {
            justify-content: flex-start;
        }
    }

    @media (max-width: 980px) {
        width: 100%;
        
        .user {
            width: 30px;
            height: 30px;
            margin-right: 0;
        }
    }
`

export const Communicate = styled.div`
    width: 100%;

    .container {
        width: 100%;
        
    }

    .container-communicates {
        min-height: 85vh;
        max-height: 85vh;
        padding: 0 10px;
        overflow-y: scroll;
    }

    /* width */
    .container-communicates::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    .container-communicates::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    /* Handle */
    .container-communicates::-webkit-scrollbar-thumb {
        background: #c4c4c4; 
        border-radius: 10px;
    }

    .item .options {
        display: flex;
        justify-content: flex-end;
        opacity: 0;
        transition: all ease-in 0.2s;
    }

    .item:hover {
        .options {
            opacity: 1;
        }
    }

    .item .options div .bi:not(:first-child) {
        margin-left: 10px;
    }

    .item .options div .bi {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .form-communicate {
        width: 100%;
    }

    .item {
        background: ${props=>props.theme.colors.primary};
        margin: 10px 0;
        padding: 20px 10px;
        border-radius: 10px;
    }

    .item-header {
        justify-content: inherit !important;
    }

    .item-header img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .item .flex {
        margin-top: 10px;
        justify-content: space-between;
    }

    .item .flex .bi {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        cursor: pointer;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .content-item {
        font-size: 1rem;
        line-height: 134%;
        transition: all ease 0.2s;
    }

    .content h3 {
        margin-bottom: 10px;
        font-size: 1rem;
        font-weight: 600;
    }

    .content input {
        background: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-size: 1rem;
        font-weight: 600;
        background: ${props=>darken(0.1, props.theme.colors.primary)};
        color: ${props=>props.theme.colors.text};
        border-radius: 5px;
        padding: 5px 10px;
    }

    .content-item textarea {
        background: ${props=>darken(0.1, props.theme.colors.primary)};
        color: ${props=>props.theme.colors.text};
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        outline: none;
        resize: vertical;
        margin: 10px 0;

        width: 100%;
        min-height: 100px;
    }

    .form-communicate {
        width: 60px;
        position: absolute;
        bottom: 30px;
        right: 32px;
    }

    .form-communicate button {
        border: none;
        outline: none;
        background: var(--main-color);
        color: var(--light);
        border-radius: 5px;
        padding: 10px;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: btnScroll 1s forwards;
    }

    .form-communicate button .bi {
        width: 30px;
        height: 30px;
    }

    @keyframes btnScroll {
        0% {
            transform: translateY(20px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`

export const CreateCommunicate = styled.div`
    display: flex;
    flex-direction: column;

    background: ${props=>props.theme.colors.transparent};
    padding: 10px;
    border-radius: 10px;

    input {
        width: 100%;
        background: transparent;
        font-size: 2rem;
        border: 1px solid var(--main-color);
        border-radius: 10px;
        outline: none;
        text-align: center;
        word-wrap: break-word;
        padding: 5px 0;
    }

    textarea {
        margin-top: 10px;
        resize: none;
        width: 100%;
        background: transparent;
        border: 1px solid var(--main-color);
        border-radius: 10px;
        padding: 10px;
    }
`