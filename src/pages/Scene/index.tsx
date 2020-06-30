// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import { useSceneQuery, useDeleteSceneMutation } from '../../bus/Scene';

// Elements
import { Button } from '../../elements';

// Styles
import { SceneContainer } from './styles';

// Types
type Params = {
    projectId: string
    sceneId: string
}

type PropTypes = {
    sceneName?: string
}

const Scene: FC<PropTypes> = ({ sceneName }) => {
    const { goBack, push } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, sceneId } = useParams<Params>();

    const { data, loading } = useSceneQuery({ variables: { id: sceneId }});
    const [ deleteScene ] = useDeleteSceneMutation();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const deleteSceneHandler = async () => {
        const response = await deleteScene({ variables: { input: data.scene.id }});

        if (response && response.data) {
            push(`/${projectId}/scenes`);
        }
    };

    return (
        <SceneContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{sceneName || 'TEST NAME'}</h2>
                <div>
                    <Button onClick = { () => setIsEdit(!isEdit) }>
                        {isEdit ? 'Save' : 'Edit'}
                    </Button>
                    <Button onClick = { deleteSceneHandler }>
                        Delete
                    </Button>
                </div>
            </header>
            <main>
                Some scene data
            </main>
        </SceneContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scene />
    </ErrorBoundary>
);
