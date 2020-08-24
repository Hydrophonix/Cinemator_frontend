// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Styles
import { Container } from './styles';

// Types
type PropTypes = {
    resetInputsToInitial: Function
}

export const UserMenu: FC<PropTypes> = ({ resetInputsToInitial }) => {
    const { push } = useHistory();
    const { togglersRedux: { isLoggedIn }} = useTogglersRedux();

    return (
        <Container
            isActive = { isLoggedIn }
            onClick = { () => {
                if (isLoggedIn) {
                    push('/profile');
                    resetInputsToInitial();
                }
            } }>
            <FontAwesomeIcon
                icon = 'user-astronaut'
                style = {{ width: 40, height: 40 }}
                title = { isLoggedIn ? 'Enter profile' : 'Login before use profile.' }
            />
        </Container>
    );
};
