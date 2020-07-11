// Core
import styled from 'styled-components';

export const SceneContainer = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const SceneHeader = styled.header`
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
