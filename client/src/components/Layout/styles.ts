import styled from 'styled-components';

export const Layout = styled.div``

export const Container = styled.main<{sidebarToggle: boolean}>`
    position: absolute;
    left: ${props=>props.sidebarToggle ? "280px" : "140px"};
    background: ${props=>props.theme.colors.background};
    right: 50px;
    height: 90vh;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    padding: 30px 10px;
    box-shadow: 0px 6px 36px -6px rgba(0,0,0,0.3);
    border-radius: 20px;
    transition: all 0.2s;

    @media (max-width: 1150px) {
        left: 140px !important;
    }
    
    @media (max-width: 980px) {
        width: 100%;
        height: 90vh;
        position: relative;
        top: 10vh;
        left: 0 !important;
        
        transform: translateY(0);
        
        box-shadow: none;
    }
`;

export const ContainerChat = styled.div``

export const ChatButton = styled.div<{viewChat: boolean}>`
    position: absolute;
    top: ${props=>props.viewChat ? '5px' : ''};
    bottom: ${props=>props.viewChat ? '' : '32px'};
    right: 32px;

    z-index: 99;
    color: ${props=>props.viewChat ? 'var(--light)' : 'var(--main-color)'};
    padding: ${props=>props.viewChat ? '20px' : '10px'};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    background: ${props=>props.viewChat ? '#e4254f' : props=>props.theme.colors.background};
    box-shadow:
            0.7px 1.1px 2.7px rgba(0, 0, 0, 0.046),
            1.8px 2.8px 6.9px rgba(0, 0, 0, 0.064),
            3.7px 5.7px 14.2px rgba(0, 0, 0, 0.075),
            7.7px 11.7px 29.2px rgba(0, 0, 0, 0.084),
            21px 32px 80px rgba(0, 0, 0, 0.1)
            ;

    &:hover {
        transform: ${props=>props.viewChat ? '' : 'scale(1.2)'};
        animation: ${props=>props.viewChat ? '' : 'pop-up-effect 0.5s forwards'};
    }

    @keyframes pop-up-effect {
        0% {
            transform: translateY(0%);
        }
        100% {
            transform: translateY(-10%);
        }
    }

    .bi:not(:last-child) {
        width: 40px;
        height: 40px;
    }

    .bi-x-lg {
        width: 20px;
        height: 100%;
    }
`

export const Chat = styled.div<{viewChat: boolean}>`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    width: 500px;
    height: 100vh;
    display: ${props=>props.viewChat ? 'block' : 'none'};
    padding: 0 20px;
    
    background: var(--transparent-black);
    backdrop-filter: blur( 10px );
    -webkit-backdrop-filter: blur( 10px );

    @media (max-width: 980px) {
        width: 100%;
    }
`
