// Core
import React, { FC, useState, useContext } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

interface IconProps extends FontAwesomeIconProps {
    active?: boolean;
    onHoverSpin?: boolean;
}

export const Icon: FC<IconProps> = ({ active, onHoverSpin, spin, color, ...otherProps }) => {
    const theme = useContext(ThemeContext);
    const [ isIconHovered, setIsIconHovered ] = useState(false);

    return (
        <FontAwesomeIcon
            color = {
                isIconHovered || active
                    ? theme.icon.secondary
                    :  color || theme.icon.primary
            }
            cursor = 'pointer'
            spin = { spin || (onHoverSpin && isIconHovered) }
            onMouseEnter = { () => setIsIconHovered(true) }
            onMouseLeave = { () => setIsIconHovered(false) }
            { ...otherProps }
        />
    );
};
