// Core
import styled from 'styled-components';

export const RequisiteContainer = styled.section`
    width: 100%;
    background-color: ${({ theme }) => theme.requisite.containerBg};
`;

export const RequisiteHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: ${({ theme }) => theme.requisite.secondary};
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

export const ReqTypesContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.requisite.secondary};
`;

export const ScenesContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.scene.containerBg};
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 0.5px solid #fff;
    background-color: ${({ theme }) => theme.requisite.secondary};
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
