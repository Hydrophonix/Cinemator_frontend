// Core
import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${({ theme }) => theme.scene.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
    }
`;
