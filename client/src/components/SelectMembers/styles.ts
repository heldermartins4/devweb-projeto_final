import styled from "styled-components";

export const SelectMembersContainer = styled.div<{selectMembers:boolean}>`
    position: absolute;
    width: 400px;
    background: rgba(0,0,0,0.3);
    padding: 5px;
    border-radius: 5px;
    z-index: 99;
    max-height: 200px;
    overflow-y: scroll;

    display: ${props=>props.selectMembers ? "flex" : "none"};
    flex-direction: column;

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
        background: ${props => props.theme.colors.text}; 
        border-radius: 10px;
    }

    @media (max-width: 720px) {
        width: 100%;
        background-color: ${props => props.theme.colors.background};
        left: 0;

        max-height: 300px;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
`
export const ListMembers = styled.span`
    padding: 10px 5px;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: all 0.2;
    cursor: pointer;

    .img {
        border-radius: 50%;
        padding: 5px;
        border: 2px solid #995CFA;

        display: flex;
        justify-content: center;
        align-items: center;
    } img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    p {
        margin-left: 10px;
        font-size: 20px;
    }

    &:hover {
        background: ${props => props.theme.colors.contrast};
    }

    &:not(:first-child) {
        margin-top: 5px;
    }
    
    @media (max-width: 720px) {
        width: 90%;
        margin: 0 auto;
        border: 2px solid ${props => props.theme.colors.contrast};
    }
`