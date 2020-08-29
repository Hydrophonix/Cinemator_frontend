// Core
import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button } from '../../../elements';

// Styles
import { Tbody } from '../styles';

// Types
import { Requisites_requisites } from '../../../bus/Requisite';

type Proptypes = {
    requisites: Requisites_requisites[]
    sceneId?: string
    lightVersion?: true
    requisiteIds?: Array<string>
    handler?: (requisiteId: string) => void
}

type Params = {
    projectId: string
};

export const RequisitesBody: FC<Proptypes> = ({ requisites, sceneId, lightVersion, requisiteIds, handler }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);

    const requisiteRedirectHandler = (requisiteId: string) => void push(`/${projectId}/requisites/${requisiteId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <Tbody>
            {
                requisites.map((requisite) => (
                    <tr
                        key = { requisite.id }
                        style = { requisiteIds?.includes(requisite.id) ? { backgroundColor: 'green' } : {} }
                        onClick = { () => {
                            handler
                                ? void handler(requisite.id)
                                : void requisiteRedirectHandler(requisite.id);
                        } }>
                        <td style = {{ width: 40, textAlign: 'center', fontSize: 18 }}>
                            {requisite.number}
                        </td>
                        {
                            !lightVersion && (
                                <td>
                                    {
                                        requisite.reqTypes.map((reqType) => (
                                            <Button
                                                key = { reqType.id }
                                                style = {{ backgroundColor: theme.requisite.primary, color: '#fff' }}>
                                                {reqType.name}
                                            </Button>
                                        ))
                                    }
                                </td>
                            )
                        }
                        <td>{requisite.title}</td>
                        {
                            !lightVersion && (
                                <td>
                                    {
                                        requisite.scenes.map((scene) => {
                                            if (sceneId && scene.id === sceneId) {
                                                return null;
                                            }

                                            return (
                                                <Button
                                                    key = { scene.id }
                                                    style = {{ backgroundColor: theme.scene.secondary, color: '#fff' }}
                                                    onClick = {
                                                        (event) => void sceneRedirectHandler(event, scene.id)
                                                    }>
                                                    S:{`${scene.number}`}
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
                                            );
                                        })
                                    }
                                </td>
                            )
                        }
                    </tr>
                ))
            }
        </Tbody>
    );
};
