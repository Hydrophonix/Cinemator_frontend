// Core
import React, { FC, useEffect, useContext, useRef } from 'react';
import { useHistory, useParams, Route, Switch } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { ScenesModal, ReqTypesModal } from '../../containers';

// Components
import { ErrorBoundary } from '../../components';

// Apollo
import {
    useRequisitesQuery,
    useUpdateRequisiteScenesMutation,
    useUpdateRequisiteReqTypesMutation,
} from '../../bus/Requisite';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useArrayOfStringsForm } from '../../hooks';

// Elements
import { Button, Spinner, AdaptiveScroll } from '../../elements';

// Styles
import { Container, Header, Info, Relations } from './styles';

// Types
type Params = {
    projectId: string
    requisiteId: string
}

const Requisite: FC = () => {
    const { push } = useHistory();
    const { projectId, requisiteId } = useParams<Params>();
    const headerRef = useRef<HTMLElement>(null);
    const theme = useContext(ThemeContext);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const { data } = useRequisitesQuery({ projectId });
    const [ updateRequisiteScenes, { loading: updateRequisiteScenesLoading }] = useUpdateRequisiteScenesMutation();
    const [ updateRequisiteReqTypes, { loading: updateRequisiteReqTypesLoading }] = useUpdateRequisiteReqTypesMutation(); // eslint-disable-line max-len

    const [ sceneIds, setSceneIds, setInitialSceneIds ] = useArrayOfStringsForm([]);
    const [ reqTypeIds, setReqTypeIdsArray, setInitialReqTypeIds ] = useArrayOfStringsForm([]);

    const requisite = data?.requisites.find((requisite) => requisite.id === requisiteId);
    const sceneIdsArray = requisite?.scenes.map((scene) => scene.id);

    useEffect(() => {
        sceneIdsArray && void setInitialSceneIds(sceneIdsArray);
        requisite && void setInitialReqTypeIds(requisite.reqTypes.map((reqType) => reqType.id));
    }, [ requisite ]);

    if (!data) {
        return <Spinner />;
    }

    if (!requisite) {
        push(`/${projectId}/requisites`);

        return null;
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

    return (
        <Container>
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
            <Header ref = { headerRef }>
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
                        disabled = { !isOnline }
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
                        disabled = { !isOnline }
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
                        disabled = { !isOnline }
                        title = 'Settings'
                        onClick = { () => void push(`/${projectId}/update-requisite/${requisiteId}`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 16, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            <AdaptiveScroll refs = { [ headerRef ] }>
                <Info>
                    <div><p>{requisite.title}</p></div>
                    {requisite.description && <div><span>{requisite.description}</span></div>}
                </Info>
                <Relations>
                    {
                        requisite.reqTypes.length !== 0 && (
                            <section style = {{ backgroundColor: theme.requisite.hoverSecondary }}>
                                {
                                    requisite.reqTypes.map((reqTypes) => (
                                        <Button
                                            key = { reqTypes.id }
                                            style = {{ backgroundColor: theme.requisite.primary, color: '#fff' }}>
                                            {reqTypes.name}
                                        </Button>
                                    ))
                                }
                            </section>
                        )
                    }
                    {
                        requisite.scenes.length !== 0 && (
                            <section style = {{ backgroundColor: theme.scene.hoverSecondary }}>
                                {
                                    requisite.scenes.map((scene) => (
                                        <Button
                                            key = { scene.id }
                                            style = {{ backgroundColor: theme.scene.secondary, color: '#fff' }}
                                            onClick = { () => void sceneRedirectHandler(scene.id) }>
                                            S:{scene.number}
                                            {
                                                scene.isCompleted && (
                                                    <>
                                                        :
                                                        <FontAwesomeIcon
                                                            color = '#fff'
                                                            icon = 'check'
                                                            style = {{ width: 13, height: 13 }}
                                                        />
                                                    </>
                                                )
                                            }
                                        </Button>
                                    ))
                                }
                            </section>
                        )
                    }
                </Relations>
            </AdaptiveScroll>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisite />
    </ErrorBoundary>
);
