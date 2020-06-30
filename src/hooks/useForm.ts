// Core
import { useState, ChangeEvent } from 'react';

type HandleChange = (event: ChangeEvent<HTMLInputElement>  | null, isNumber?: boolean) => void;

export const useForm = <InititalValue>(initialValue: InititalValue): [ InititalValue, HandleChange, Function ] => {
    const [ form, setForm ] = useState(initialValue);

    const handleChange: HandleChange = (event, isNumber) => {
        if (event === null) {
            return setForm(initialValue);
        }

        return setForm({
            ...form,
            [ event.target.name ]: isNumber
                ? parseInt(event.target.value, 10)
                : event.target.value,
        });
    };

    const resetForm = () => setForm(initialValue);

    return [ form, handleChange, resetForm ];
};
