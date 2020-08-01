// Core
import React, { FC, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button } from '../../../elements';

// Styles
import { Tbody } from '../styles';
import { IndexContainer } from './styles';

// Types
import { Scenes_scenes } from '../../../bus/Scene';

type Proptypes = {
    scenes: Scenes_scenes[]
    workdayId?: string
    lightVersion?: boolean
    sceneIds?: Array<string>
    handler?: (sceneId: string) => void
}

type Params = {
    projectId: string
};

export const ScenesBody: FC<Proptypes> = ({
    scenes, workdayId, lightVersion, sceneIds, handler,
}) => {
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
                    <tr
                        key = { scene.id }
                        style = { sceneIds?.includes(scene.id) ? { backgroundColor: 'green' } : {} }
                        onClick = { () => { handler ? void handler(scene.id) : void sceneRedirectHandler(scene.id); } }>
                        <td>
                            <IndexContainer>
                                <span>{`${scene.number}`}</span>
                                {
                                    scene.isCompleted && (
                                        <>
                                            :
                                            <FontAwesomeIcon
                                                color = '#fff'
                                                icon = 'check'
                                                style = {{ width: 14, height: 14 }}
                                            />
                                        </>
                                    )
                                }
                            </IndexContainer>
                        </td>
                        <td>
                            {
                                scene.locations.map((location) => {
                                    return (
                                        <Button
                                            key = { location.id }
                                            style = {{ backgroundColor: theme.scene.locationPrimary, color: '#fff' }}>
                                            {location.name}
                                        </Button>
                                    );
                                })
                            }
                        </td>
                        {
                            !lightVersion && (
                                <>
                                    <td>
                                        {
                                            scene.workdays.map((workday) => {
                                                if (workdayId && workday.id === workdayId) {
                                                    return null;
                                                }

                                                return (
                                                    <Button
                                                        key = { workday.id }
                                                        style = {{
                                                            backgroundColor: theme.workday.anotherSecondary,
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
                                    </td>
                                    <td>
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
                                    </td>
                                </>
                            )
                        }
                    </tr>
                ))
            }
        </Tbody>
    );
};
