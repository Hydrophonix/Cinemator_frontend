// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Redux
import { useTogglersRedux } from '../../@init/redux/togglers';

// Components
import { ErrorBoundary } from '../../components';
import { Calendar } from './Calendar';
import { Table } from './Table';

// Elements
import { Spinner } from '../../elements';

// Types
import { Params } from './types';

const Workdays: FC = () => {
    const { projectId } = useParams<Params>();
    const { data } = useWorkdaysQuery({ projectId });
    const { togglersRedux: { isCalendarView }} = useTogglersRedux();

    if (!data) {
        return <Spinner />;
    }

    return (
        isCalendarView
            ? <Calendar data = { data } />
            : <Table data = { data } />
    );
};

export default () => (
    <ErrorBoundary>
        <Workdays />
    </ErrorBoundary>
);
