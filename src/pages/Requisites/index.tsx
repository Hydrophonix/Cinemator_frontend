// Core
import React, { FC, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';
import { ThemeContext } from 'styled-components';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';

// Redux
import { useReduxInputs } from '../../@init/redux/inputs';

// Components
import { ErrorBoundary, TableHead, DatePicker } from '../../components';

// Elements
import { Button } from '../../elements';

// Styles
import { TableStyles } from '../../assets';
import { RequisiteContainer, Header } from './styles';

// Types
type Params = {
    projectId: string
}

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useRequisitesQuery({ projectId });
    const { inputs: { requisitesDateRange }, setDateRange } = useReduxInputs();

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const requisiteRedirectHandler = (requisiteId: string) => void push(`/${projectId}/requisites/${requisiteId}`);
    const sceneRedirectHandler = (event: any, sceneId: string) => {
        event.stopPropagation();
        push(`/${projectId}/scenes/${sceneId}`);
    };

    return (
        <RequisiteContainer>
            <Header>
                <DatePicker
                    reset
                    endDay = { requisitesDateRange.endDay }
                    inputType = 'requisitesDateRange'
                    projectId = { projectId }
                    setDateRange = { setDateRange }
                    startDay = { requisitesDateRange.startDay }
                />
                <h2>Requisites</h2>
                <button onClick = { () => void push(`/${projectId}/create-requisite`) }>Add new requisite</button>
            </Header>
            <TableStyles>
                <Table>
                    <TableHead
                        className = 'requisitesTableHead'
                        ThNames = { [ '#', 'Title', 'Scenes' ] }
                    />
                    <Tbody>
                        {
                            data.requisites.map(({ id, title, scenes }) => (
                                <Tr
                                    className = 'requisitesTableRow'
                                    key = { id }
                                    onClick = { () => void requisiteRedirectHandler(id) }>
                                    <Td>{1}</Td>
                                    <Td>{title}</Td>
                                    <Td>
                                        {
                                            scenes.map((scene, index) => (
                                                <Button
                                                    key = { index }
                                                    style = {{
                                                        backgroundColor: theme.scene.secondary,
                                                        color:           '#fff',
                                                    }}
                                                    onClick = {
                                                        (event) => void sceneRedirectHandler(event, scene.id)
                                                    }>
                                                    S:{`${scene.sceneNumber}`}
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
        </RequisiteContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisites />
    </ErrorBoundary>
);
