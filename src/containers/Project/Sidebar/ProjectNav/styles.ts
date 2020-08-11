// Core
import styled from 'styled-components';

export const Header = styled.header``;

export const Ul = styled.ul`
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    padding: 15px;
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

export const Title = styled.h2`
    font-family: sans-serif;
    color: #fff;
    font-size: 22px;
    text-align: center;
    padding: 10px 0px;
`;

export const Description = styled.p`
    font-family: sans-serif;
    color: #fff;
    font-size: 14px;
`;

export const Footer = styled.footer`
    nav {
        display: flex;
        justify-content: flex-end;
    }
`;
