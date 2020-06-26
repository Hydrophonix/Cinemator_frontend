// Core
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';

// Components
import { ErrorBoundary, TableHead, SceneTableItem } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { WorkdayContainer } from './styles';
import { TableStyles } from '../../assets';

// Types
type Params = {
    projectId?: string
    workDayDate?: string
}

type PropTypes = {}

const scenes = [
    {
        id:           '1',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  1,
        workdayIds:   [ '1wd' ],
    },
    {
        id:           '2',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  2,
        workdayIds:   [ '1wd' ],
    },
];

const ScenesThNames = [ '#', 'Scene name', 'Location', 'Date', 'Requisite' ];

const Workday: FC<PropTypes> = () => {
    const { push, goBack } = useHistory();
    const [ isEdit, setIsEdit ] = useState(false);
    const { projectId, workDayDate } = useParams<Params>();

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    return (
        <WorkdayContainer>
            <header>
                <Button onClick = { () => goBack() }>Back</Button>
                <h2>{workDayDate}</h2>
                <Button onClick = { () => setIsEdit(!isEdit) }>
                    {isEdit ? 'Save' : 'Edit'}
                </Button>
            </header>
            <main>


            </main>
            <TableStyles>
                <Table>
                    <TableHead ThNames = { ScenesThNames }/>
                    <Tbody>
                        {
                            scenes.map((scene) => (
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
        </WorkdayContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Workday />
    </ErrorBoundary>
);
