// Core
import React, { FC } from 'react';

// Types
type PropTypes = {
    id: string
    ownerId: string
    projectName: string
    requisiteIds: Array<string>
    memberIds: Array<string>
    startDate: Date | number // TODO
    endDate: Date | number // TODO
    workDaysIds: Array<string>
    projectRedirectHandler: (projectId: string) => void
};

// Components


// Styles
import { ProjectItemContainer } from './styles';

export const ProjectItem: FC<PropTypes> = ({
    id,
    // ownerId,
    projectName,
    // requisiteIds,
    // memberIds,
    // startDate,
    // endDate,
    // workDaysIds,
    projectRedirectHandler,
}) => {
    return (
        <ProjectItemContainer onClick = { () => projectRedirectHandler(id) }>
            <h2>{projectName}</h2>
        </ProjectItemContainer>
    );
};
