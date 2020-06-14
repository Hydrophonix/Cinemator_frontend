// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'; // TODO !!!

// Components
import { SceneItem } from '../../components';

// Styles
import { ScenesContainer } from './styles';

const scenesMock = [
    {
        id:           '1s',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  1,
        workdayIds:   [ '1wd' ],
    },
    {
        id:           '2s',
        sceneName:    'ZLP',
        requisiteIds: [ '1r' ],
        location:     'Kyiv',
        scenarioDay:  2,
        workdayIds:   [ '1wd' ],
    },
];

export const Scenes: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());

    const sceneRedirectHandler = (sceneId: string) => push(`/${projectId}/scenes/${sceneId}`);

    return (
        <ScenesContainer>
            <header>
                <section>
                    <DatePicker
                        selectsStart
                        endDate = { endDate }
                        selected = { startDate }
                        startDate = { startDate }
                        onChange = { (date) => date && setStartDate(date) }
                    />
                    <DatePicker
                        selectsEnd
                        endDate = { endDate }
                        minDate = { startDate }
                        selected = { endDate }
                        startDate = { startDate }
                        onChange = { (date) => date && setEndDate(date) }
                    />
                    <input
                        placeholder = 'Scene name'
                        type = 'text'
                    />
                    <input
                        type = 'number'
                    />
                    <input
                        placeholder = 'Scene location'
                        type = 'text'
                    />
                </section>

                <button>Add new scene</button>
            </header>
            <main>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Event</Th>
                            <Th>Date</Th>
                            <Th>Location</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Tablescon</Td>
                            <Td>9 April 2019</Td>
                            <Td>East Annex</Td>
                        </Tr>
                        <Tr>
                            <Td>Capstone Data</Td>
                            <Td>19 May 2019</Td>
                            <Td>205 Gorgas</Td>
                        </Tr>
                        <Tr>
                            <Td>Tuscaloosa D3</Td>
                            <Td>29 June 2019</Td>
                            <Td>Github</Td>
                        </Tr>
                    </Tbody>
                </Table>


                {/* {
                    scenesMock.map((scene) => (
                        <SceneItem
                            key = { scene.id }
                            { ...scene }
                            sceneRedirectHandler = { sceneRedirectHandler }
                            />
                            ))
                        } */}
            </main>
        </ScenesContainer>
    );
};
