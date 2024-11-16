import styled from 'styled-components';
import { darken } from 'polished';

// Componente Kanban
export const KanbanBoard = styled.div`
    background: ${props=>props.theme.colors.background};
    color: ${props=>props.theme.colors.text};
    width: 100%;
    font-size: 18px;
    padding: 5px;
    border-radius: 5px;
    position: relative;
`

export const HeaderKanban = styled.div<{optionsKanban:boolean}>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    input {
        outline: none;
        border: none;
        background: transparent;
        font-size: 2rem;
        font-weight: 600;
        color: ${props=>props.theme.colors.text}; 
    }

    .options {
        cursor: pointer;
    }

    .options--kanban {
        background: ${props=>props.theme.colors.contrast};
        box-shadow: var(--shadow);
        padding: 5px 10px;
        display: ${props=>props.optionsKanban ? 'flex' : 'none'};
        align-items: center;
        position: absolute;
        top: 70px;
        right: 0;
        border-radius: 5px;
        cursor: pointer;
    }.options--kanban svg {
        width: 20px;
        margin-right: 10px;
    }

    .options--kanban:hover {
        background: ${props=>darken(0.1, props.theme.colors.contrast)};
    }

    @media (max-width: 980px) {
        padding: 10px 0;

        input {
            font-size: 1.5rem;
        }
    }
`

export const DisplayColumns = styled.div``

export const ContainerColumns = styled.div``

export const Columns = styled.div<{size:number}>`
    width: 100%;
    display: flex;

    overflow: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #c4c4c4;
        border-radius: 5px;
    }
`

export const AddColumn = styled.button`
    width: 50px;
    height: 40px;
    padding: 10px;
    border: none;
    font-size: 1.5rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;

    background: ${props=> darken(0.01, props.theme.colors.primary)};
    color: ${props=>props.theme.colors.text};

    &:hover {
        background: ${props=> darken(0.10, props.theme.colors.primary)};
    }
`