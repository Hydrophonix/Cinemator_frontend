// Core
import React, { FC, useContext, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Styles
import { SidebarContainer, SidebarLi, SidebarToogler } from './styles';

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
    const theme = useContext(ThemeContext);
    const [ isSidebarActive, setSidebarStatus ] = useState(false);

    const customHoverColorHandler = (key: number) => {
        switch (key) {
            case 0: return theme.workday.secondary;
            case 1: return theme.scene.hoverSecondary;
            case 2: return theme.requisite.hoverSecondary;

            default: return '#fff';
        }
    };

    return (
        <SidebarContainer isActive = { isSidebarActive }>
            <SidebarToogler
                isActive = { isSidebarActive }
                onClick = { () => void setSidebarStatus(!isSidebarActive) }>
                <FontAwesomeIcon
                    color = '#fff'
                    icon = 'arrow-right'
                    style = {{
                        width:      40,
                        height:     40,
                        transform:  `rotate(${isSidebarActive ? '-180' : '0'}deg)`,
                        transition: 'transform 0.3s',
                    }}
                />
            </SidebarToogler>
            <ul>
                {
                    asideLinks.map((link, index) => (
                        <SidebarLi
                            color = { customHoverColorHandler(index) }
                            isActive = { pathname.includes(link.url) }
                            key = { index }
                            onClick = { () => {
                                push(`/${projectId}/${link.url}`);
                                setSidebarStatus(false);
                            } }>
                            {link.name}
                        </SidebarLi>
                    ))
                }
            </ul>
        </SidebarContainer>
    );
};
