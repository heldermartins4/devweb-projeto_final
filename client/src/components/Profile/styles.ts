import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px 0;

    margin: 0 auto;
`

export const FeaturedProfile = styled.div<{photoModal:boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-around;

    input {
        border: none;
        font-weight: bold;
        outline: none;
        background: transparent;
        font-size: 3rem;
        width: 90%;
        color: ${props=>darken(0, props.theme.colors.text)};
    }

    p {
        font-size: 1.2rem;
        margin: 5px 0;
        margin-top: 5px;
        margin-bottom: 30px;
        color: ${props=>darken(0.2, props.theme.colors.text)};
    }

    span {
        color: ${props=>darken(0.15, props.theme.colors.text)};
    }

    .profile-img {
        display: flex;
        flex-direction: column;
    }

    .profile-img span {
        position: relative;
        margin-top: -60px;
        right: -220px;
        width: 60px;
        height: 60px;
        padding: 10px;
        background: var(--main-color);
        color: var(--light);
        border-radius: 50%;
        border: 5px solid ${props=>props.theme.colors.background};
        cursor: pointer;
        transition: all ease 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile-img span:hover {}
    
    .profile-img span .bi {
        width: 50px;
        height: 50px;
    }

    .profile-img img {
        width: 300px;
        height: 300px;
        border-radius: 50%;
    }

    .modal {
        position: absolute;
        top: 300px;
        right: 10%;
        display: ${props=>props.photoModal ? 'initial' : 'none'};
    }

    .set-images {
        background: ${props=>props.theme.colors.primary};
        padding: 10px;
        font-size: 18px;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .set-images .close-modal {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
    }

    .set-images .header {}

    .set-images .content {
        margin-top: 10px;
        padding: 10px;
        background: ${props=>props.theme.colors.contrast};
        border-radius: 5px;
    }

    .set-images .content .bixos {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;

        height: 100px;
        overflow-y: scroll;
    }

    /* width */
    .bixos::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    .bixos::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    /* Handle */
    .bixos::-webkit-scrollbar-thumb {
        background: #c4c4c4; 
        border-radius: 10px;
    }

    .set-images .content .bixos img {
        width: 40px;
        height: 40px;
        cursor: pointer;
        filter: saturate(20%);
        transform: scale(0.9);
        transition: all ease 0.2s;
    }

    .set-images .content .bixos img:hover {
        filter: saturate(100%);
        transform: scale(1);
    }

    .set-images .header input {
        font-size: 1rem !important;
        width: 60%;
        color: transparent;
        padding: 10px;
        cursor: pointer;
    }

    .set-images .header input::before {
        content: "Faça um upload de uma imagem";
        color: var(--light);
        background: var(--main-color);
        border-radius: 5px;
        font-weight: bold;
        font-size: 18px;
        padding: 5px 10px;
        margin-left: 5px;
    }

    .set-images .header input::-webkit-file-upload-button {
      display: none;
    }

    @media (max-width: 980px) {
        flex-direction: column-reverse;
        
        .profile-img {
            margin-bottom: 30px;
        }

        .profile-img img {
            width: 200px;
            height: 200px;
        }

        .profile-img span {
            position: relative;
            margin-top: -60px;
            right: -140px;
            width: 60px;
            height: 60px;
            padding: 10px;
            background: var(--main-color);
            color: var(--light);
            border-radius: 50%;
            border: 5px solid ${props=>props.theme.colors.background};
        }

        .set-images {
            border-radius: 0px;
        }

        .modal {
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
        }

        .set-images .header {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .set-images .header strong {
            text-align: center;
            font-size: 1.5rem;
            margin: 5px 0;
        }

        .set-images .content .bixos {
            width: 90%;
            margin: 0 auto;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
            overflow: hidden;
            min-height: 500px;
        }

        .set-images .content .bixos img {
            width: 60px;
            height: 60px;
            filter: saturate(100%);
        }

        .set-images .header input {
            background-color: var(--main-color);
            border-radius: 10px;
            width: 100%;
        }

        .set-images .header input::before {
            padding: 5px 10px;
        }
    }

    @media (max-width: 520px) {
        .set-images .content .bixos {
            grid-template-columns: repeat(4, 1fr);
            gap: 5px;
        }
    }

    @media (max-width: 320px) {
        .set-images .content {
            overflow-y: scroll;
            max-height: 400px;
            padding: 20px 5px;
        }

        .set-images .content .bixos {
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
        }

        .set-images .header strong {
            font-size: 1.3rem;
        }

        .set-images .header input {
            width: 100%;
            display: flex;
            padding: 0;
            justify-content: center;
            align-items: center;
            background: transparent;
        }

        .set-images .header input::before {
            content: "Upload";
            width: 100%;
            background: var(--main-color);
            text-align: center;
            margin-left: 0;
            margin: 5px 0;
        }
    }
`

export const Options = styled.div`
    div {
        display: flex;
        flex-direction: column;
    }

    span {
        padding: 5px 10px;
        font-size: 1.2rem;
        cursor: pointer;
        margin: 5px 0;
        display: flex;
        align-items: center;
    }

    span .bi {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    span:last-child {
        color: ${props=>darken(0, props.theme.colors.background)};
        border-radius: 5px;
        width: 100%;
        background: #e4254f;
        color: var(--light);
    }
`

export const Logout = styled.div<{logout:boolean}>`
    display: ${props=>props.logout ? 'flex' : 'none'};
    flex-direction: column;
    padding: 20px 30px;
    background: ${props=>darken(0.02, props.theme.colors.background)};
    box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);
    border-radius: 10px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .options {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .options button:last-child {
        color: var(--light);
    }

    .options button {
        color: ${props=>props.theme.colors.text};
        padding: 5px 20px;
        border: none;
        background: transparent;
        font-size: 1rem;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
    }

    .options button p:not(:first-child) {
        display: none;
    }

    .options button:not(:first-child) {
        background: var(--main-color);
    }

    @media (max-width: 980px) {
        width: 100%;
        top: 0;
        left: 0;
        transform: translate(0, 0);
        min-height: 100vh;
        background: ${props=>darken(0, props.theme.colors.background)};

        h3 {
            font-size: 1.5rem;
        }

        .options {
            margin-top: 30px;
            flex-direction: column;
        }

        .options button {
            width: 100%;
            background: #e4254f;
            color: var(--light);
            padding: 20px 0;
            margin-top: 10px;
            font-size: 1.3rem;
        }

        .options button:not(:first-child) {
            background: transparent;
            color: ${props=>props.theme.colors.text};
        }

        .options button p:not(:first-child) { 
            display: block; 
        }

        .options button p:not(:last-child) {
            display: none;
        }
    }
`