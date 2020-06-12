// Core
import React, { FC } from 'react';
// import { Link } from 'react-router-dom';

// Types
// import { ThemesKeys } from '../../theme';

// Components
import { UserMenu } from '../../components';

// Images

// Styles
import { TopbarContainer, Logo } from './styles';

// type PropTypes = {
//     themeName: ThemesKeys;
//     setThemeName: (value: ThemesKeys) => void;
// };

export const TopBar: FC = () => {
    return (
        <TopbarContainer>
            <Logo />
            <h1>Cinemator</h1>
            <UserMenu />
        </TopbarContainer>
    );
};
