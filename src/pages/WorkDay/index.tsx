// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import _ from 'lodash';

// Components
import { ErrorBoundary, TableHead, WorkdayScenesModal } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';
import { useScenesQuery } from '../../bus/Scene';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkdayContainer, WorkdayHeader } from './styles';
import { TableStyles } from '../../assets';

// Instrumnets
import { GREEN, ORANGE } from '../../assets/globalStyles';

// Types
type Params = {
    projectId: string
    workdayId: string
}

const Workday: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const { data, loading } = useWorkdaysQuery({ projectId });
    const { data: scenesData, loading: scenesLoading } = useScenesQuery({ projectId });
    const [ deleteWorkday ] = useDeleteWorkdayMutation({ projectId, workdayId });

    if (loading || !data || scenesLoading || !scenesData) {
        return <div>Loading...</div>;
    }

    const workday = data.workdays.find((workday) => workday.id === workdayId);

    if (!workday) {
        return <div>No workday exist</div>;
    }

    const sceneIds = workday.scenes.map((scene) => scene.id);
    const workdayScenes = _.intersectionWith(
        scenesData.scenes, sceneIds, (value, other) => value.id === other,
    );

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);
    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };
    const requisiteRedirectHandler = (event: any, requisiteId: string) => {
        event.stopPropagation();
        push(`/${projectId}/requisites/${requisiteId}`);
    };

    const deleteWorkdayHandler = async () => {
        const response = await deleteWorkday();
        response && response.data && void push(`/${projectId}/calendar`);
    };

    return (
        <WorkdayContainer>
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <WorkdayScenesModal
                    closeHandler = { () => void push(`/${projectId}/calendar/${workdayId}`) }
                    sceneIds = { sceneIds }
                />
            </Route>
            <WorkdayHeader>
                <div>
                    <Button onClick = { () => void push(`/${projectId}/calendar`) }>To calendar</Button>
                    <Button onClick = { goBack }>Go back</Button>
                </div>
                <h2>Workday: {workday.date}</h2>
                <div>
                    <Button onClick = { () => void push(
                        `/${projectId}/calendar/${workdayId}/add-scenes`,
                    ) }>
                        Add scene
                    </Button>
                    <Button onClick = { () => void push(`/${projectId}/update-workday/${workdayId}`) }>
                        Update
                    </Button>
                    <Button onClick = { deleteWorkdayHandler }>Delete</Button>
                </div>
            </WorkdayHeader>
            {
                <TableStyles>
                    <Table>
                        <TableHead
                            className = 'scenesTableHead'
                            ThNames = { [ '#', 'Location', 'Workdays', 'Requisites' ] }
                        />
                        <Tbody>
                            {
                                workdayScenes.map(({ id, sceneNumber, location, workdays, requisites }) => (
                                    <Tr
                                        className = 'scenesTableRow'
                                        key = { id }
                                        onClick = { () => void sceneRedirectHandler(id) }>
                                        <Td>{`${sceneNumber}`}</Td>
                                        <Td>{location}</Td>
                                        <Td>
                                            {
                                                workdays.map((mappedWorkday, index) => {
                                                    if (workday.date === mappedWorkday.date) {
                                                        return null;
                                                    }

                                                    return (
                                                        <Button
                                                            key = { index }
                                                            style = {{
                                                                backgroundColor: GREEN.main,
                                                                color:           '#fff',
                                                            }}
                                                            onClick = { (event) => void workdayRedirectHandler(
                                                                event, mappedWorkday.id,
                                                            ) }>
                                                            {mappedWorkday.date}
                                                        </Button>
                                                    );
                                                })
                                            }
                                        </Td>
                                        <Td>
                                            {
                                                requisites.map((requisite, index) => (
                                                    <Button
                                                        key = { index }
                                                        style = {{
                                                            backgroundColor: ORANGE.secondary,
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
                    </Table>
                </TableStyles>
            }
        </WorkdayContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
