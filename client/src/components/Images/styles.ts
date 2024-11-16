import styled from "styled-components";

export const Image = styled.div<{viewImage:boolean}>`
    display: ${props=>props.viewImage ? "initial" : "none"};
    position: relative;
    
    .image-container {
        margin: 20px 0;
        min-width: 560px;
        min-height: 320px;
        max-width: 800px;
        max-height: 560px;
    }

    .image-container:hover {
        background-color: ${props=>props.theme.colors.primary};
    }

    .image-container img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 20px;
    }

    .options--image {
        opacity: 0;
        position: absolute;
        top: 15px;
        left: 10px;
        z-index: 99;
        border-radius: 5px;
        background-color: var(--transparent-black);
        padding: 5px;
    }

    .options--image span {}
    .options--image span .bi {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        color: var(--light);
        cursor: pointer;
    }

    &:hover {
        .options--image {
            opacity: 1;
        }
    }

    @media (max-width: 600px) {
        width: 100% !important;

        .image-container {
            min-width: 100%;
            min-height: 100% !important;
            max-width: 100%;
            max-height: 200px !important;
            /* background: red !important; */
        }
    }
`

export const Container = styled.div<{fromLink:boolean, viewImageContent:boolean, view:boolean}>`
    width: ${props=>props.fromLink ? "400px" : "500px"};
    padding: 10px;
    margin: 20px 0;
    border: 2px solid ${props=>props.theme.colors.contrast};
    box-shadow: var(--shadow);
    margin-bottom: 40px;
    border-radius: 5px;
    display: ${props=>props.view ? 'inherit' : 'none'};

    .image-container img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .options {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 20px;
    }

    .options span {
        width: ${props=>props.fromLink ? "150px" : "200px"};
        text-align: center;
        background: var(--main-color);
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        color: var(--light);
        font-size: 1rem;
        font-weight: 600;
    }

    .link {
        width: 100%;
        padding: 30px 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        background: ${props=>props.theme.colors.primary};
        border-radius: 5px;
    }

    .link input {
        border: 2px solid var(--main-color);
        background-color: transparent;
        padding: 5px 10px;
        font-size: 1rem;
        color: ${props=>props.theme.colors.text};
        outline: none;
        margin-bottom: 10px;
    }

    .link button {
        border: none;
        background-color: var(--main-color);
        padding: 5px 10px;
        color: var(--light);
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }

    .upload {
        width: 100%;
        min-height: 200px;
        padding: 30px 10px;
        background: ${props=>props.theme.colors.primary};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .upload input {}

    @media (max-width: 600px) {
        width: 100% !important;
        margin-bottom: 0px;
    }
`


export const ContainerEmbedImage = styled.div`
    @media (max-width: 600px) {
        width: 100%;
        /* background-color: red;
        overflow: scroll */

        .options {
            margin-bottom: 10px;
        }
    }
`