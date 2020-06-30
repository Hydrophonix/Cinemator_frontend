// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table,  Tbody } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, SceneTableItem } from '../../components';

// Apollo hooks
import { useWorkdayQuery, useDeleteWorkdayMutation  } from '../../bus/Workday';

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

const ScenesThNames = [ '#', 'Scene name', 'Location', 'Date', 'Requisite' ];

const Workday: FC = () => {
    const { push, goBack } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, workdayId } = useParams<Params>();

    const { data, loading } = useWorkdayQuery({ variables: { id: workdayId }});
    const [ deleteWorkday ] = useDeleteWorkdayMutation();

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const deleteWorkdayHandler = async () => {
        const response = await deleteWorkday({
            variables: {
                id: data.workday.id,
            },
        });

        if (response && response.data) {
            push(`/${projectId}/calendar`);
        }
    };

    return (
        <WorkdayContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{data.workday.date}</h2>
                <div>
                    <Button>Add new scenes</Button>
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
                        <TableHead ThNames = { ScenesThNames }/>
                        <Tbody>
                            {
                                data.workday.scenes.map((scene) => (
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
