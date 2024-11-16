import styled from "styled-components";

const background = "/assets/Icons-Cubs/background-attch.jpg"

export const Content = styled.div`
    width: 100%;

    footer {
        width: 100%;
        padding-top: 30px;
        padding-bottom: 20px;
    }

    footer .content {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    footer .content .contacts {
        display: flex;
        align-items: center;
        color: var(--dark);
    }

    footer .content .contacts .bi {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        cursor: pointer;
        color: var(--dark);
    }

    @media (max-width: 980px) {
        footer .content {
            flex-direction: column-reverse;
        }   

        footer .content .contacts {
            margin: 10px 0;
        }
    }
`

export const ContentFeatured = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content-featured {
        width: 80%;
        margin: 0 auto;
        color: var(--light);
    }

    .content-featured .c-1 span {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 200px;
        font-size: 1.2rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 600;
        background: var(--light);
        color: var(--dark);
        border-radius: 50px;
        padding: 5px;
        margin: 10px 0;
    }

    .content-featured .c-1 span img {
        width: 40px;
        height: 40px;
        margin-left: -20px;
    }

    .content-featured .c-1 h1 {
        font-size: 2.5rem;
    }

    .content-featured .c-1 .options {
        text-align: center;
        color: var(--light);
        font-weight: 600;
        font-size: 1.2rem;
    }

    .content-featured .c-1 .options a {
        text-decoration: none;
        font-weight: 800;
        color: var(--light);
    }

    .content-featured .c-1 .options button {
        border: none;
        width: 100%;
        border-radius: 50px;
        padding: 20px 0;
        background: var(--light);
        color: var(--main-color);
        font-weight: 600;
        font-size: 1.2rem;
        letter-spacing: .1rem;
        margin: 10px 0;
        cursor: pointer;
    }

    /** Coluna 2 */
    .content-featured .c-2 {
        width: 500px;
    }

    .content-featured .c-2 .item {
        float: right;
    }

    .content-featured .c-2 .item img {
        width: 300px;
        height: 300px;
    }


    @media (max-width: 980px) {
        .flex {
            flex-direction: column;
        }
        .content-featured .c-2 .item {
            display: none;
        }
        .content-featured .c-1 h1 {
            font-size: 2rem;
            margin: 20px 0;
        }

        .content-featured .c-1 span {
            width: 120px;
            padding: 5px 10px;
            padding-right: 20px;
        }

        .content-featured .c-1 span img {
            margin-left: 0;
        }
    }
`

export const Popover = styled.div`
    width: 40px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--main-color);
    color: var(--light);
    font-size: 1rem;
    padding: 10px;
    border-radius: 50%;


    @media (max-width: 980px) {}
`

export const SessionsContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: -30px;

    .flex {
        display: flex;
    }

    .container-multplatform {
        align-items: center;
        justify-content: space-between;
    }

    .container-multplatform h1 {
        font-weight: 800;
        color: var(--dark);
    }

    .container-multplatform img {
        width: 70%;
        margin-right: -100px;
    }


    @media (max-width: 980px) {
        .flex {
            flex-direction: column;
        }

        .container-multplatform {
            padding: 30px 0;
            font-size: .9rem;
        }

        .container-multplatform img {
            margin: 0;

            width: 100%;
        }
    }
`

export const SessionCards = styled.div`
    display: flex;
    justify-content: space-between;

    .card {
        box-shadow: var(--shadow);
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 30%;
    }

    .card span {
        padding: 5px 10px;
        font-size: 1rem;
        font-weight: 600;
    }

    .card span b {
        color: var(--main-color);
        font-weight: 800;
    }

    .card img {
        width: 100%;
        border-radius: 0 0 10px 10px;
        padding: 30px;
    }

    @media (max-width: 980px) {
        flex-direction: column;
        justify-content: center;

        .card {
            width: 100%;
            place-items: center;
            margin: 10px 0;
        }

        .card img {
            width: 50%;
        }
    }
`

export const ContainerFeatures = styled.div`
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--dark);
        margin: 30px 0;
    }

    .content div {
        width: 50%;
    }

    .content div h1 {
        margin-bottom: 10px;
        font-size: 1.5rem;
    }

    .content iframe {
        border-radius: 10px;
        width: 50%;
        height: 270px;
        box-shadow: var(--shadow);
    }

    .kanban-container {
        flex-direction: row-reverse;
    }
    .calendar-container {
        flex-direction: row;
    }
    .chat-container {
        flex-direction: row-reverse;
    }

    .kanban-container div,
    .chat-container div {
        margin-left: 30px;
    }


    @media (max-width: 980px) {
        .content {
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .content div {
            width: 100% !important;
        }

        .content iframe {
            width: 100%;
            margin-top: 20px;
        }

        .kanban-container div,
        .chat-container div {
            margin-left: 0 !important;
        }
    }
`
