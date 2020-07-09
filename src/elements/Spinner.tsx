// Core
import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface SpinnerProps {
    size?: SizeProp;
}

export const Spinner: FC<SpinnerProps> = ({ size = '2x' }) => {
    const { primary } = useContext(ThemeContext);

    return (
        <FontAwesomeIcon
            spin
            color = { primary }
            cursor = 'pointer'
            icon = 'compact-disc'
            size = { size }
            title = 'Loading...'
        />
    );
};
