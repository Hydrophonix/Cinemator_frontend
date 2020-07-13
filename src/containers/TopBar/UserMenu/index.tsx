// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

// Hooks
import { useCustomLocalQuery } from '../../../hooks';

// Styles
import { Container } from './styles';

export const UserMenu: FC = () => {
    const { push } = useHistory();
    const { data } = useCustomLocalQuery('isLoggedIn');

    return (
        <Container
            isActive = { data!.isLoggedIn }
            onClick = { () => data!.isLoggedIn && void push('/profile') }>
            <FontAwesomeIcon
                icon = 'user-astronaut'
                style = {{ width: 40, height: 40 }}
                title = { data!.isLoggedIn ? 'Enter profile' : 'Login before use profile.' }
            />
        </Container>
    );
};
