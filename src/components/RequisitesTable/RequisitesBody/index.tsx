// Core
import React, { FC, useContext } from 'react';
import { Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

// Elements
import { Button } from '../../../elements';

// Types
import { Requisites_requisites } from '../../../bus/Requisite';

type Proptypes = {
    requisites: Requisites_requisites[]
    sceneId?: string
    lightVersion?: {
        requisitesIdsArray: Array<string>
        setRequisitesIdsArray: (sceneId: string) => void
    }
}

type Params = {
    projectId: string
};

export const RequisitesBody: FC<Proptypes> = ({ requisites, sceneId, lightVersion }) => {
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
                    <Tr
                        className = 'requisitesTableRow'
                        key = { requisite.id }
                        style = {
                            lightVersion?.requisitesIdsArray.includes(requisite.id)
                                ? { backgroundColor: 'green' } : {}
                        }
                        onClick = { () => {
                            lightVersion
                                ? lightVersion.setRequisitesIdsArray(requisite.id)
                                : requisiteRedirectHandler(requisite.id);
                        } }>
                        <Td>
                            <div style = {{ width: 35, textAlign: 'center' }}>
                                {requisite.number}
                            </div>
                        </Td>
                        <Td>{requisite.title}</Td>
                        {
                            !lightVersion && (
                                <Td>
                                    {
                                        requisite.scenes.map((scene, index) => {
                                            if (sceneId && scene.id === sceneId) {
                                                return null;
                                            }

                                            return (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: theme.scene.secondary,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = { (event) => void sceneRedirectHandler(
                                                        event, scene.id,
                                                    ) }>
                                                    S:{`${scene.number}`}
                                                </Button>
                                            );
                                        })
                                    }
                                </Td>
                            )
                        }
                    </Tr>
                ))
            }
        </Tbody>
    );
};
