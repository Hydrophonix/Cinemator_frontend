// Core
import styled from 'styled-components';

export const Container = styled.div<{ isActive: boolean }>`
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #fff;
    overflow: hidden;

    justify-content: center;
    align-items: center;

    ${({ isActive }) => isActive ? {
        cursor:       'pointer',
        'svg > path': {
            fill:       'dodgerblue',
            transition: 'fill 0.5s',
        },
        '&:hover': {
            'svg > path': {
                fill: 'blue',
            },
        },
    } : {
        cursor:       'not-allowed',
        'svg > path': {
            fill: 'gray',
        },
    }}

`;
