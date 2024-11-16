import styled from "styled-components";

export const Container = styled.div`
    max-width: 560px;
    margin: 20px 0;

    iframe {
        width: 100%;
        min-height: 315px;
        border-radius: 10px;
    }

    .embed input {
        width: 100%;
        padding: 5px 10px;
        border: 2px solid var(--main-color);
        color: var(--main-color);
        background: transparent;
        border-radius: 5px;
        font-size: 18px;
        outline: none;
    }
`