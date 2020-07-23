// Core
import React, { FC, useContext } from 'react';
import { Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button } from '../../../elements';

// Types
import { Workdays_workdays } from '../../../bus/Workday';

type Proptypes = {
    workdays: Workdays_workdays[]
    workdayIds?: Array<string>
    handler?: (workdayId: string) => void
}

type Params = {
    projectId: string
};

export const WorkdaysBody: FC<Proptypes> = ({ workdays, workdayIds, handler }) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);

    const workdayRedirectHandler = (workdayId: string) => void push(`/${projectId}/calendar/${workdayId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <Tbody>
            {
                workdays.map((workday) => (
                    <Tr
                        className = 'workdaysTableRow'
                        key = { workday.id }
                        onClick = { () => handler
                            ? void handler(workday.id)
                            : void workdayRedirectHandler(workday.id)
                        }>
                        <Td style = {{ fontSize: 20, textAlign: 'center', position: 'relative' }}>
                            {
                                workdayIds?.includes(workday.id) && (
                                    <FontAwesomeIcon
                                        color = '#fff'
                                        icon = 'check-circle'
                                        style = {{ width: 16, height: 16, position: 'absolute', top: 8, left: 20 }}
                                    />
                                )
                            }
                            {workday.date}
                        </Td>
                        <Td>
                            {
                                workday.scenes.map((scene, index) => {
                                    return (
                                        <Button
                                            key = { index }
                                            style = {{ backgroundColor: theme.scene.secondary, color: '#fff' }}
                                            onClick = { (event) => void sceneRedirectHandler(event, scene.id) }>
                                            {`S:${scene.number}`}
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
