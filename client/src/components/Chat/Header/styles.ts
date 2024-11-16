import styled from "styled-components";

export const HeaderChat = styled.div`
    width: 100%;
    padding: 10px 0;
    font-size: 1.5rem;
    color: #f5f5f5;
    background: #272727;
    border-radius: 10px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    span {
        cursor: pointer;
    }

    & {
        border-bottom: 2px solid var(--main-color);
    }
`

export const HiddenChat = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    left: -20px;
    border-radius: 50%;
    background: var(--main-color);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: all ease 0.2s;

    &:hover {
        background: var(--purple);
    }
`