// Core
import React, { FC } from 'react';

// Types
import { OwnedProjects_ownedProjects } from '../../../bus/Project/types';

// Styles
import { ProjectItemContainer } from './styles';

type PropTypes = OwnedProjects_ownedProjects & {
    projectRedirectHandler: (projectId: string) => void
};

export const ProjectItem: FC<PropTypes> = ({
    id,
    title,
    startDay,
    endDay,
    description,
    projectRedirectHandler,
}) => {
    return (
        <ProjectItemContainer onClick = { () => projectRedirectHandler(id) }>
            <header>Project: {title}</header>
            <main>{description ? description : 'Tap to open'}</main>
            <footer>
                <span>{startDay}</span>
                →
                <span>{endDay}</span>
            </footer>
        </ProjectItemContainer>
    );
};
