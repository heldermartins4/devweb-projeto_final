import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`;


export const Header = styled.div<{trash:boolean, activeSearch:boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search {
        width: ${props=>props.activeSearch ? '30px' : '100%'};
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: center;
        font-size: 1rem;
        padding: 5px 20px;
        border-radius: 5px;
        background: ${props=>darken(0.01, props.theme.colors.primary)};
        color: ${props=>darken(0.2, props.theme.colors.text)};
        transition: all ease 0.3s;
        margin-right: ${props=>props.activeSearch ? '10px' : '5px'};
    }

    .search span {
        cursor: pointer;
    }

    .search input {
        margin-left: ${props=>props.activeSearch ? '0' : '20px'};
        color: ${props=>darken(0.2, props.theme.colors.text)};
        width: ${props=>props.activeSearch ? '30px' : '500px'};
        background: transparent;
        border: none;
        font-size: 1.3rem;
        outline: none;
        display: ${props=>props.activeSearch ? 'none' : 'initial'};
    }

    .options-workspace {
        display: flex;
        flex-direction: row;
    }

    .options-workspace .trash {
        background: ${props=>darken(0, props.theme.colors.primary)};
        padding: 5px 10px;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
    }

    .options-workspace .trash:hover {
        background: ${props=>darken(0.1, props.theme.colors.primary)};
    }
    
    .options-workspace .trash {
        display: flex;
        align-items: center;
    }

    .options-workspace .trash .bi {
        width: 20px;
        height: 20px;
    }

    .options-workspace .trash p {
        font-size: 1rem;
        margin-left: 5px;
        display: ${props=>props.activeSearch ? 'initial' : 'none'};
    }

    .trash-modal {
        display: ${props=>props.trash ? 'flex' : 'none'};
        flex-direction: column;

        width: 400px;
        background: ${props=>props.theme.colors.background};
        box-shadow: 0px 6px 36px -6px rgb(0 0 0 / 0.3);
        border-radius: 5px;
        padding: 20px;
        font-size: 1.4rem;
        font-weight: 600;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        transition: all ease 0.2s;
    }

    .trash-modal div span {
        float: right;
        margin-top: 20px;
        transition: all ease 0.2s;
    }

    .trash-modal div span button {
        border: none;
        outline: none;
        margin-left: 10px;
        padding: 10px 20px;
        background: var(--dark);
        color: var(--light);
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition: all ease 0.2s;
    }

    .trash-modal div span button:not(:last-child) {
        background: var(--red);
        color: var(--light);
    }

    @media (max-width: 980px) {
        .trash-modal {
            width: 100%;
            min-height: 100vh;
            place-items: center;
            padding: 30px 0;
            top: 0;
            left: 0;
            transform: translate(0, 0);
            box-shadow: none;
        }

        .trash-modal div span {
            width: 500px;
            display: flex;
            flex-direction: column;
            float: right;
        }

        .trash-modal div span button {
            margin: 10px 0;
        }

        .options-workspace .trash p {
            display: initial;
        }

        .search {
            width: ${props=>props.activeSearch ? '30px' : '400px'};
            margin-left: ${props=>props.activeSearch ? '0px' : '20px'};
            padding: 0 5px;
        }

        .search input {
            margin-left: ${props=>props.activeSearch ? '0' : '0'};
            display: initial !important;
            width: ${props=>props.activeSearch ? '90% !important' : '90% !important'};
            padding: 5px 10px;
        }
    }

    @media (max-width: 890px) {
        flex-direction: column;
        align-items: flex-start;

        .options-workspace {
            flex-direction: column;
        }

        .search {
            width: 400px;
            margin: 10px 0;
        }
    }

    @media (max-width: 720px) {
        .options-workspace {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            width: 100%;
        }

        .search {
                width: 100%;
                margin: 10px 0;
                margin-left: ${props=>props.activeSearch ? '0px' : '0px'};
        }

        .search input {
            margin-left: ${props=>props.activeSearch ? '0px' : '0px'};
            display: initial !important;
            padding: 10px 20px;
            width: ${props=>props.activeSearch ? '90% !important' : '90% !important'};
        }

        .trash-modal div span {
            width: 300px !important;
        }

        .options-workspace .trash {
            padding: 20px 10px;
            background: var(--red);
            color: var(--light);
        }

        .options-workspace .trash p {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 500px) {
        .search {
            width: ${props=>props.activeSearch ? '100%' : '100%'};
        }

        .search input {
            width: ${props=>props.activeSearch ? '90% !important' : '90% !important'};
            padding: 5px 10px;
        }
    }
`;

export const Title = styled.h1`
@media (max-width: 500px) {
    margin-bottom: 20px;
}
`;

export const Button = styled.button`
    position: absolute;
    bottom: 32px;
    right: 32px;
    z-index: 9;
    width: 60px;
    height: 60px;
    background: var(--contrast);
    padding: 20px;
    color: #fff;
    border-radius: 50%;
    font-size: 20px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all ease 0.2s;

    &:hover {
        background: var(--main-color);
    }
`;

export const Area = styled.div`
    overflow-y: scroll;
    margin-top: 10px;
    height: 70vh;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4;
    }

    @media (max-width: 980px) {
        /* Track */
        ::-webkit-scrollbar-track {
            background: ${props=>props.theme.colors.background};
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${props=>props.theme.colors.background};
        }
    }
`;

export const Room = styled.div<{
    optionTrash:boolean
}>`
    border-radius: 10px;
    margin: 10px 10px;
    padding: 10px 0;

    .header-room {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
    }

    .header-room input {
        cursor: pointer;
    }

    .header-room input[type='checkbox'] {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid var(--contrast);
        background: transparent;
        
        appearance: none; -webkit-appearance: none;
        cursor: pointer;
    }

    .header-room input[type='checkbox']:checked {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid var(--contrast);
        background: ${props=>props.optionTrash ? "var(--main-color)" : 'transparent'};
        
        appearance: none; -webkit-appearance: none;
        cursor: pointer;
    }

    .body-room {
        cursor: pointer;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .body-room h3 {
        margin-top: 10px;
        font-size: 1.2rem;
        padding: 10px;
    }

    @media (max-width: 980px) {
        &:not(:first-child) {
            margin: 10px;
        }
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.colors.primary};
    box-shadow: 0px 6px 37px -6px rgba(0,0,0,0.3);

    width: 80%;
    border-radius: 20px;
    transition: all ease 0.5s;

    @media (max-width: 768px) {    
        width: 100%;
        min-height: 100vh;
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

export const ContainerModal = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 18px;
    
`

export const ContainerArea = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    transition: all ease 0.3s;
    
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #414141;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4;
    }


    @media (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 720px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
