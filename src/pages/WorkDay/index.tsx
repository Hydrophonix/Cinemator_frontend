// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, SceneTableItem, WorkdayScenesModal } from '../../components';

// Apollo hooks
import { useWorkdaysQuery, useDeleteWorkdayMutation } from '../../bus/Workday';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkdayContainer } from './styles';
import { TableStyles } from '../../assets';

// Constants
import { scenesThNames } from '../../@init/constants';

// Types
type Params = {
    projectId: string
    workdayId: string
}

const Workday: FC = () => {
    const { push, goBack } = useHistory();
    const { projectId, workdayId } = useParams<Params>();
    const [ isEdit, setIsEdit ] = useState(false);
    const { data, loading } = useWorkdaysQuery({ variables: { projectId }});
    const [ deleteWorkday ] = useDeleteWorkdayMutation(projectId, workdayId);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const workday = data.workdays.find((workday) => workday.id === workdayId);

    if (!workday) {
        return <div>No workday exist</div>;
    }

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    const deleteWorkdayHandler = async () => {
        const response = await deleteWorkday();

        if (response && response.data) {
            push(`/${projectId}/calendar`);
        }
    };

    const scenesIds = workday.scenes.map((scene) => scene.id);

    return (
        <WorkdayContainer>
            <Route path = { '/:projectId/calendar/:workdayId/add-scenes' }>
                <WorkdayScenesModal
                    closeHandler = { () => push(`/${projectId}/calendar/${workdayId}`) }
                    scenesIds = { scenesIds }
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
                        <TableHead ThNames = { scenesThNames }/>
                        <Tbody>
                            {
                                workday.scenes.map((scene) => (
                                    <SceneTableItem
                                        key = { scene.id }
                                        { ...scene }
                                        handler = { () => sceneRedirectHandler(scene.id) }
                                    />
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
