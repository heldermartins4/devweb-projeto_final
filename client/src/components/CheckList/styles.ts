import styled from "styled-components";

export const Container = styled.div`
    input {
        color: ${props=>props.theme.colors.text};
    }
`


export const ContainerTask = styled.div<{state:boolean}>`
    padding: 5px 10px;

    li {
        text-decoration: none;
        list-style: none;
        margin: 5px 0;
        display: flex;
        align-items: center;
    }

    input {
        border: none;
        outline: none;
    }

    input[type='checkbox'] {
        cursor: pointer;
        appearance: none; -webkit-appearance: none;
    }

    input[type='checkbox']::before {
        content: '✓';
        color: ${props=>props.state ? 'var(--light)' : props.theme.colors.contrast};
        padding: 5px 10px;
        border-radius: 5px;
        background: ${props=>props.state ? 'var(--main-color)' : props.theme.colors.contrast};
        font-weight: bolder;
        font-size: 1rem;
        animation: ${props=>props.state ? 'checked ease .4s forwards' : ''};
    }

    .content {
        width: 80%;
        font-size: 1rem;
        padding: 5px 10px;
        margin-left: 10px;
        text-decoration: ${props=>props.state ? 'line-through' : 'none'};
        background: transparent;
    }

    @keyframes checked {
        0% {
            padding: 0;
            font-size: 0rem;
        }
        75% {
            padding: 7px 12px;
            font-size: 1.5rem;
        }
        100% {
            padding: 5px 10px;
            font-size: 1rem;
        }
    }
`