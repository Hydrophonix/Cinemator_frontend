
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, ScenesTable } from '..';

// Apollo hooks
import { useScenesQuery } from '../../bus/Scene';
import { useUpdateWorkdayScenesMutation } from '../../bus/Workday';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

// Types
type Params = {
    projectId: string
    workdayId: string
}

type PropTypes = {
    closeHandler: () => void
    sceneIds: Array<string>
}

export const WorkdayScenesModal: FC<PropTypes> = ({ closeHandler, sceneIds: scenesIds }) => {
    const { projectId, workdayId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useScenesQuery({ projectId });
    const [ updateWorkdayScenes ] = useUpdateWorkdayScenesMutation({ projectId });
    const [ scenesIdsArray, setScenesIdsArray ] = useArrayOfStringsForm(scenesIds);
    const [ index, setIndexUseState ] = useState(0);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const addScenesToWorkdayHandler = async () => {
        const response = await updateWorkdayScenes({ variables: { workdayId, sceneIds: scenesIdsArray }});
        response && response.data && void closeHandler();
    };

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
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.scene.secondary }}>Add scenes</ModalHeader>
            <Main>
                <ScenesTable
                    index = { index }
                    lightVersion = {{
                        scenesIdsArray,
                        setScenesIdsArray,
                    }}
                    scenes = { filterHandler() }
                    setIndex = { (newIndex: number) => setIndexUseState(newIndex) }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.scene.primary }}>
                <Button onClick = { addScenesToWorkdayHandler }>Save</Button>
            </Footer>
        </Modal>
    );
};
