// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Tbody } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, SceneTableItem, AddScenesModal } from '../../components';

// Apollo hooks
import { useDeleteWorkdayMutation, useWorkdaysQuery  } from '../../bus/Workday';

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
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, workdayId } = useParams<Params>();

    const { data, loading } = useWorkdaysQuery({ variables: { projectId }});
    const [ deleteWorkday ] = useDeleteWorkdayMutation();

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const workday = data.workdays.find((workday) => workday.id === workdayId);

    if (!workday) {
        return <div>No workday exist</div>;
    }

    const deleteWorkdayHandler = async () => {
        const response = await deleteWorkday({ variables: { id: workday.id }});

        if (response && response.data) {
            push(`/${projectId}/calendar`);
        }
    };

    return (
        <WorkdayContainer>
            <AddScenesModal />
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{workday.date}</h2>
                <div>
                    <Button>Add scene</Button>
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
                                        sceneRedirectHandler = { sceneRedirectHandler }
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
