
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';

// Components
import { Modal, WorkdaysTable } from '..';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Elements
import { ModalHeader, Button } from '../../elements';

// Styles
import { Main, Footer } from './styles';

// Types
type Params = {
    projectId: string
}

type PropTypes = {
    closeHandler: () => void
    workdayIds?: Array<string>
    handler?: (sceneId: string) => void
    saveHandler?: Function
}

export const WorkdaysModal: FC<PropTypes> = ({ closeHandler, workdayIds, handler, saveHandler }) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const { data, loading } = useWorkdaysQuery({ projectId });

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const filterHandler = () => {
        return data.workdays;
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.workday.secondary }}>Add workdays</ModalHeader>
            <Main>
                <WorkdaysTable
                    handler = { handler }
                    workdayIds = { workdayIds }
                    workdays = { filterHandler() }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.workday.primary }}>
                <Button onClick = { () => saveHandler && void saveHandler() }>
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
