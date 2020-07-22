// Core
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams, Route } from 'react-router-dom';

// Components
import { ErrorBoundary, LocationsModal } from '../../components';

// Elements
import { Button, Input } from '../../elements';

// Hooks
import { useForm, useArrayOfStringsForm } from '../../hooks';
import { useCreateSceneMutation } from '../../bus/Scene';

// Styles
import { CreateSceneContainer, Header } from './styles';

// Types
import { SceneCreateInput } from '../../@types/graphql-global-types';

export type Params = {
    projectId: string
}

const innitialForm = {
    location:    'TEST LOCATION',
    number:      0,
    description: '',
};

const CreateScene: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const [ createScene ] = useCreateSceneMutation({ projectId });
    const [ form, setForm ] = useForm<SceneCreateInput>(innitialForm);
    const [ locationIdsArray, setLocationIdsArray ] = useArrayOfStringsForm([]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const response = await createScene({ variables: { input: form, projectId }});
        response && response.data && void push(`/${projectId}/scenes`);
    };

    const locationsPicker = () => {
        console.log(locationIdsArray); // TODO: finish logic
        push(`/${projectId}/create-scene`);
    };

    return (
        <CreateSceneContainer>
            <Route path = { '/:projectId/create-scene/locations' }>
                <LocationsModal
                    closeHandler = { () => void push(`/${projectId}/create-scene`) }
                    locationIdsArray = { locationIdsArray }
                    saveHandler = { locationsPicker }
                    setLocationIdsArray = { setLocationIdsArray }
                />
            </Route>
            <Header>
                <div>
                    <Button onClick = { () => push(`/${projectId}/scenes`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </div>
                <h2>Create scene</h2>
            </Header>
            <main>
                <h2>Scene number:</h2>
                <Input
                    name = 'number'
                    type = 'number'
                    value = { form.number }
                    onChange = { (event) => setForm(event, true) }
                />
                <h2>Scene location:</h2>
                <Button
                    style = {{ width: 200, fontSize: 20 }}
                    onClick = { () => push(`/${projectId}/create-scene/locations`) }>
                    {form.location || 'Choose Location'}
                </Button>
                <h2>Scene description:</h2>
                <textarea
                    name = 'description'
                    placeholder = 'Description'
                    value = { form.description || '' }
                    onChange = { setForm }
                />
                <Button onClick = { onSubmit }>Submit</Button>
            </main>
        </CreateSceneContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <CreateScene />
    </ErrorBoundary>
);
