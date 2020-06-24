// Core
import React, { FC, useState } from 'react';

// Components
import { Sidebar } from './Sidebar';

// Routes
import { Routes } from './Routes';

// Styles
import { ProjectContainer } from './styles';

export const Project: FC = () => {
    return (
        <ProjectContainer>
            <Sidebar />
            <Routes />
        </ProjectContainer>
    );
};
