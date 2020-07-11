// Core
import styled from 'styled-components';

import asideBg from '../../../assets/images/asideBg.png';

export const SidebarContainer = styled.aside<{ isActive: boolean }>`
        width: 200px;
        position: fixed;
        z-index: 10;
        top: 0px;
        bottom: 0px;
        left: ${({ isActive }) => isActive ? '0px' : '-200px'};
        border-right: 1px solid black;
        padding: 15px;
        box-sizing: border-box;
        background-image: url(${asideBg});
        background-size: cover;

        button {
            margin-bottom: 20px;
        }

        ul {
            display: flex;
            height: 100%;
            box-sizing: border-box;
            padding: 10px 10px 10px 20px;
            border-radius: 10px;
            flex-direction: column;
            background-color: rgba(0,0,0,0.7);
        }

    transition: left 0.3s;
`;

export const SidebarLi = styled.li<{ isActive: boolean, color: string }>`
    padding: 5px 0px;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-family: sans-serif;
    color: #fff;
    font-size: 26px;
    cursor: pointer;

    ${({ isActive, color }) => isActive && {
        textDecoration: 'underline',
        color,
    }};

    &:hover {
        color: ${({ color }) => color};
    }
`;

export const SidebarToogler = styled.div<{ isActive: boolean }>`
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
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.project.primary};

    &:hover {
        opacity: 1;
    }

    transition: right 0.3s, opacity 0.3s;
`;
