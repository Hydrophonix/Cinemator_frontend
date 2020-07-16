// Core
import React, { FC, useContext } from 'react';
import { Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

// Elements
import { Button } from '../../../elements';

// Types
import { Scenes_scenes } from '../../../bus/Scene';

type Proptypes = {
    scenes: Scenes_scenes[]
    workdayId?: string
}

type Params = {
    projectId: string
};

export const ScenesBody: FC<Proptypes> = ({ scenes, workdayId }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);
    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };
    const requisiteRedirectHandler = (event: any, requisiteId: string) => {
        event.stopPropagation();
        push(`/${projectId}/requisites/${requisiteId}`);
    };

    return (
        <Tbody>
            {
                scenes.map((scene) => (
                    <Tr
                        className = 'scenesTableRow'
                        key = { scene.id }
                        onClick = { () => void sceneRedirectHandler(scene.id) }>
                        <Td>
                            <div style = {{ width: 35, textAlign: 'center' }}>
                                {`${scene.sceneNumber}`}
                            </div>
                        </Td>
                        <Td>{scene.location}</Td>
                        <Td>
                            {
                                scene.workdays.map((workday, index) => {
                                    if (workdayId && workday.id === workdayId) {
                                        return null;
                                    }

                                    return (
                                        <Button
                                            key = { index }
                                            style = {{
                                                backgroundColor: theme.workday.primary,
                                                color:           '#fff',
                                            }}
                                            onClick = { (event) => void workdayRedirectHandler(
                                                event, workday.id,
                                            ) }>
                                            {workday.date}
                                        </Button>
                                    );
                                })
                            }
                        </Td>
                        <Td>
                            {
                                scene.requisites.map((requisite, index) => (
                                    <Button
                                        key = { index }
                                        style = {{
                                            backgroundColor: theme.requisite.secondary,
                                            color:           '#fff',
                                        }}
                                        onClick = { (event) => void requisiteRedirectHandler(
                                            event, requisite.id,
                                        ) }>
                                        {requisite.title}
                                    </Button>
                                ))
                            }
                        </Td>
                    </Tr>
                ))
            }
        </Tbody>
    );
};