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
    min-height: 35px;
    box-sizing: border-box;
    
    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;
        min-width: 100px;
        text-align: center;
    }

    nav {
        &:last-child {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
        }
    }
`;

export const WorkdaysContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 5px;
    border-top: 0.5px solid ${({ theme }) => theme.scene.primary};
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.workday.containerBg};
`;

export const LocationsContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-top: 0.5px solid ${({ theme }) => theme.scene.primary};
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 0.5px solid #fff;
    background-color: ${({ theme }) => theme.scene.secondary};
    color: #fff;
    box-sizing: border-box;
    padding: 5px 5px 0px;

    div {
        display: flex;
        justify-content: center;
        padding-bottom: 5px;

        p {
            font-family: sans-serif;
        }
    }
`;
