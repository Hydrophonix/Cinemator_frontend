// Core
import React, { FC, useContext } from 'react';
import { Thead, Tr, Th } from 'react-super-responsive-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

export const RequisitesHead: FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <Thead>
            <Tr className = 'requisitesTableHead'>
                <Th>
                    <nav>
                        <input
                            type = 'number'
                        />
                        {/* {
                            index !== 0 && (
                                <span onClick = { resetIndex }>
                                    <FontAwesomeIcon
                                        color = { theme.requisite.hoverSecondary }
                                        icon = 'times-circle'
                                    />
                                </span>
                            )
                        } */}
                    </nav>
                </Th>
                <Th>Title</Th>
                <Th>Scenes</Th>
            </Tr>
        </Thead>
    );
};
