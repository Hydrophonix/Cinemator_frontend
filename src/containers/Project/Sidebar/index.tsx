// Core
import React, { FC, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated as a } from 'react-spring';

// Components
import { ProjectNav } from './ProjectNav';
import { ProjectSettings } from './ProjectSettings';

// Styles
import { Container, Toogler } from './styles';

// Type
import { projectFields } from '../../../bus/Project';

export const Sidebar: FC<projectFields> = (props) => {
    const [ isSidebarActive, setSidebarStatus ] = useState(false);
    const [ flipped, setFlipped ] = useState(false);
    const { transform, opacity } = useSpring({
        opacity:   flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config:    { mass: 5, tension: 500, friction: 80 },
    });

    const sideBarEl: any = useRef(null);

    const handleDropDownMenuClose = (event: MouseEvent) => {
        if (sideBarEl.current && !sideBarEl.current.contains(event.target)) {
            setSidebarStatus(false);
            setFlipped(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDropDownMenuClose);
    }, []);

    return (
        <Container
            isActive = { isSidebarActive }
            ref = { sideBarEl }>
            <Toogler
                isActive = { isSidebarActive }
                onClick = { () => {
                    setSidebarStatus(!isSidebarActive);
                    flipped && void setFlipped(false);
                } }>
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
            <div style = {{ overflow: 'hidden', position: 'relative', height: '100%' }}>
                <a.div
                    className = 'animatedDiv'
                    style = {{
                        zIndex:  flipped ? 0 : 1,
                        opacity: opacity.interpolate((o: any) => 1 - o), transform,
                    }}>
                    <ProjectNav
                        { ...props }
                        setFlipped = { () => setFlipped(true) }
                        setSidebarStatus = { () => setSidebarStatus(!isSidebarActive) }
                    />
                </a.div>
                <a.div
                    className = 'animatedDiv'
                    style = {{
                        zIndex:    flipped ? 1 : 0,
                        opacity, transform: transform.interpolate((t) => `${t} rotateY(180deg)`),
                    }}>
                    <ProjectSettings
                        { ...props }
                        setFlipped = { () => setFlipped(false) }
                    />
                </a.div>
            </div>
        </Container>
    );
};
