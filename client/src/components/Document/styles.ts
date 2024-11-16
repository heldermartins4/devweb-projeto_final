import styled from 'styled-components';


export const ContainerDocument = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 80vh;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #414141;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4;
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

export const HeaderDocument = styled.div<{addMember:boolean}>`
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    font-size: 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        align-items: center;
    }

    .title input {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 3rem;
        font-weight: 700;
        color: ${props => props.theme.colors.text};
        margin-bottom: 10px;
        width: 100%;
    }

    .members img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .members img:not(:first-child) {
        margin-left: -10px;
    }

    .members {
        cursor: pointer;
    }
    
    @media (max-width: 980px) {
        width: 100%;

        .form .invite input {
            margin: 10px 0;
            width: 100%;
            height: 100%;
            font-size: 2.5rem;
        }

        .members {
            position: absolute;
            top: 0;
            right: 32px;
        }

        .form, .invite {
            width: 100%;
        }

        .options-room {
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100vh;
            transform: translate(0);
            border-radius: 0;
            background: ${props=>props.theme.colors.background};
        }

        .add-member {
            width: 90%;
        }

        .title {
            width: 100%;
        }

        .title input {
            background-color: transparent;
            width: 90%;
            margin: 0 auto;
            border: none;
            outline: none;
            font-size: 3rem;
            color: ${props => props.theme.colors.text};
        }
    }

    @media (max-width: 520px) {
        width: 100%;

        .title input {
            font-size: 2.3rem;
        }

        .options-room {
            background: tomato;
        }

        .options-room .add-member h2 {
            width: 90% !important;
        }

        .form {
            width: 90%;
        }

        .form .invite input {
            width: 100%;
            padding: 10px !important;
            border: none !important;
            outline: none !important;
        }

        .form .invite button {
            width: 100%;
            margin-top: 10px;
            padding: 10px !important;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .form .invite {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .add-member .options-users .container {
            width: 90%;
        }
    }
`;

export const AddMembers = styled.div<{addMember:boolean}>`
    /* Modal para adicionar membros */

    .options-room {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 99;

        display: ${props=>props.addMember ? "flex" : "none"};
        justify-content: flex-start;
        flex-direction: column;
        padding: 10px 20px;
        border-radius: 10px;
        background: ${props=>props.theme.colors.primary};
        box-shadow: 0px 3px 18px -3px rgba(0,0,0,0.3);
    }

    .options-room .header {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .options-room .header button {
        background: transparent;
        border: none;
        outline: none;
        color: ${props=>props.theme.colors.text};
    }

    .options-room .header button .bi {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .options-room h1 {
        width: 100%;
        font-size: 2rem;
    }

    .add-member .options-users h2 {
        font-size: 1.2rem;
    }

    .add-member {
        display: flex;
        flex-direction: column;
    }

    .add-member h2 {
        width: 100%;
        margin-bottom: 10px;
        font-size: 1.5rem;
    }
    .add-member .options-users .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 200px;
        padding-right: 5px;
    }

    /* width */
    .add-member .options-users .container::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    .add-member .options-users .container::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    .add-member .options-users .container::-webkit-scrollbar-thumb {
        background: ${props=>props.theme.colors.text};
    }

    .add-member .options-users {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
    }

    .add-member .options-users .user {
        background: ${props=>props.theme.colors.contrast};;
        padding: 5px 10px;
        width: 100%;
        border-radius: 5px;
        font-size: 1.2rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .add-member .options-users .user:not(:first-child) {
        margin-top: 5px;
    }

    .add-member .options-users .user .info img {
        width: 40px;
        height: 40px;
    }

    .add-member .options-users .user .info span {
        margin-left: 10px;
    }
    
    .add-member .options-users .user .options {}

    .add-member .options-users .user .options select {
        background: ${props=>props.theme.colors.primary};;
        border: none;
        outline: none;
        padding: 5px;
        border-radius: 5px;
        color: ${props=>props.theme.colors.text};
    }
    
    .add-member .options-users .user .options .bi {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .add-member .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .add-member .form label {
        width: 95%;
        margin-top: 5px;
        margin-left: -10px;
        font-size: 1rem;
    }

    .add-member .form .invite {
        display: flex;
        justify-content: space-between;
    }

    .add-member .form .invite button {
        margin-left: 5px;
        border: none;
        background: var(--main-color);
        padding: 10px;
        border-radius: 5px;
        color: var(--light);
        cursor: pointer;
    }

    .add-member .form .invite button:hover {
        background-color: var(--contrast);
    }

    .add-member .form .invite input {
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 1.2rem;
        margin: 0 !important;
        background: ${props=>props.theme.colors.contrast};
    }

    @media (max-width: 980px) {
        width: 100%;

        .form .invite input {
            margin: 10px 0;
            width: 100%;
            height: 100%;
            font-size: 2.5rem;
        }

        .form, .invite {
            width: 100%;
        }

        .options-room {
            top: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            height: 100vh;
            transform: translate(0);
            border-radius: 0;
            background: ${props=>props.theme.colors.background};
        }

        .add-member {
            width: 90%;
        }
    }

    @media (max-width: 520px) {
        width: 100%;

        .options-room {
            background: tomato;
        }

        .options-room .add-member h2 {
            width: 90% !important;
        }

        .form {
            width: 90%;
        }

        .form .invite input {
            width: 100%;
            padding: 10px !important;
            border: none !important;
            outline: none !important;
        }

        .form .invite button {
            width: 100%;
            margin-top: 10px;
            padding: 10px !important;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .form .invite {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
        }

        .add-member .options-users .container {
            width: 90%;
        }
    }

    /* Modal para adicionar membros */
`

