import styled, {css} from 'styled-components';
import { darken } from 'polished';

// Area dos cards -- colunas
export const Columns = styled.div<{color:string}>`
    justify-content: center;
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
        margin-left: 10px;
    }
`

export const HeaderColumns = styled.div<{color:string}>`
    width: 280px;
    
    .header--column {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between !important;
        border-radius: 5px;
        margin: 5px 0;
        background: ${props=>props.color};
        padding: 5px;
        color: var(--light);
    }

    svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .header--column input {
        width: 100%;
        outline: none;
        padding: 5px 10px;
        border: none;
        background: transparent;
        font-size: 1.2rem;
        border-radius: 5px;
        color: var(--light);
        font-weight: bold;
    }
`

export const Card = styled.div`
    background: ${props=> darken(0, props.theme.colors.interativy)};
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    transition: all ease-in-out 0.2s;
    color: ${props=>props.theme.colors.text};
    cursor: pointer !important;

    &:hover {
        background: ${props=>props.theme.colors.contrast};

        .options--tasks {
            opacity: 1;
        }
    }
`

// nome da task
export const Task = styled.span`
    display: flex;
    flex-direction: column;

    span {
        margin-left: 10px;
    }

    p {
        width: 250px;
        word-wrap: break-word;
    }

    textarea {
        border-top: 0px;
        border-right: 0px;
        border-bottom: 0px;
        border-left: 2px solid var(--main-color);
        padding: 10px;
        resize: none;
        background: transparent;
        outline: none;
        font-size: 18px;
        color: ${props=>props.theme.colors.text};
    }
`

export const TaskContent = styled.div``


export const OptionsTasks = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;

    margin-top: 20px;

    .options--tasks {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        opacity: 0;
    }

    .options--tasks span .bi {
        width: 20px;
    }
`

export const AreaColumn = styled.div`
    width: 100%;
    height: 200px;
`

// area onde estão localizados os cards
export const AreaTasks = styled.div`
    height: 200px;
`

export const AddTask = styled.button`
    border: none;
    width: 100%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;

    background: ${props=> darken(0.01, props.theme.colors.primary)};
    color: ${props=>props.theme.colors.text};

    &:hover {
        background: ${props=> darken(0.10, props.theme.colors.primary)};
    }
`

export const OptionsColumn = styled.div`
    position: relative;

    background: ${props=>props.theme.colors.background};
    border-radius: 5px;
    box-shadow: 0px 3px 12px -3px rgba(0,0,0,0.3);

    ul {
        padding: 5px;
    }

    ul a li {
        margin-top: 5px;
    }

    ul li {
        list-style: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        background: ${props=>props.theme.colors.contrast};
        display: flex;
        align-items: center;
    }

    ul li:hover { background: ${props=> darken(0.03, props.theme.colors.contrast)}; }

    ul li span {
        margin-left: 10px;
    }

    ul li .bi {
        width: 20px;
        height: 20px;
    }

    .col-2 {
        width: 100%;
        padding: 30px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .col-2 .display {
        display: flex;
        justify-content: space-evenly;
    }

    .option--color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transform: scale(1);
        cursor: pointer;
        transition: all ease-in-out 0.2s;
    }

    .option--color:hover {
        transform: scale(1.5);
    }

    .red { background: var(--red); }
    .green { background: var(--green); }
    .blue { background: var(--blue); }
    .yellow { background: var(--yellow); }
    .pink { background: var(--pink); }
    .purple { background: var(--purple); }
`