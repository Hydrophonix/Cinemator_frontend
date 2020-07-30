
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, ScenesTable } from '../../components';

// Apollo hooks
import { useScenesQuery } from '../../bus/Scene';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

// Types
type Params = {
    projectId: string
}

type PropTypes = {
    closeHandler: () => void
    sceneIds?: Array<string>
    handler?: (sceneId: string) => void
    saveHandler?: Function
    saveHandlerLoading?: boolean
}

export const ScenesModal: FC<PropTypes> = ({
    closeHandler, sceneIds, handler, saveHandler, saveHandlerLoading,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useScenesQuery({ projectId });
    const [ index, setIndexUseState ] = useState(0);

    if (loading || !data) {
        return null;
    }

    const findByIndex = () => {
        const scene = data.scenes.find((scene) => scene.number === index);

        if (scene) {
            return [ scene ];
        }

        return data.scenes;
    };

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        return data.scenes;
    };

    return (
        <Modal
            closeHandler = { closeHandler }
            spinner = { saveHandlerLoading }>
            <ModalHeader style = {{ backgroundColor: theme.scene.secondary }}>Scenes</ModalHeader>
            <Main>
                <ScenesTable
                    lightVersion
                    handler = { handler }
                    index = { index }
                    sceneIds = { sceneIds }
                    scenes = { filterHandler() }
                    setIndex = { (newIndex: number) => setIndexUseState(newIndex) }
                />
            </Main>
            <Footer>
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
