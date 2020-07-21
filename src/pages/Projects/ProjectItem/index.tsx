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
    projectRedirectHandler,
}) => {
    return (
        <ProjectItemContainer onClick = { () => projectRedirectHandler(id) }>
            <header>
                <span>Project:</span>
                <p>{title}</p>
            </header>
            <section>Tap to open</section>
        </ProjectItemContainer>
    );
};
