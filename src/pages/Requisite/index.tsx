// Core
import React, { FC, useEffect, useContext } from 'react';
import { useHistory, useParams, Route, Switch } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ScenesModal, ReqTypesModal } from '../../containers';

// Components
import { ErrorBoundary } from '../../components';

// Apollo hooks
import {
    useRequisitesQuery,
    useDeleteRequisiteMutation,
    useUpdateRequisiteScenesMutation,
    useUpdateRequisiteReqTypesMutation,
} from '../../bus/Requisite';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { Button, Spinner } from '../../elements';

// Styles
import { RequisiteContainer, RequisiteHeader, ScenesContainer, Section, ReqTypesContainer } from './styles';

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
    const [ updateRequisiteScenes, { loading: updateRequisiteScenesLoading }] = useUpdateRequisiteScenesMutation();
    const [ updateRequisiteReqTypes, { loading: updateRequisiteReqTypesLoading }] = useUpdateRequisiteReqTypesMutation(); // eslint-disable-line max-len
    const [ deleteRequisite, { loading: deleteRequisiteLoading }] = useDeleteRequisiteMutation({
        projectId, requisiteId,
    });
    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);
    const [ reqTypeIds, setReqTypeIdsArray, setInitialReqTypeIds ] = useArrayOfStringsForm([]);

    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);
    const sceneIdsArray = requisite?.scenes.map((scene) => scene.id);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
        requisite && void setInitialReqTypeIds(requisite.reqTypes.map((reqType) => reqType.id));
    }, [ requisite ]);

    if (loading || !data) {
        return <Spinner />;
    }

    if (!requisite) {
        return <div>No requisite exist</div>; // TODO: MAKE FALLBACK COMPONENT WITH REDIRECT
    }

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);

    const updateRequisiteScenesHandler = async () => {
        const response = await updateRequisiteScenes({ variables: { requisiteId, sceneIds }});
        response && response.data && void push(`/${projectId}/requisites/${requisiteId}`);
    };

    const updateRequisiteReqTypesHandler = async () => {
        const response = await updateRequisiteReqTypes({ variables: { requisiteId, reqTypeIds }});
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
            {deleteRequisiteLoading && <Spinner absolute />}
            <Switch>
                <Route path = { '/:projectId/requisites/:requisiteId/add-scenes' }>
                    <ScenesModal
                        closeHandler = { () => {
                            sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
                            push(`/${projectId}/requisites/${requisiteId}`);
                        } }
                        handler = { (sceneId: string) => void setSceneIds(sceneId) }
                        saveHandler = { updateRequisiteScenesHandler }
                        saveHandlerLoading = { updateRequisiteScenesLoading }
                        sceneIds = { sceneIds }
                    />
                </Route>
                <Route path = { '/:projectId/requisites/:requisiteId/types' }>
                    <ReqTypesModal
                        closeHandler = { () => void push(`/${projectId}/requisites/${requisiteId}`) }
                        handler = { setReqTypeIdsArray }
                        reqTypeIds = { reqTypeIds }
                        saveHandler = { updateRequisiteReqTypesHandler }
                        saveHandlerLoading = { updateRequisiteReqTypesLoading }
                    />
                </Route>
            </Switch>
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
                        title = 'Add types'
                        onClick = { () => void push(`/${projectId}/requisites/${requisiteId}/types`) }>
                        <div style = {{ display: 'flex', alignItems: 'center' }}>
                            <span style = {{ fontSize: 16 }}>T:</span>
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
                    requisite.reqTypes.length !== 0 && (
                        <ReqTypesContainer>
                            {
                                requisite.reqTypes.map((reqTypes) => (
                                    <Button
                                        key = { reqTypes.id }
                                        style = {{ backgroundColor: theme.requisite.primary, color: '#fff' }}>
                                        {reqTypes.name}
                                    </Button>
                                ))
                            }
                        </ReqTypesContainer>
                    )
                }
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
