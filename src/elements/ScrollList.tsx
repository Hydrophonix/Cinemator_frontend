// Core
import React, { FC, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import styled from 'styled-components';

// Styles
export const ScrollContainer = styled.section<{ heightDiff: number }>`
    overflow-x: hidden;
    overflow-y: auto; 
    height: ${({ heightDiff }) => `calc(100% - ${heightDiff + 1}px)`};
`;

type Proptypes = {
    divRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}

export const ScrollList: FC<Proptypes> = ({ children, divRef }) => {
    const [ heightDiff, setHeightDiff ] = useState(0);

    const resizeHandler = throttle(() => {
        if (divRef.current) {
            const clientHeight = divRef.current.clientHeight;

            if (heightDiff !== clientHeight) {
                setHeightDiff(clientHeight);
            }
        }
    }, 500);

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    useEffect(() => {
        resizeHandler();
    });

    return (
        <ScrollContainer heightDiff = { heightDiff }>
            {children}
        </ScrollContainer>
    );
};
