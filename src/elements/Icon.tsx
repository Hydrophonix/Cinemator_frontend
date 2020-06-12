// Core
import React, { FC, useState, useContext } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Types
import { Theme } from '../assets';

interface IconProps extends FontAwesomeIconProps {
    active?: boolean;
    onHoverSpin?: boolean;
    onHoverColor?: keyof Omit<Theme, 'name'>;
}

export const Icon: FC<IconProps> = ({ active, onHoverSpin, spin, onHoverColor, color, ...otherProps }) => {
    const theme = useContext(ThemeContext);
    const [ isIconHovered, setIsIconHovered ] = useState(false);

    return (
        <FontAwesomeIcon
            color = {
                isIconHovered || active
                    ? (onHoverColor && theme[ onHoverColor ]) || theme.secondary
                    :  color || theme.primaryVariant
            }
            cursor = 'pointer'
            spin = { spin || (onHoverSpin && isIconHovered) }
            onMouseEnter = { () => setIsIconHovered(true) }
            onMouseLeave = { () => setIsIconHovered(false) }
            { ...otherProps }
        />
    );
};
