
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, RequisitesTable } from '..';

// Apollo hooks
import { useRequisitesQuery } from '../../bus/Requisite';
import { useUpdateSceneRequisitesMutation } from '../../bus/Scene';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

// Types
type PropTypes = {
    closeHandler: () => void
    requisiteIds: Array<string>
}
type Params = {
    projectId: string
    sceneId: string
}

export const SceneRequisitesModal: FC<PropTypes> = ({ closeHandler, requisiteIds }) => {
    const { projectId, sceneId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateSceneRequisites ] = useUpdateSceneRequisitesMutation();
    const [ requisitesIdsArray, setRequisitesIdsArray ] = useArrayOfStringsForm(requisiteIds);
    const [ index, setIndexUseState ] = useState(0);
    const [ title, setTitleUseState ] = useState('');

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addRequsitesToSceneHandler = async () => {
        const response = await updateSceneRequisites({ variables: { sceneId, requisiteIds: requisitesIdsArray }});
        response && response.data && void closeHandler();
    };

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
                    index = { index }
                    lightVersion = {{ requisitesIdsArray, setRequisitesIdsArray }}
                    requisites = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexUseState(newIndex) }
                    setTitle = { (newTitle: string) => void setTitleUseState(newTitle) }
                    title = { title }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.requisite.primary }}>
                <Button onClick = { addRequsitesToSceneHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
