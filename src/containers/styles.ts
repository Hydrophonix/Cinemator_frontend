// Core
import styled, { keyframes, css } from 'styled-components';

export const ModalMain = styled.main`
    max-height: 410px;
    min-height: 410px;
    overflow-y: scroll;
`;

export const ModalFooter = styled.footer`
    padding: 10px;
    display: flex;
    justify-content: flex-end;
`;

export const ModalIconsContainer = styled.nav`
    position: relative;
    padding: 0px 5px 5px;

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

const rotateAnimation = keyframes`
  from { transform:rotate(0deg); }
  to { transform:rotate(360deg); }
`;

export const ModalIcon = styled.div<{ isRotate?: boolean }>`
    display: flex;
    align-items: center;
    padding: 0px 2px;
    cursor: pointer;
    ${({ isRotate }) => isRotate && css`animation: ${rotateAnimation} 0.5s`};
`;

