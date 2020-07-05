// Core
import React, { FC, useState } from 'react';
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
import { WorkdayContainer } from './styles';
import { TableStyles } from '../../assets';

// Types
type Params = {
    projectId: string
    workdayId: string
}

const Workday: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const [ isEdit, setIsEdit ] = useState(false);
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
        scenesData.scenes, workday.scenes, (value, other) => value.id === other.id,
    );

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);
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

        if (response && response.data) {
            push(`/${projectId}/calendar`);
        }
    };

    return (
        <WorkdayContainer>
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <WorkdayScenesModal
                    closeHandler = { () => push(`/${projectId}/calendar/${workdayId}`) }
                    sceneIds = { sceneIds }
                />
            </Route>
            <header>
                <div>
                    <Button onClick = { () => push(`/${projectId}/calendar`) }>To calendar</Button>
                    <Button onClick = { () => goBack() }>Go back</Button>
                </div>
                <h2>{workday.date}</h2>
                <div>
                    <Button onClick = { () => push(`/${projectId}/calendar/${workdayId}/add-scenes`) }>Add scene</Button>
                    <Button onClick = { () => setIsEdit(!isEdit) }>
                        {isEdit ? 'Save' : 'Edit'}
                    </Button>
                    <Button onClick = { deleteWorkdayHandler }>Delete</Button>
                </div>
            </header>
            <main>
                {/* content */}
            </main>
            {
                <TableStyles>
                    <Table>
                        <TableHead ThNames = { [ '#', 'Location', 'Workdays', 'Requisites' ] }/>
                        <Tbody>
                            {
                                workdayScenes.map(({ id, sceneNumber, location, workdays, requisites }) => (
                                    <Tr
                                        key = { id }
                                        onClick = { () => sceneRedirectHandler(id) }>
                                        <Td>{`${sceneNumber}`}</Td>
                                        <Td>{location}</Td>
                                        <Td>
                                            {
                                                workdays.map((workday, index) => (
                                                    <div
                                                        key = { index }
                                                        onClick = { (event) => workdayRedirectHandler(
                                                            event, workday.id,
                                                        ) }>
                                                        {workday.date}
                                                    </div>
                                                ))
                                            }
                                        </Td>
                                        <Td>
                                            {
                                                requisites.map((requisite, index) => (
                                                    <div
                                                        key = { index }
                                                        onClick = { (event) => requisiteRedirectHandler(
                                                            event, requisite.id,
                                                        ) }>
                                                        {`#:${index}`}
                                                    </div>
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
