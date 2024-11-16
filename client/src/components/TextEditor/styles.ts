import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    .text-editor {
        outline: none;
        font-size: 1.2rem;
        line-height: 165%;
        padding: 10px 0;
    }

    /* width */
    .text-editor::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    .text-editor::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    /* Handle */
    .text-editor::-webkit-scrollbar-thumb {
        background: #c4c4c4; 
        border-radius: 10px;
    }

    [contentEditable=true]:empty:not(:focus):before {
        content: attr(data-text);
        color: ${props=>shade(0, props.theme.colors.textEditable)};
    }

    /** block code */
    .text-editor span {
        background: ${props=>shade(0, props.theme.colors.primary)};
        color: ${props=>shade(0, props.theme.colors.textEditable)};
        padding: 5px 10px;
        border-radius: 10px;
        font-family: monospace;
    }

    .tools {
        background: ${props=>shade(0, props.theme.colors.contrast)};
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: var(--shadow);
    }

    .tools button {
        border: none;
        outline: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 900;
        font-family: monospace;
        background-color: transparent;
        color: ${props=>props.theme.colors.text};
    }

    .tools button:hover {
        background: var(--contrast);
        color: var(--light);
    }

    .tools button:not(:first-child) {
        margin-left: 5px;
    }

    .italic {
        font-style: italic;
    }

    .code, pre {
        border: none !important;
        background: ${props=> props.theme.colors.contrast};
        color: ${props=>props.theme.colors.text};
    }

    @media (max-width: 768px) {
        .text-editor {
            font-size: 1rem;
            line-height: 165%;
        }
    }
`