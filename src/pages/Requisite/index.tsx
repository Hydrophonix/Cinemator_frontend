// Core
import React, { FC } from 'react';
// import { Link } from 'react-router-dom';

// Components
import { ErrorBoundary } from '../../components';

// Types
// import { ThemesKeys } from '../../theme';

// Images

// Styles
import { RequisiteContainer } from './styles';

// type PropTypes = {
//     themeName: ThemesKeys;
//     setThemeName: (value: ThemesKeys) => void;
// };

const Requisite: FC = () => {
    return (
        <RequisiteContainer>
            RequisiteContainer
        </RequisiteContainer>
    );
};


export default () => (
    <ErrorBoundary>
        <Requisite />
    </ErrorBoundary>
);