export const Update = styled.p`
    font-size: 18px;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 720px) {
        font-size: 1rem;
    }
`

export const Tags = styled.div`    
    padding: 20px 0;
`

export const Area = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;

    .loading {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border-radius: 50%;
        border-left: 3px solid tomato;
        animation: loading 1s linear infinite;
    }

    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export const listMembers = styled.div`
    width: 80%;
    position: absolute;
    top: 120px;
    border-radius: 5px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    background: ${props=>props.theme.colors.background};
    max-height: 300px;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #414141;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4;
    }

    span {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        background-color: ${props=>props.theme.colors.primary};
        padding: 5px 10px;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
    }

    span:hover {
        background-color: ${props=>props.theme.colors.contrast};
    }

    span:not(:first-child) {
        margin-top: 10px;
    }

    span img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }

    @media (max-width: 980px) {
        width: 100%;
        position: absolute;
        top: 120px;
        left: 0;

        span {
            width: 90%;
            margin: 0 auto;
        }
    }
`

export const NewComponent = styled.div<{tool:boolean}>`
    width: 90%;
    margin: 20px 5%;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    text-align: left;
    cursor: pointer;

    background: var(--main-color);
    color: #fff;
    box-shadow: 0px 3px 18px -3px rgba(0,0,0,0.3);

    @media (max-width: 980px) {
    }
`

export const ToolsToDocRooms = styled.div<{tool:boolean}>`
    display: ${props=>props.tool ? "flex" : "none"};
    animation: ${props=>props.tool ? "tools 1.5s forwards" : "none"};
    position: relative;
    top: 30px;
    background: var(--transparent-black);
    padding: 10px 30px;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 5px );
    -webkit-backdrop-filter: blur( 5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    @keyframes tools {
        0% {
            transform: translateY(0%);
        }
        50% {
            transform: translateY(-30%);
        }
        100% {
            transform: translateY(-10%);
        }
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.2s;
    }

    div span {
        font-size: 1rem;
        padding: 2px 0;
        transition: all ease-in-out 0.2s;
    }

    div:not(:first-child) {
        margin-left: 20px;
    }

    .bi {
        width: 30px;
        height: 30px;
        margin-bottom: 5px;
        transition: all ease-in-out 0.2s;
    }

    div:hover{
        transform: scale(1.5);
    }

    @media (max-width: 980px) {
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 0;
        background: transparent;
        border: none;
        backdrop-filter: blur( 0px );
        -webkit-backdrop-filter: blur( 0px );
        box-shadow: none;
        animation: none;
        top: 10px;
        left: 0;

        div {
            width: 100%;
            margin: 5px 0;
            justify-content: flex-start;
        }

        div:not(:first-child) {
            margin-left: 0;
        }

        div {
            display: flex !important;
            flex-direction: row;
        }

        div:hover{
            transform: scale(1);
        }

        div span:nth-child(2) {
            margin-left: 10px;
        }
    }
`

export const SelectMembersContainer = styled.div<{selectMembers:boolean}>`
    position: absolute;
    width: 400px;
    background: rgba(0,0,0,0.3);
    padding: 5px;
    border-radius: 5px;
    z-index: 99;

    display: ${props=>props.selectMembers ? "flex" : "none"};
    flex-direction: column;
`
export const ListMembers = styled.span`
    padding: 10px 5px;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all 0.2;
    cursor: pointer;

    .img {
        border-radius: 50%;
        padding: 5px;
        border: 2px solid #995CFA;

        display: flex;
        justify-content: center;
        align-items: center;
    } img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    p {
        margin-left: 10px;
        font-size: 20px;
    }

    &:hover {
        background: ${props => props.theme.colors.contrast};
    }

    &:not(:first-child) {
        margin-top: 5px;
    }
    
`