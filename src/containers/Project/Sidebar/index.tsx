// Core
import React, { FC, useContext, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Elements
import { Button } from '../../../elements';

// Styles
import { Container, Header, Footer, Ul, Li, Toogler } from './styles';

// Type
import { projectFields } from '../../../bus/Project';
type Params = {
    projectId: string
};

const asideLinks = [
    { url: 'calendar', name: 'Calendar' },
    { url: 'scenes', name: 'Scenes' },
    { url: 'requisites', name: 'Requisites' },
];

export const Sidebar: FC<projectFields> = ({ title, startDay, endDay, description }) => {
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
        <Container isActive = { isSidebarActive }>
            <Toogler
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
            </Toogler>
            <section>
                <div>
                    <Header>
                        <nav>
                            <Button onClick = { () => void push('/') }>To projects</Button>
                        </nav>
                    </Header>
                    <Ul>
                        {
                            asideLinks.map((link, index) => (
                                <Li
                                    color = { customHoverColorHandler(index) }
                                    isActive = { pathname.includes(link.url) }
                                    key = { index }
                                    onClick = { () => {
                                        push(`/${projectId}/${link.url}`);
                                        setSidebarStatus(false);
                                    } }>
                                    {link.name}
                                </Li>
                            ))
                        }
                    </Ul>
                </div>
                <Footer>
                    <div>
                        <h2>{title}</h2>
                        <h3>{startDay} → {endDay}</h3>
                        {description && <p>Description: {description}</p>}
                    </div>
                    <nav>
                        <Button>Settings</Button>
                    </nav>
                </Footer>
            </section>
        </Container>
    );
};
