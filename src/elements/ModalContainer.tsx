// Core
import React, { FC } from 'react';
import styled from 'styled-components';

interface ModalContainerProps {}

export const ModalContainer: FC<ModalContainerProps> = ({ children }) => {
    return (
        <Styled>
            {children}
        </Styled>
    );
};

const Styled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
`;
