// Core
import React, { FC, useEffect, useState } from 'react';
import DatePickerLibrary from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { CustomInput } from './CustomInput';

// Apollo hooks
import { useWorkdaysQuery } from '../../bus/Workday';

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
    reset?: boolean
}

let timeOutId: number | undefined = void 0;

export const DatePicker: FC<PropTypes> = ({
    startDay,
    endDay,
    setDateRange,
    inputType,
    projectId,
    reset,
}) => {
    const [ isRotate, setRotateState ] = useState(false);
    const { data } = useWorkdaysQuery({ projectId });

    const setProjectDateRange = () => {
        const workdaysDates = data?.workdays
            .map((workday) => new Date(workday.date))
            .sort((a, b) => a > b ? 1 : -1); // TODO: workdays server sort

        workdaysDates && void setDateRange({
            dateRange: {
                startDay: workdaysDates[ 0 ] || new Date(),
                endDay:   workdaysDates[ workdaysDates.length - 1 ] || new Date(),
            },
            inputType,
        });
    };

    useEffect(() => {
        !(startDay && endDay) && void setProjectDateRange();
    }, [ data ]);


    const resetToProjectDateRange = () => {
        if (!timeOutId) {
            setProjectDateRange();
            setRotateState(true);
            timeOutId = setTimeout(() => {
                setRotateState(false);
                clearTimeout(timeOutId);
                timeOutId = void 0;
            }, 500);
        }
    };

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
                    width:   14,
                    height:  14,
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
            {
                reset && (
                    <RedoContainer
                        isRotate = { isRotate }
                        onClick = { resetToProjectDateRange }>
                        <FontAwesomeIcon
                            icon = 'redo'
                            style = {{
                                color:  '#000',
                                width:  14,
                                height: 14,
                            }}
                        />
                    </RedoContainer>
                )
            }
        </Container>
    );
};
