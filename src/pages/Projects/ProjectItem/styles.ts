// Core
import styled from 'styled-components';

export const ProjectItemContainer = styled.div`
    width: 200px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    cursor: pointer;
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    background-color: ${({ theme }) => theme.project.secondary};
    color: #fff;
    font-family: sans-serif;
    
    &:hover {
        background-color: ${({ theme }) => theme.project.hoverSecondary};
    }

    &:active {
        position: relative;
        top: 2px;
        left: 2px;
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
    }

    header {
        display: flex;
        justify-content: center;
    }

    main {
        display: flex;
        justify-content: center;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
