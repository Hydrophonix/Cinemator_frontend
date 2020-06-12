// Core
import React, { FC } from 'react';

// Components
import { ErrorBoundary } from '../../components';

// Assets
import { MainContainer, Cell } from './styles';

const Home: FC = () => {
    return (
        <MainContainer>
            <p>KEK MAIN</p>
        </MainContainer>
    );
};

export default () => (
    <ErrorBoundary>
        <Home />
    </ErrorBoundary>
);
