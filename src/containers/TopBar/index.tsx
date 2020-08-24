// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import { UserMenu } from './UserMenu';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';

// Images
import logo from '../../assets/images/logo.png';

// Styles
import { TopbarContainer, Logo } from './styles';

export const TopBar: FC = () => {
    const { push } = useHistory();
    const { resetInputsToInitial } = useInputsRedux();

    return (
        <TopbarContainer>
            <Logo
                src = { logo }
                onClick = { () => {
                    push('/');
                    resetInputsToInitial();
                } }
            />
            <h1>Cinemator</h1>
            <UserMenu resetInputsToInitial = { resetInputsToInitial }/>
        </TopbarContainer>
    );
};
