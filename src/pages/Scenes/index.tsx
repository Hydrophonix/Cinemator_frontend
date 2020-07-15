// Core
import React, { FC, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';

// Apollo Hooks
import { useScenesQuery } from '../../bus/Scene';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, TableHead, DatePicker } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { ScenesContainer, Header } from './styles';

// Types
type Params = { projectId: string };

const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useScenesQuery({ projectId });
    const { inputs: { scenesDateRange }, setDateRange } = useReduxInputs();

    const sceneRedirectHandler = (sceneId: string) => void push(`/${projectId}/scenes/${sceneId}`);
    const workdayRedirectHandler = (event: any, workdayId: string) => {
        event.stopPropagation();
        push(`/${projectId}/calendar/${workdayId}`);
    };
    const requisiteRedirectHandler = (event: any, requisiteId: string) => {
        event.stopPropagation();
        push(`/${projectId}/requisites/${requisiteId}`);
    };

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    return (
        <ScenesContainer>
            <Header>
                <DatePicker
                    endDay = { scenesDateRange.endDay }
                    inputType = 'scenesDateRange'
                    projectId = { projectId }
                    setDateRange = { setDateRange }
                    startDay = { scenesDateRange.startDay }
                />
                <h2>Scenes</h2>
                <Button onClick = { () => void push(`/${projectId}/create-scene`) }>Add new scene</Button>
            </Header>
            <TableStyles>
                <Table>
                    <TableHead
                        className = 'scenesTableHead'
                        ThNames = { [ '#', 'Location', 'Workdays', 'Requisites' ] }
                    />
                    <Tbody>
                        {
                            data.scenes.map((scene) => (
                                <Tr
                                    className = 'scenesTableRow'
                                    key = { scene.id }
                                    onClick = { () => void sceneRedirectHandler(scene.id) }>
                                    <Td>{`${scene.sceneNumber}`}</Td>
                                    <Td>{scene.location}</Td>
                                    <Td>
                                        {
                                            scene.workdays.map((workday, index) => (
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
                                            ))
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
                </Table>
            </TableStyles>
        </ScenesContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scenes />
    </ErrorBoundary>
);
