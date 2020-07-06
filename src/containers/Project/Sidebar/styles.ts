// Core
import styled from 'styled-components';

import asideBg from '../../../assets/images/asideBg.png';

export const SidebarContainer = styled.aside`
        min-width: 200px;
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
            padding: 10px 10px 10px 20px;
            border-radius: 10px;
            flex-direction: column;
            background-color: rgba(0,0,0,0.7);
        }
`;

export const SidebarLi = styled.li<{ isActive: boolean }>`
    padding: 5px 0px;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px;
    font-family: sans-serif;
    color: #fff;
    font-size: 26px;
    cursor: pointer;

    ${({ isActive }) => isActive && { textDecoration: 'underline' }};

    &:hover {
        color: #a100f2;
    }
`;
