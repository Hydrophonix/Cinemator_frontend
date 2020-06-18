// Core
import styled from 'styled-components';

export const ProjectItemContainer = styled.div`
    width: 200px;
    height: 100px;
    margin: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border: 1px solid black;
    cursor: pointer;
    
    background-color: #fff;
    color: #216ba5;
    
    &:hover {
        background-color: #216ba5;
        color: #fff;
    }
`;
