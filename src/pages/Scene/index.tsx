// Core
import React, { useState, FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'; // TODO !!!

// Components
import { SceneItem } from './SceneItem';
import { ErrorBoundary } from '../../components';

// Styles
import { SceneContainer } from './styles';

type PropTypes = {
    props?: string
}

const Scene: FC<PropTypes> = ({ sceneName }) => {
    const { push } = useHistory();
    const a = useParams<{ projectId: string }>();
    console.log('a', a);

    return (
        <SceneContainer>
            <header>
                <button onClick = { () => push('/') }>Back</button>
                <h2>{sceneName}</h2>
            </header>

        </SceneContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Scene />
    </ErrorBoundary>
);
