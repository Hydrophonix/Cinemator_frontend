
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, RequisitesTable } from '..';

// Apollo hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

// Types
type PropTypes = {
    closeHandler: () => void
    requisiteIds: Array<string>
    handler?: (requisiteId: string) => void
    saveHandler?: Function
}
type Params = {
    projectId: string
}

export const RequisitesModal: FC<PropTypes> = ({ closeHandler, requisiteIds, handler, saveHandler }) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ index, setIndexUseState ] = useState(0);
    const [ title, setTitleUseState ] = useState('');

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const findByIndex = () => {
        const requisite = data.requisites.find((requisite) => requisite.number === index);

        if (requisite) {
            return [ requisite ];
        }

        return data.requisites;
    };

    const findByString = () => data.requisites.filter((requisite) => {
        return requisite.title.toLocaleLowerCase().includes(title.toLocaleLowerCase());
    });

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        if (title !== '') {
            return findByString();
        }

        return data.requisites;
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.requisite.secondary }}>Add requisites</ModalHeader>
            <Main>
                <RequisitesTable
                    lightVersion
                    handler = { handler }
                    index = { index }
                    requisiteIds = { requisiteIds }
                    requisites = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexUseState(newIndex) }
                    setTitle = { (newTitle: string) => void setTitleUseState(newTitle) }
                    title = { title }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.requisite.primary }}>
                <Button
                    title = 'Save'
                    onClick = { () => saveHandler && void saveHandler() }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'save'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Modal>
    );
};
