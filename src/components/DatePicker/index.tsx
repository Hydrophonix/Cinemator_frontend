// Core
import React, { FC, useState } from 'react';
import DatePickerLibrary from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import { CustomInput } from './CustomInput';

// Styles
import { Container, RedoContainer } from './styles';

// Types
import { DateRangePayload } from '../../@init/redux/inputs/types';

type PropTypes = {
    startDay?: Date
    endDay?: Date
    projectStartDay: Date
    projectEndDay: Date
    setDateRange: (DateRangeOptions: DateRangePayload) => void,
    reset?: boolean
}

let timeOutId: number | undefined = void 0;

export const DatePicker: FC<PropTypes> = ({
    startDay,
    endDay,
    projectStartDay,
    projectEndDay,
    setDateRange,
    reset,
}) => {
    const [ isRotate, setRotateState ] = useState(false);

    const resetToProjectDateRange = () => {
        if (!timeOutId) {
            setDateRange({
                dateRange: {
                    startDay: projectStartDay,
                    endDay:   projectEndDay,
                },
            });
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
                onChange = { (date) => date && void setDateRange({ dateRange: { startDay: date }}) }
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
                onChange = { (date) => date && void setDateRange({ dateRange: { endDay: date }}) }
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
