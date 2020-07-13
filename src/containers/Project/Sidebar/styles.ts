// Core
import styled from 'styled-components';

const sideBarWidth = 250;

export const Container = styled.aside<{ isActive: boolean }>`
    min-width: ${`${sideBarWidth}px`};
    max-width: ${`${sideBarWidth}px`};
    border-right: 1px solid black;
    padding: 15px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.app.sideBar};
    background-size: cover;

    @media (max-width: 1024px) {
        position: fixed;
        left: ${({ isActive }) => isActive ? '0px' : `-${sideBarWidth}px`};
        top: 0px;
        bottom: 0px;
        z-index: 10;
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 10px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.7);
        box-sizing: border-box;
    }

    transition: left 0.3s;
`;

export const Header = styled.header`

`;

export const Ul = styled.ul`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    padding: 20px 0px 0px 20px;
`;

export const Li = styled.li<{ isActive: boolean, color: string }>`
    padding-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
    font-size: 28px;
    font-family: sans-serif;
    color: #fff;
    cursor: pointer;

    ${({ isActive, color }) => isActive && {
        textDecoration: 'underline',
        color,
    }};

    &:hover {
        color: ${({ color }) => color};
    }
`;

export const Toogler = styled.div<{ isActive: boolean }>`
    display: none;

    @media (max-width: 1024px) {
        display: flex;
    }

    position: absolute;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    ${({ isActive }) => isActive
        ? { right: '-25px' }
        : { right: '-30px', opacity: 0.3 }};
    top: 40%;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.project.primary};

    &:hover {
        opacity: 1;
    }

    transition: right 0.3s, opacity 0.3s;
`;

export const Footer = styled.footer`
    div {
        border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;
        font-family: sans-serif;
        color: #fff;
        margin-bottom: 10px;

        h2 {
            font-size: 22px;
            font-family: sans-serif;
            text-align: center;
            color: #fff;
            padding: 10px 0px;
        }

        h3 {
            font-size: 16px;
            text-align: center;
            padding-bottom: 10px;
        }

        p {
            font-size: 14px;
            padding-bottom: 10px;
        }
    }

    nav {
        display: flex;
        justify-content: flex-end;
    }
`;
