// Core
import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// Types
// import { ThemesKeys } from '../../theme';

// Components
import { UserMenu } from './UserMenu';

// Images
import logo from '../../assets/images/logo.png';

// Styles
import { TopbarContainer, Logo } from './styles';

// type PropTypes = {
//     themeName: ThemesKeys;
//     setThemeName: (value: ThemesKeys) => void;
// };

export const TopBar: FC = () => {
    return (
        <TopbarContainer>
            <Logo src = { logo }/>
            <h1>Cinemator</h1>
            <UserMenu />
        </TopbarContainer>
    );
};
