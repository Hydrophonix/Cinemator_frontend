// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Styles
import { Container } from './styles';

export const UserMenu: FC = () => {
    const { push } = useHistory();
    const { togglersRedux: { isLoggedIn } } = useTogglersRedux();

    return (
        <Container
            isActive = { isLoggedIn }
            onClick = { () => isLoggedIn && void push('/profile') }>
            <FontAwesomeIcon
                icon = 'user-astronaut'
                style = {{ width: 40, height: 40 }}
                title = { isLoggedIn ? 'Enter profile' : 'Login before use profile.' }
            />
        </Container>
    );
};
