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
}

type Params = {
    projectId: string
};

export const RequisitesBody: FC<Proptypes> = ({ requisites, sceneId }) => {
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
                        onClick = { () => void requisiteRedirectHandler(requisite.id) }>
                        <Td>
                            <div style = {{ width: 35, textAlign: 'center' }}>
                                {1}
                            </div>
                        </Td>
                        <Td>{requisite.title}</Td>
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
                                            S:{`${scene.sceneNumber}`}
                                        </Button>
                                    );
                                })
                            }
                        </Td>
                    </Tr>
                ))
            }
        </Tbody>
    );
};
