
// Core
import React, { FC, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, RequisitesTable } from '../../components';

// Apollo
import { useRequisitesQuery } from '../../bus/Requisite';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Elements
import { AdaptiveScroll, Button } from '../../elements';

// Styles
import { Header, Footer } from './styles';

// Types
type PropTypes = {
    closeHandler: () => void
    requisiteIds: Array<string>
    handler?: (requisiteId: string) => void
    saveHandler?: Function
    saveHandlerLoading?: boolean
}
type Params = {
    projectId: string
}

export const RequisitesModal: FC<PropTypes> = ({
    closeHandler, requisiteIds, handler, saveHandler, saveHandlerLoading,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const headerRef = useRef<HTMLElement>(null);
    const footerRef = useRef<HTMLElement>(null);

    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const { data } = useRequisitesQuery({ projectId });
    const [ index, setIndexUseState ] = useState(0);
    const [ title, setTitleUseState ] = useState('');

    if (!data) {
        return null;
    }

    const findByIndex = () => {
        const requisite = data.requisites.find((requisite) => requisite.number === index);

        if (requisite) {
            return [ requisite ];
        }

        return data.requisites;
    };

    const findByString = () => data.requisites.filter((requisite) => {
        return requisite.title.toLocaleLowerCase().includes(title.toLocaleLowerCase());
    });

    const filterHandler = () => {
        if (index !== 0) {
            return findByIndex();
        }

        if (title !== '') {
            return findByString();
        }

        return data.requisites;
    };

    return (
        <Modal
            closeHandler = { closeHandler }
            spinner = { saveHandlerLoading }>
            <Header ref = { headerRef }><h2>Requisites</h2></Header>
            <AdaptiveScroll
                minHeight
                backgroundColor = { theme.requisite.containerBg }
                refs = { [ headerRef, footerRef ] }>
                <RequisitesTable
                    lightVersion
                    handler = { handler }
                    index = { index }
                    requisiteIds = { requisiteIds }
                    requisites = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexUseState(newIndex) }
                    setTitle = { (newTitle: string) => void setTitleUseState(newTitle) }
                    title = { title }
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
