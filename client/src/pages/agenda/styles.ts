import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 80vh;
    overflow-y: scroll;
    padding: 0 10px;
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
    @media (max-width: 720px) {
        height: 100%;
        overflow-y: visible;
    }
`

export const Modal = styled.div`
    background: ${props=>props.theme.colors.background};
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    .header {
        width: 100%;
    }
    .header button {
        border: none;
        outline: none;
        color: ${props=>props.theme.colors.text};
        float: right;
        background-color: transparent;
        cursor: pointer;
    }
    h2 {
        margin-bottom: 10px;
    }
    .title {
        background: ${props=>props.theme.colors.primary};
        padding: 5px 10px;
        font-size: 1.5rem;
        color: ${props=>props.theme.colors.text};
        outline: none;
        border: none;
    }
    .desc {
        background: ${props=>props.theme.colors.primary};
        color: ${props=>props.theme.colors.text};
        border: none;
        outline: none;
        margin: 10px 0;
        padding: 5px 10px;
        font-size: 1rem;
        resize: none;
        min-height: 200px;
    }
    .date {
        border: none;
        border-radius: 5px;
        padding: 10px;
        background-color: ${props=>props.theme.colors.primary};
        color: ${props=>props.theme.colors.text};
    }
    .date::before {
        content: 'Selecione:';
        margin-right: 10px;
    }

    .deadline {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
    }

    .timeline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }

    .timeline input {
        width: 45%;
        font-size: 1rem;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        outline: none;
        background: ${props=>props.theme.colors.primary};
        color: ${props=>props.theme.colors.text};
    }

    .timeline input::-webkit-calendar-picker-indicator {
        filter: ${props=>props.theme.colors.iconsInput};
    }

    .options--event {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .options--event .btn {
        width: 100%;
    }
    
    .options--event .drop {
        border: 2px solid var(--red);
        color: var(--red);
        outline: none;
        background: transparent;
        border-radius: 5px;
        padding: 10px 20px;
        margin-right: 10px;
    }
    
    .options--event .drop svg {
        width: 20px;
        height: 20px;
    }

    .options--event .check {
        border: 2px solid var(--green);
        color: var(--green);
        outline: none;
        background: transparent;
        border-radius: 5px;
        padding: 10px 20px;
    }
    
    .options--event .check svg {
        width: 20px;
        height: 20px;
    }

    .options--event .drop ,
    .options--event .check {
        cursor: pointer;
        transition: all ease 0.2s;
    }

    .options--event .drop:hover {
        background: var(--red);
        color: var(--light);
    }
    .options--event .check:hover {
        background: var(--green);
        color: var(--light);
    }

    .btn {
        outline: none;
        background-color: var(--main-color);
        border: 2px solid var(--main-color);
        color: var(--light);
        margin-right: 10px;
        padding: 10px 0;
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: all ease 0.2s;
    }
    .btn:hover {
        background: ${shade(0.1, `#9e7bf6`)};
    }
    @media (max-width: 720px) {
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        transform: translate(0,0);
        box-shadow: none;
    }
`