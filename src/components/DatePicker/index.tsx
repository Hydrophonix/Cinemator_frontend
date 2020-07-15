// Core
import React, { FC, useEffect } from 'react';
import DatePickerLibrary from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { CustomInput } from './CustomInput';

// Apollo hooks
import { useOwnedProjectsQuery } from '../../bus/Project';

// Styles
import { Container, RedoContainer } from './styles';

// Types
import { DateRangeOptions, InputsKeys } from '../../@init/redux/inputs/types';

type PropTypes = {
    projectId: string
    startDay?: Date
    endDay?: Date
    inputType: InputsKeys
    setDateRange: (DateRangeOptions: DateRangeOptions) => void,
}

export const DatePicker: FC<PropTypes> = ({
    startDay,
    endDay,
    setDateRange,
    inputType,
    projectId,
}) => {
    const { data } = useOwnedProjectsQuery();

    const setProjectDateRange = () => {
        const project = data?.ownedProjects.find((project) => project.id === projectId);

        if (project) {
            setDateRange({
                dateRange: {
                    startDay: new Date(project.startDay),
                    endDay:   new Date(project.endDay),
                },
                inputType,
            });
        }
    };

    useEffect(() => {
        !(startDay && endDay) && void setProjectDateRange();
    }, [ data ]);

    return (
        <Container>
            <DatePickerLibrary
                selectsStart
                customInput = { <CustomInput /> }
                endDate = { endDay }
                maxDate = { endDay }
                selected = { startDay }
                startDate = { startDay }
                onChange = { (date) => date && void setDateRange({ dateRange: { startDay: date }, inputType }) }
            />
            <FontAwesomeIcon
                color = '#000'
                icon = 'long-arrow-alt-right'
                style = {{
                    width:   15,
                    height:  15,
                    padding: '0px 2px',
                }}
            />
            <DatePickerLibrary
                selectsEnd
                customInput = { <CustomInput /> }
                endDate = { endDay }
                minDate = { startDay }
                popperPlacement = 'top-center'
                selected = { endDay }
                startDate = { startDay }
                onChange = { (date) => date && void setDateRange({ dateRange: { endDay: date }, inputType }) }
            />
            <RedoContainer>
                <FontAwesomeIcon
                    icon = 'redo'
                    style = {{
                        color:  '#000',
                        width:  12,
                        height: 12,
                    }}
                    onClick = { setProjectDateRange }
                />
            </RedoContainer>
        </Container>
    );
};
