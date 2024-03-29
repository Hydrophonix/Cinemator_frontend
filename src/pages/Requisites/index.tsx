// Core
import React, { FC } from 'react';
import { useHistory, useParams, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Apollo Hooks
import { useRequisitesQuery } from '../../bus/Requisite';
import { useReqTypesQuery } from '../../bus/ReqType';

// Redux
import { useInputsRedux } from '../../@init/redux/inputs';
import { useTogglersRedux } from '../../@init/redux/togglers';

// Hooks
import { useProjectDateRange } from '../../hooks';

// Containers
import { ReqTypesModal } from '../../containers';

// Components
import { ErrorBoundary, RequisitesTable, DateRangePicker } from '../../components';

// Elemets
import { Button, Spinner } from '../../elements';

// Styles
import { Container, Header, ScrollList } from './styles';

// Types
type Params = {
    projectId: string
}

const Requisites: FC = () => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const { data } = useRequisitesQuery({ projectId });
    const { data: reqTypesData } = useReqTypesQuery({ projectId });
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const {
        inputs: { requisitesInputs },
        setIndexRedux,
        setRequisiteTitleRedux,
        setRequisitesReqTypeRedux,
        setRequisitesDateRangeRedux,
    } = useInputsRedux();
    const {
        startDay, endDay, projectStartDay, projectEndDay,
        isDefaultProjectDateRange, isDateIncludesDateRangeHandler,
    } = useProjectDateRange({ dateRange: requisitesInputs.dateRange });

    if (!data || !reqTypesData) {
        return <Spinner />;
    }

    const setRequisitesReqTypeHandler = (reqTypeId: string) => {
        const findedReqType = reqTypesData.reqTypes.find((reqType) => reqType.id === reqTypeId);

        if (findedReqType) {
            setRequisitesReqTypeRedux(findedReqType.name);
            push(`/${projectId}/requisites`);
        }
    };

    const findByIndex = () => {
        const requisite = data.requisites.find((requisite) => requisite.number === requisitesInputs.index);

        if (requisite) {
            return [ requisite ];
        }

        return data.requisites;
    };

    const findByString = () => data.requisites.filter((requisite) => {
        return requisite.title.toLocaleLowerCase().includes(requisitesInputs.title.toLocaleLowerCase());
    });

    const findByReqType = () => {
        return data.requisites.filter(
            (requisite) => requisite.reqTypes.some(
                (somereqType) => somereqType.name.toLocaleLowerCase()
                    .includes(requisitesInputs.reqType.toLocaleLowerCase()),
            ),
        );
    };

    const filterByDateRange = () => data.requisites.filter(
        (requisite) => requisite.scenes.some(
            (scene) => scene.workdays.some(
                (workday) => isDateIncludesDateRangeHandler(workday.date),
            ),
        ),
    );

    const filterHandler = () => {
        if (requisitesInputs.index !== 0) {
            return findByIndex();
        }

        if (requisitesInputs.title !== '') {
            return findByString();
        }

        if (requisitesInputs.reqType !== '') {
            return findByReqType();
        }

        if (isDefaultProjectDateRange) {
            return data.requisites;
        }

        return filterByDateRange();
    };

    return (
        <Container>
            <Route path = { '/:projectId/requisites/types' }>
                <ReqTypesModal
                    closeHandler = { () => void push(`/${projectId}/requisites`) }
                    handler = { setRequisitesReqTypeHandler }
                />
            </Route>
            <Header>
                <nav>
                    <DateRangePicker
                        reset
                        endDay = { endDay }
                        firstPopperPlacement = 'top-start'
                        projectEndDay = { projectEndDay }
                        projectStartDay = { projectStartDay }
                        setDateRange = { setRequisitesDateRangeRedux }
                        startDay = { startDay }
                    />
                </nav>
                <h2>Requisites</h2>
                <nav>
                    <Button
                        disabled = { !isOnline }
                        title = 'Create requisite'
                        onClick = { () => void push(`/${projectId}/create-requisite`) }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 50, height: 16 }}
                        />
                    </Button>
                </nav>
            </Header>
            <ScrollList heightDiff = { 35 }>
                <RequisitesTable
                    index = { requisitesInputs.index }
                    reqType = { requisitesInputs.reqType }
                    requisites = { filterHandler() }
                    setIndex = { (newIndex: number) => void setIndexRedux({
                        inputType: 'requisitesInputs',
                        index:     newIndex,
                    }) }
                    setReqType = { (newReqType: string) => void setRequisitesReqTypeRedux(newReqType) }
                    setTitle = { (newTitle: string) => void setRequisiteTitleRedux(newTitle) }
                    title = { requisitesInputs.title }
                />
            </ScrollList>
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Requisites />
    </ErrorBoundary>
);
