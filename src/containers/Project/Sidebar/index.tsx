// Core
import React, { FC } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

// Elements
import { Button } from '../../../elements';

// Styles
import { SidebarContainer, SidebarLi } from './styles';

// Type
type Params = { projectId: string };

const asideLinks = [
    { url: 'calendar', name: 'Calendar' },
    { url: 'scenes', name: 'Scenes' },
    { url: 'requisites', name: 'Requisite' },
];

export const Sidebar: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { pathname } = useLocation();

    return (
        <SidebarContainer>
            <Button onClick = { () => void push('/') }>Back</Button>
            <ul>
                {
                    asideLinks.map((link, index) => (
                        <SidebarLi
                            isActive = { pathname.includes(link.url) }
                            key = { index }
                            onClick = { () => void push(`/${projectId}/${link.url}`) }>
                            {link.name}
                        </SidebarLi>
                    ))
                }
            </ul>
        </SidebarContainer>
    );
};
