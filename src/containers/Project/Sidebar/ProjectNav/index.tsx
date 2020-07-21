// Core
import React, { FC, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

// Elements
import { Button } from '../../../../elements';

// Styles
import { Header, Footer, Ul, Li } from './styles';
import { Section } from '../styles';

// Type
import { projectFields } from '../../../../bus/Project';

type PropTypes = projectFields & {
    setSidebarStatus: Function
    setFlipped: Function
}

type Params = {
    projectId: string
};

const asideLinks = [
    { url: 'calendar', name: 'Calendar' },
    { url: 'scenes', name: 'Scenes' },
    { url: 'requisites', name: 'Requisites' },
];

export const ProjectNav: FC<PropTypes> = (props) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { pathname } = useLocation();
    const theme = useContext(ThemeContext);

    const customHoverColorHandler = (key: number) => {
        switch (key) {
            case 0: return theme.workday.hoverSecondary;
            case 1: return theme.scene.hoverSecondary;
            case 2: return theme.requisite.hoverSecondary;

            default: return '#fff';
        }
    };

    return (
        <Section>
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
                                    props.setSidebarStatus();
                                } }>
                                {link.name}
                            </Li>
                        ))
                    }
                </Ul>
            </div>
            <Footer>
                <div>
                    <h2>{props.title}</h2>
                    {props.description && <p>Description: {props.description}</p>}
                </div>
                <nav>
                    <Button onClick = { () => props.setFlipped() }>
                        Settings
                    </Button>
                </nav>
            </Footer>
        </Section>
    );
};
