import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 90%;
    margin 0 auto;
`;

export const AddTag = styled.div`
    input {
        width: 400px;
        padding: 5px 10px;
        border: none;
        font-size: 18px;
        outline: none;
        background: transparent;
        border-left: 2px solid var(--main-color);
        color: ${props=>props.theme.colors.text};
    }

    @media (max-width: 720px) {
        width: 30%;
    }
`;

export const Tag = styled.button<{tags:boolean}>`
    width: 20%;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    text-align: right;
    background: var(--main-color);
    color: var(--light);
    cursor: pointer;
    transition: all ease 0.2s;
    border: none;

    &:hover {
        font-weight: 800;
    }
`;


export const ContainerTags = styled.div<{tags:boolean}>`
    display: flex;
    margin: 10px 0;
    padding: 10px 0;

    width: 100%;
    overflow-x: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${props=>props.theme.colors.primary};
        border-radius: 5px;
    }
    

    li {
        height: 30px;
        display: flex;
        align-items: center;
        background: var(--main-color);
        padding: 5px 20px;
        border-radius: 20px;
        color: var(--light);
        font-size: 1rem;
        font-weight: 600;
        list-style: none;
    } li:not(:first-child) { margin-left: 5px; }


    @media (max-width: 720px) {
        top: 180px;
    }
`