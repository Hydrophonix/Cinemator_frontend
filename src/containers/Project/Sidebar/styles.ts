// Core
import styled from 'styled-components';

const sideBarWidth = 250;

export const Container = styled.aside<{ isActive: boolean }>`
    position: relative;
    min-width: ${`${sideBarWidth}px`};
    max-width: ${`${sideBarWidth}px`};
    border-right: 1px solid black;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.app.secondary};
    background-size: cover;

    @media (max-width: 1024px) {
        position: fixed;
        left: ${({ isActive }) => isActive ? '0px' : `-${sideBarWidth}px`};
        top: 0px;
        bottom: 0px;
        z-index: 10;
    }

    .animatedDiv {
        position: absolute;
        left: 15px;
        bottom: 15px;
        top: 15px;
        right: 15px;
        will-change: transform, opacity;
    }

    transition: left 0.3s;
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.7);
    box-sizing: border-box;
`;

export const Toogler = styled.div<{ isActive: boolean }>`
    display: none;
    z-index: 2;

    @media (max-width: 1024px) {
        display: flex;
    }

    position: absolute;
    border-radius: 10px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    ${({ isActive }) => isActive
        ? { right: '-40px' }
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
