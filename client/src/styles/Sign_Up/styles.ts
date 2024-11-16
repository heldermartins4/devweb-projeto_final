import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
`

export const GridLayout = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    transition: all ease 0.3s;

    @media (max-width: 720px) {
        display: flex;
    }
`
export const Col = styled.div`
    width: 100%;
    height: 100vh;
    flex: 1;

    .image img {
        width: 100%;
        height: 100%;
        background: #753BD1;
        transition: all ease 0.3s;
    }

    .flex {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease 0.3s;
    }

    @media (max-width: 720px) {
        background: #753BD1;

        .image {
            display: none;
        }

        .flex {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`

export const Form = styled.div`
    width: 500px;
    background: #fff;
    display: block;
    padding: 30px;
    transition: all ease 0.3s;

    @media (max-width: 720px) {
        width: 90%;
    }
`

export const FormContainer = styled.div`    
    display: flex;
    flex-direction: column;
    padding: 10px 0;

    input {
        border: none;
        border-bottom: 2px solid #853DDD;
        padding: 10px 5px;
        outline: none;
        font-size: 18px;
    }

    input:not(:first-child) {
        margin-top: 5px;
    }

    button {    
        background: #853DDD;
        color: #fff;
        font-size: 18px;
        border: none;
        padding: 10px 0;
        cursor: pointer;
        opacity: 1;
        transition: all ease 0.3s;
    } 

    button:hover {
        opacity: 0.8;
    }

    p {
        text-align: center;
        color: #000;
        margin-top: 10px;
    } a {color: #853DDD;}

    .showPassword {
        width: 100%;
        margin: 5px 0;
        padding: 10px 0;
        display: flex;
        align-items: center;

        input {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
`


export const validateForm = styled.div<{animateError: boolean}>`
    padding: 10px 0;
    margin: 10px 0;
    background: #FFD6E1;
    font-size: 18px;
    color: #FF2863;
    border: 1px solid #FF2863;
    text-align: center;
    transition: all ease 0.2s;
    animation: ${props=>props.animateError ? "error 0.5s forwards" : "persistedError 0.5s forwards"};

    @keyframes error {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.6;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }


    @keyframes persistedError {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.6;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`

