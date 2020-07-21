// Core
import React, { FC, DetailedHTMLProps, Ref } from 'react';
import styled from 'styled-components';

// Styles
const StyledInput = styled.input<StyledInputProps>`
    padding: 5px;
    font-size: 16px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.input.primary};
    border: none;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.75);
    outline: none;
    font-family: sans-serif;

    &::placeholder {
        color: gray;
    }

    &:disabled {
        color: lightgray;
        cursor: not-allowed;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorMessage = styled.span`
    height: 16px;
    font-size: 14px;
    padding-left: 6px;
    padding-top: 2px;
    color: ${({ theme }) => theme.input.error};
`;

// Types
interface StyledInputProps {
    error?: string;
}

interface InputProps extends
    StyledInputProps,
    DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
{
    // use React.Ref instead of React.LegacyRef to prevent type incompatibility errors with styled-components types
    ref?: Ref<HTMLInputElement>;
    withError?: boolean;
}

export const Input: FC<InputProps> = ({ withError, error, width, height, style, ...otherProps }) => {
    if (withError) {
        return (
            <InputContainer
                style = {{ width, height, ...style }}>
                <StyledInput
                    error = { error }
                    { ...otherProps }
                />
                <ErrorMessage>{error}</ErrorMessage>
            </InputContainer>
        );
    }

    return (
        <StyledInput
            style = {{ width, height, ...style }}
            { ...otherProps }
        />
    );
};
