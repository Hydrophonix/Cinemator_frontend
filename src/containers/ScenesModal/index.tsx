
// Core
import React, { FC, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, ScenesTable } from '../../components';

// Apollo hooks
import { useScenesQuery } from '../../bus/Scene';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

// Styles
import { Header, Footer } from './styles';

// Types
type Params = {
    projectId: string
}

type PropTypes = {
    closeHandler: () => void
    sceneIds?: Array<string>
    handler?: (sceneId: string) => void
    saveHandler?: Function
    saveHandlerLoading?: boolean
}

export const ScenesModal: FC<PropTypes> = ({
    closeHandler, sceneIds, handler, saveHandler, saveHandlerLoading,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const headerRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const { togglersRedux: { isOnline }} = useTogglersRedux();

    const { data } = useScenesQuery({ projectId });
    const [ index, setIndexUseState ] = useState(0);

    if (!data) {
        return null;
    }

    const findByIndex = () => {
        const scene = data.scenes.find((scene) => scene.number === index);

        if (scene) {
            return [ scene ];
        }

        return data.scenes;
    };

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        return data.scenes;
    };

    return (
        <Modal
            closeHandler = { closeHandler }
            spinner = { saveHandlerLoading }>
            <Header ref = { headerRef }><h2>Scenes</h2></Header>
            <AdaptiveScroll
                minHeight
                backgroundColor = { theme.scene.containerBg }
                refs = { [ headerRef, footerRef ] }>
                <ScenesTable
                    lightVersion
                    handler = { handler }
                    index = { index }
                    sceneIds = { sceneIds }
                    scenes = { filterHandler() }
                    setIndex = { (newIndex: number) => setIndexUseState(newIndex) }
                />
            </AdaptiveScroll>
            <Footer ref = { footerRef }>
                <Button
                    disabled = { !isOnline }
                    title = 'Save'
                    onClick = { () => saveHandler && void saveHandler() }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'save'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Modal>
    );
};
