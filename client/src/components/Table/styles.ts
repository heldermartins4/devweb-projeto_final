import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div<{
    options:boolean
}>`
    width: 100%;
    padding: 20px 0;

    .header--table {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
        border-radius: 10px;
        padding: 5px 10px;
        background: ${props=>darken(0, props.theme.colors.primary)};
    }

    .header--table svg {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        cursor: pointer;
    }

    .header--table span button,
    .header--table span label {
        display: flex;
        align-items: center;
        opacity: 1;
        border: none;
        outline: none;
        /** Cor dos botões */
        background: ${props=>darken(0.03, props.theme.colors.primary)};
        color: var(--light);
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        margin: 5px 0;
        visibility: ${props=>props.options ? 'inherit' : 'hidden'};
        animation: 0.5s ${props=>props.options ? 'options' : ''} forwards;
    }

    .header--table span button:hover,
    .header--table span label:hover {
        opacity: 0.9;
    }

    @keyframes options {
        0% {
            transform: translateX(10px);
            .header--table span label {
                margin: 0;
            }
        }
        100% {
            transform: translateX(0);
            .header--table span label {
                margin: 0 10px;
            }
        }
    }

    .header--table span button {
        background: var(--red);
    }
    .header--table span label {
        background: var(--green);
        margin: 0 10px;
    }

    .header--table span button svg,
    .header--table span label svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    /*
    .header--table input[type='file'] {
        border: none;
        outline: none;
        padding: 5px 10px;
        width: 100%;
    }

    .header--table input[type='file']::before {
        content: '↥ Upload de arquivo';
        margin-right: 10px;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 1rem;
        font-weight: 600;
        color: var(--light);
        background: var(--contrast);
        cursor: pointer;
    }

    .header--table input[type='file']::-webkit-file-upload-button {
        display: none;
    }
    */

    .header--table input[type='file'] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
`

export const TableContainer = styled.div`
    width: 100%;
    overflow: scroll;
    color: ${props=>props.theme.colors.text};
    font-size: 18px;

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

    .table {
        position: relative;
        margin: 20px 0;
        width: 100%;
    }

    .flex-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table--vertical {
        display: flex;
        flex-direction: column;
    }
    
    .table--row {
        display: flex;
    }
    
    .botao {
        flex: 1;
        border: none;
        color: ${props=>props.theme.colors.text};
        font-size: 1rem;
        padding: 0 5px;
        background: transparent;
        cursor: pointer;
    } .botao:hover {
        background: ${props=>props.theme.colors.contrast};
        color: ${props=>props.theme.colors.text};
    }
    
    .table table tr td { 
        background-color: ${props=>props.theme.colors.background};
        padding: 5px 10px;
    
        min-width: 200px;
        min-height: 40px;

        max-width: 230px;
        word-wrap: break-word;
    }
    
    table {
        background-color: ${props=>props.theme.colors.contrast};
    }

    .btn--column {
        margin-left: 10px;
        padding: 0 10px;
    }

    .btn--row {
        margin-top: 10px;
        padding: 10px 0;
    }
`

export const ColumnOptionsTable = styled.button`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
`

