// Core
import React, { forwardRef } from 'react';

// Styles
import { CustomDatePickerInput } from './styles';

export const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
    return (
        <CustomDatePickerInput
            ref = { ref }
            onClick = { onClick } >
            {value}
        </CustomDatePickerInput>
    );
});
