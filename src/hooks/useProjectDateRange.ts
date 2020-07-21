// Core
import { useParams } from 'react-router-dom';

// Apollo hooks
import { useWorkdaysQuery } from '../bus/Workday';

// Types
type Params = {
    projectId: string
}

export const useProjectDateRange = () => {
    const { projectId } = useParams<Params>();
    const { data } = useWorkdaysQuery({ projectId });

    const workdaysDates = data?.workdays.map((workday) => new Date(workday.date));

    if (workdaysDates) {
        return {
            projectStartDay: workdaysDates[ 0 ],
            projectEndDay:   workdaysDates[ workdaysDates.length - 1 ],
        };
    }

    return {
        projectStartDay: new Date(),
        projectEndDay:   new Date(),
    };
};
