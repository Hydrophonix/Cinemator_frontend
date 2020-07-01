
// Core
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// Components
import { Modal } from '../Modal';

// Hooks

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

export const AddScenesModal: FC = () => {
    const { goBack } = useHistory();
    // const { _id: _idFromUrl } = useParams<{ _id: string }>();

    return (
        <Modal closeHandler = { () => goBack() }>
            <ModalHeader>Add scenes</ModalHeader>
            <Main>main</Main>
            <Footer>
                <Button>Close</Button>
                <Button>Save</Button>
            </Footer>
        </Modal>
    );
};
