// Core
import styled from 'styled-components';

export const SceneItemContainer = styled.div`
    width: 100%;
    margin: 5px 0px;
    padding: 5px;
    box-sizing: border-box;

    display: flex;

    border-bottom: 1px solid black;
    cursor: pointer;

    &:hover {
        background-color: gray;
    }


    section {
        display: flex
    }
`;

export const Cell = styled.div`
`;
