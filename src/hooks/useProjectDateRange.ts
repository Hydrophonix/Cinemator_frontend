// Core
import { useParams } from 'react-router-dom';
import moment from 'moment';

// Apollo hooks
import { useWorkdaysQuery } from '../bus/Workday';

// Utils
import { transformDateToISO8601 } from '../utils';

// Types
import { DateRange } from '../@init/redux/inputs/types';
type Options = { dateRange: DateRange };

export const useProjectDateRange = ({ dateRange }: Options) => {
    const { projectId } = useParams<{ projectId: string }>();
    const { data } = useWorkdaysQuery({ projectId });

    if (!data) {
        return {
            startDay:                       new Date(),
            endDay:                         new Date(),
            projectStartDay:                new Date(),
            projectEndDay:                  new Date(),
            isDefaultProjectDateRange:      true,
            isDateIncludesDateRangeHandler: (date: Date | string) => Boolean(date),
        };
    }

    const workdaysDates = data.workdays.map((workday) => new Date(workday.date));

    // Global project date range
    const projectStartDay = workdaysDates[ 0 ] || new Date();
    const projectEndDay = workdaysDates[ workdaysDates.length - 1 ] || new Date();

    // Current page date range
    const startDay = dateRange.startDay || projectStartDay;
    const endDay = dateRange.endDay || projectEndDay;

    // Parce to moment
    const momentStartDay = moment(transformDateToISO8601(startDay));
    const momentEndDay = moment(transformDateToISO8601(endDay));
    const momentProjectStartDay = moment(transformDateToISO8601(projectStartDay));
    const momentProjectEndDay = moment(transformDateToISO8601(projectEndDay));

    const isDefaultProjectDateRange = momentProjectStartDay.isSame(momentStartDay)
        && momentProjectEndDay.isSame(momentEndDay);

    const isDateIncludesDateRangeHandler = (date: Date | string) => {
        const parcedWorkday = moment(date);

        return parcedWorkday.isSameOrAfter(momentStartDay) && parcedWorkday.isSameOrBefore(momentEndDay);
    };

    return {
        startDay,
        endDay,
        projectStartDay,
        projectEndDay,
        isDefaultProjectDateRange,
        isDateIncludesDateRangeHandler,
    };
};
