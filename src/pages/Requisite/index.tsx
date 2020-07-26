// Core
import React, { FC, useEffect, useContext } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ErrorBoundary, ScenesModal } from '../../components';

// Apollo hooks
import { useRequisitesQuery, useDeleteRequisiteMutation, useUpdateRequisiteScenesMutation } from '../../bus/Requisite';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { Button } from '../../elements';

// Styles
import { RequisiteContainer, RequisiteHeader, ScenesContainer, Section } from './styles';

// Types
type Params = {
    projectId: string
    requisiteId: string
}

const Requisite: FC = () => {
    const { push } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const [ updateRequisite ] = useUpdateRequisiteScenesMutation();
    const [ deleteRequisite ] = useDeleteRequisiteMutation({ projectId, requisiteId });
    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);

    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);
    const sceneIdsArray = requisite?.scenes.map((scene) => scene.id);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
    }, [ requisite ]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    if (!requisite) {
        return <div>No requisite exist</div>;
    }

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);

    const updateRequisiteScenesHandler = async () => {
        const response = await updateRequisite({ variables: { requisiteId, sceneIds }});
        response && response.data && void push(`/${projectId}/requisites/${requisiteId}`);
    };

    const deleteRequisiteHandler = async () => {
        const isContinue = window.confirm(`Confirm delete requisite: ${requisite.number}`); // eslint-disable-line no-alert

        if (!isContinue) {
            return;
        }

        const response = await deleteRequisite();
        response && response.data && void push(`/${projectId}/requisites`);
    };

    return (
        <RequisiteContainer>
            <Route path = { '/:projectId/requisites/:requisiteId/add-scenes' }>
                <ScenesModal
                    closeHandler = { () => {
                        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
                        push(`/${projectId}/requisites/${requisiteId}`);
                    } }
                    handler = { (sceneId: string) => void setSceneIds(sceneId) }
                    saveHandler = { updateRequisiteScenesHandler }
                    sceneIds = { sceneIds }
                />
            </Route>
            <RequisiteHeader>
                <nav>
                    <Button
                        style = {{ width: 55 }}
                        title = 'Back to requisites'
                        onClick = { () => void push(`/${projectId}/requisites`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'reply'
                            style = {{ width: 16, height: 16, marginRight: 5 }}
                        />
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'utensils'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
                <h2>R: {requisite.number}</h2>
                <nav>
                    <Button
                        title = 'Add scenes'
                        onClick = { () => void push(`/${projectId}/requisites/${requisiteId}/add-scenes`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>S:</span>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'plus'
                                style = {{ width: 16, height: 16 }}
                            />
                        </div>
                    </Button>
                    <Button
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-requisite/${requisiteId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                    <Button
                        title = 'Delete'
                        onClick = { deleteRequisiteHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
            </RequisiteHeader>
            <Section>
                <div><p>{requisite.title}</p></div>
                {requisite.description && <div><p>{requisite.description}</p></div>}
            </Section>
            <main>
                {
                    requisite.scenes.length !== 0 && (
                        <ScenesContainer>
                            {
                                requisite.scenes.map((scene) => (
                                    <Button
                                        key = { scene.id }
                                        style = {{ backgroundColor: theme.scene.secondary, color: '#fff' }}
                                        onClick = { () => void sceneRedirectHandler(scene.id) }>
                                        S:{scene.number}
                                    </Button>
                                ))
                            }
                        </ScenesContainer>
                    )
                }
            </main>
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisite />
    </ErrorBoundary>
);
