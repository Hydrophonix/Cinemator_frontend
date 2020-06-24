// Core
import styled from 'styled-components';

export const ProjectItemContainer = styled.div`
    width: 200px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: 1px solid black;
    cursor: pointer;
    
    background-color: #fff;
    color: #216ba5;
    
    &:hover {
        background-color: #216ba5;
        color: #fff;
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
