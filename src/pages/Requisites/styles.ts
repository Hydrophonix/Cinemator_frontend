// Core
import styled from 'styled-components';

export const RequisiteContainer = styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${({ theme }) => theme.requisite.containerBg};
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:  5px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.requisite.secondary};

    h2 {
        font-size: 24px;
        font-family: sans-serif;
        color: #fff;

        @media (max-width: 1024px) {
            display: none;
        }
    }
`;
