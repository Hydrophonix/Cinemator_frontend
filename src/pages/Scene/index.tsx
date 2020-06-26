// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { SceneContainer } from './styles';

// Types
type Params = {
    projectId?: string
    sceneId?: string
}

type PropTypes = {
    sceneName?: string
}

const Scene: FC<PropTypes> = ({ sceneName }) => {
    const { goBack } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, sceneId } = useParams<Params>();

    return (
        <SceneContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{sceneName || 'TEST NAME'}</h2>
                <Button onClick = { () => setIsEdit(!isEdit) }>
                    {isEdit ? 'Save' : 'Edit'}
                </Button>
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
