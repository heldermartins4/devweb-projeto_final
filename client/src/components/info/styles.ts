import { darken, shade } from 'polished';
import styled from 'styled-components';

export const ContainerTask = styled.div`
    width: 90%;
    margin: 0 auto;
`

export const HeaderTask = styled.div<{statusTask:boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    input {
        font-size: 2rem;
        outline: none;
        border: none;
        background: transparent;
        padding: 20px 0;
        color: ${props=>props.theme.colors.text};
    }

    div {
        display: flex;
        align-items: center;
    }

    .bi {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .bi-arrow-left {
        margin-right: 20px;
    }

    .bi-checked {
        transition: all ease 0.2s;
        fill: ${props=>props.statusTask ? 'var(--green)' : props.theme.colors.contrast};
    }
`

export const ContentTask = styled.textarea`
    border: none;
    outline: none;
    width: 100%;
    height: 50vh;
    overflow-y: scroll;
    margin-top: 20px;
    color: ${props=>props.theme.colors.text};
    background: transparent;
    font-size: 1.2rem;
    line-height: 150%;

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
`

export const PropertiesTask = styled.div<{
    viewDropdownOwner:boolean,
    viewDropdownSchedule:boolean
}>`
    background: var(--contrast);
    position: relative;
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    color: var(--light);
    box-shadow: var(--shadow);

    display: flex;
    align-items: center;
    justify-content: space-between;

    .owner {
        display: flex;
        align-items: center;
        font-size: 1rem;
    }

    .owner button {
        width: 30px;
        height: 30px;
        border: .15em solid var(--light);
        border-style: dashed;
        border-radius: 50%;
        background: transparent;
        padding: 5px;
        margin-left: 10px;
        cursor: pointer;
    }
    .owner button .bi {
        width: 15px;
        height: 15px;
        fill: var(--light);
    }

    .options-calendar .bi {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .schedule--modal,
    .owner--modal {
        position: absolute;
        top: 50px;
        background: ${props=>props.theme.colors.contrast};
        box-shadow: var(--shadow);
    }

    .owner--modal {
        border-radius: 5px;
        padding: 10px;

        display: ${props=>props.viewDropdownOwner ? 'flex' : 'none'};
        flex-direction: column;
        justify-content: center;
    }

    .owner--modal input {
        background: ${props=>props.theme.colors.primary};
        color: ${props=>props.theme.colors.text};
        border: none;
        outline: none;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 1rem;
    }

    .owner--modal ul li {
        list-style: none;
        background: ${props=>props.theme.colors.primary};
        color: ${props=>props.theme.colors.text};
        display: flex;
        align-items: center;
        margin: 5px 0;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
    }

    .owner--modal ul li:hover {
        background: ${props=>darken(0.01, props.theme.colors.primary)};
    }

    .owner--modal ul li img {
        margin-right: 10px;
        width:30px;
        height: 30px;
        border-radius: 50%;
    }

    .schedule--modal {
        right: 0;
        border-radius: 5px;
        padding: 10px;
        display: ${props=>props.viewDropdownSchedule ? 'flex' : 'none'};
        flex-direction: column;
        color: ${props=>props.theme.colors.text};
    }

    .schedule--modal .start,
    .schedule--modal .end {
        padding: 10px 0;
    }

    .schedule--modal .start input, 
    .schedule--modal .end input {
        border: none;
        outline: none;
        background: ${props=>props.theme.colors.primary};
        padding: 5px 10px;
        color: ${props=>props.theme.colors.text};
        border-radius: 5px;
    }

    .schedule--modal .start input:not(:first-child), 
    .schedule--modal .end input:not(:first-child) {
        margin-left: 10px;
    }

    .schedule--modal .start input::-webkit-calendar-picker-indicator, 
    .schedule--modal .end input::-webkit-calendar-picker-indicator {
        filter: ${props=>props.theme.colors.iconsInput};
    }

    .schedule--modal button {
        border: none;
        outline: none;
        padding: 5px 10px;
        border-radius: 5px;
        background: ${props=>props.theme.colors.text};
        color: ${props=>props.theme.colors.primary};
        transition: all ease 0.2s;
        cursor: pointer;
    }

    .schedule--modal button:hover {
        background: ${props=>props.theme.colors.textEditable};
    }
`