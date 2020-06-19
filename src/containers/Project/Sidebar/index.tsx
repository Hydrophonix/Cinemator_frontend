// Core
import React, { FC } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

// Elements
import { Button } from '../../../elements';

// Types
type PropTypes = {};

// Styles
import { SidebarContainer } from './styles';

export const Sidebar: FC<PropTypes> = () => {
    const { push } = useHistory();
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <SidebarContainer>
            <Button onClick = { () => push('/') }>
                Back
            </Button>
            <ul>
                <li><Link to = { `/${projectId}/calendar` }>Calendar</Link></li>
                <li><Link to = { `/${projectId}/scenes` }>Scenes</Link></li>
                <li><Link to = { `/${projectId}/requisites` }>Requisite</Link></li>
            </ul>
        </SidebarContainer>
    );
};
