// Core
import styled, { keyframes, css } from 'styled-components';

const rotateAnimation = keyframes`
  from { transform:rotate(0deg); }
  to { transform:rotate(360deg); }
`;

export const Main = styled.main`
    max-height: 390px;
    min-height: 390px;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Footer = styled.footer`
    background-color: ${({ theme }) => theme.scene.primary};
    padding: 10px;
    display: flex;
    justify-content: flex-end;
`;

export const Nav = styled.nav`
    position: relative;
    padding: 0px 5px 5px;
    background-color: ${({ theme }) => theme.scene.secondary};

    section {
        position: absolute;
        display: flex;
        right: 10px;
        top: 4px;
    }

    input {
        width: 100%;
        box-sizing: border-box;
    }
`;

export const RedoContainer = styled.div<{ isRotate?: boolean }>`
    display: flex;
    align-items: center;
    padding: 0px 2px;
    cursor: pointer;

    svg {
        cursor: pointer;
        &:hover {
            path {
                fill: ${({ theme }) => theme.scene.secondary};
            }
        }
    }

    ${({ isRotate }) => isRotate && css`animation: ${rotateAnimation} 0.5s`}
`;
