// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { UserMenu } from './UserMenu';

// Images
import logo from '../../assets/images/logo.png';

// Styles
import { TopbarContainer, Logo } from './styles';

export const TopBar: FC = () => {
    const { push } = useHistory();

    return (
        <TopbarContainer >
            <Logo
                src = { logo }
                onClick = { () => void push('/') }
            />
            <h1>Cinemator</h1>
            <UserMenu />
        </TopbarContainer>
    );
};
