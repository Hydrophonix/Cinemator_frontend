// Core
import styled from 'styled-components';

export const Header = styled.header``;

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
