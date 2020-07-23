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
import { DateRange } from '../../@init/redux/inputs/types';

type PropTypes = {
    startDay?: Date
    endDay?: Date
    projectStartDay: Date
    projectEndDay: Date
    setDateRange: (payload: DateRange) => void,
    reset?: boolean
    firstPopperPlacement?: string
    secondPopperPlacement?: string
}

let timeOutId: number | undefined = void 0;

export const DateRangePicker: FC<PropTypes> = ({
    startDay,
    endDay,
    projectStartDay,
    projectEndDay,
    setDateRange,
    reset,
    firstPopperPlacement,
    secondPopperPlacement,
}) => {
    const [ isRotate, setRotateState ] = useState(false);

    const resetToProjectDateRange = () => {
        if (!timeOutId) {
            setDateRange({ startDay: projectStartDay, endDay: projectEndDay });
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
                popperPlacement = { firstPopperPlacement ? firstPopperPlacement : 'top-center' }
                selected = { startDay }
                startDate = { startDay }
                onChange = { (date) => date && void setDateRange({ startDay: date }) }
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
                popperPlacement = { secondPopperPlacement ? secondPopperPlacement : 'top-center' }
                selected = { endDay }
                startDate = { startDay }
                onChange = { (date) => date && void setDateRange({ endDay: date }) }
            />
            {
                reset && (
                    <RedoContainer
                        isRotate = { isRotate }
                        title = 'Reset'
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
