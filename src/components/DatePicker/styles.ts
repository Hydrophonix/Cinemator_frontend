// Core
import styled from 'styled-components';

export const Container = styled.nav`
    display: flex;
    width: 100%;
    align-items: center;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.5);
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;

    .react-datepicker-wrapper {
        width: 100%;
    }
`;

export const CustomDatePickerInput = styled.button<{ disabled: boolean }>`
    cursor: pointer;
    padding: 2px 5px;
    border: none;
    outline: none;
    background-color: #fff;
    font-family: sans-serif;
    font-size: 20px;
    color: #000;
    width: 100%;
    margin: 0px !important;

    &:disabled {
        color: gray;
        cursor: not-allowed;
    }

    ${({ theme, disabled }) => !disabled && {
        '&:hover': {
            color:              '#fff',
            'background-color': theme.workday.anotherSecondary,
        },
    } }
`;
