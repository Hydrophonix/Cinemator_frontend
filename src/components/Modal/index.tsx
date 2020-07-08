// Core
import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

// Styles
import S from './styles';

type PropTypes = {
    children: ReactElement[];
    closeHandler?: () => void;
}

export const Modal: FC<PropTypes> = ({ children, closeHandler }) => {
    const { goBack } = useHistory();

    const stopPropagation = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    };

    const hideModal = () => void goBack();

    return (
        <S.ModalWrapper>
            <S.ModalContainer onClick = { (event) => void stopPropagation(event) }>
                <S.Cross onClick = { closeHandler ? closeHandler : hideModal } />
                {children}
            </S.ModalContainer>
        </S.ModalWrapper>
    );
};
