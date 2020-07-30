// Core
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

// Redux
import { useUiRedux } from '../../@init/redux/ui';

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
    const { data, loading } = useWorkdaysQuery({ projectId });
    const { ui } = useUiRedux();

    if (loading || !data) {
        return <Spinner />;
    }

    return (
        ui.isCalendarView
            ? <Calendar data = { data } />
            : <Table data = { data } />
    );
};

export default () => (
    <ErrorBoundary>
        <Workdays />
    </ErrorBoundary>
);
