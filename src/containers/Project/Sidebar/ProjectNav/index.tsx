// Core
import React, { FC, useContext, useRef } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Elements
import { AdaptiveScroll, Button } from '../../../../elements';

// Redux
import { useInputsRedux } from '../../../../@init/redux/inputs';

// Styles
import { Header, Title, Description, Footer, Ul, Li } from './styles';
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
    const navRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const { resetInputsToInitial } = useInputsRedux();

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
            <nav ref = { navRef }>
                <Header>
                    <nav>
                        <Button
                            title = 'Back to projects'
                            onClick = { () => {
                                push('/');
                                resetInputsToInitial();
                            } }>
                            <FontAwesomeIcon
                                color = '#000'
                                icon = 'reply'
                                style = {{ width: 20, height: 20, margin: '0px 5px' }}
                            />
                        </Button>
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
            </nav>
            {
                props.description && (
                    <AdaptiveScroll refs = { [ navRef, footerRef ] }>
                        <Description>{props.description}</Description>
                    </AdaptiveScroll>
                )
            }
            <Footer>
                <Title>{props.title}</Title>
                <nav ref = { footerRef }>
                    <Button
                        title = 'Settings'
                        onClick = { () => props.setFlipped() }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'wrench'
                            style = {{ width: 26, height: 26 }}
                        />
                    </Button>
                </nav>
            </Footer>
        </Section>
    );
};
