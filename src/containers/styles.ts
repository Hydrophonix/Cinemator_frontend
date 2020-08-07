// Core
import styled, { keyframes, css } from 'styled-components';

export const ModalHeader = styled.header`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    h2 {
        padding-left: 15px;
        font-family: sans-serif;
        font-size: 24px;
        color: #fff;
    }
`;

export const ModalFooter = styled.footer`
    height: 50px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
`;

export const ModalIconsContainer = styled.nav`
    position: relative;
    padding: 5px;

    section {
        position: absolute;
        display: flex;
        right: 10px;
        top: 8px;
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

