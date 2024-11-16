import styled from "styled-components";

export const SendMessagesContainer = styled.div`
    width: 100%;
    padding: 0 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props=>props.theme.colors.text};

    input {
        width: 100%;
        border-radius: 20px;
        padding: 10px 20px;
        outline: none;
        font-size: 1rem;
        border: none;
        background: ${props=>props.theme.colors.contrast};
        color: ${props=>props.theme.colors.text};
    }

    button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 10px 20px;
        margin-left: 5px;
        border: none;
        cursor: pointer;
        background: linear-gradient(45deg, #7B0CDE, #9F33FF);
        color: #f5f5f5;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`