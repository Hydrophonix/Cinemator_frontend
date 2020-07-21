// Core
import React, { FC, forwardRef } from 'react';
import DatePickerLibrary from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Styles
import { Container, CustomDatePickerInput } from './styles';

type PropTypes = {
    date?: Date | null
    excludeDates?: Date[]
    onChange?: (date: Date) => void
    disabled?: boolean
}

export const DatePicker: FC<PropTypes> = ({
    date,
    excludeDates,
    onChange,
    disabled,
}) => {
    const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
        return (
            <CustomDatePickerInput
                disabled = { Boolean(disabled) }
                ref = { ref }
                onClick = { onClick }>
                {value}
            </CustomDatePickerInput>
        );
    });

    return (
        <Container>
            <DatePickerLibrary
                customInput = { <CustomInput /> }
                disabled = { disabled }
                endDate = { date }
                excludeDates = { excludeDates }
                popperPlacement = 'top-center'
                selected = { date }
                startDate = { date }
                onChange = { (date) => date && onChange && void onChange(date) }
            />
        </Container>
    );
};
