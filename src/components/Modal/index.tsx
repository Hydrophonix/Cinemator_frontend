// Core
import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

// Elements
import { Spinner } from '../../elements';

// Styles
import S from './styles';

type PropTypes = {
    children: ReactElement[];
    closeHandler?: () => void;
    spinner?: boolean
}

export const Modal: FC<PropTypes> = ({ children, closeHandler, spinner }) => {
    const { goBack } = useHistory();

    const stopPropagation = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };

    const hideModal = () => void goBack();

    return (
        <S.ModalWrapper>
            <S.ModalContainer onClick = { (event) => void stopPropagation(event) }>
                {spinner && <Spinner absolute />}
                <S.Cross onClick = { closeHandler ? closeHandler : hideModal } />
                {children}
            </S.ModalContainer>
        </S.ModalWrapper>
    );
};
