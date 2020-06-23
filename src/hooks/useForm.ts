// Core
import { useState, ChangeEvent } from 'react';

type HandleChange = (event: ChangeEvent<HTMLInputElement>  | null) => void;

export const useForm = <InititalValue>(initialValue: InititalValue): [ InititalValue, HandleChange, Function ] => {
    const [ form, setForm ] = useState(initialValue);

    const handleChange: HandleChange = (event) => {
        if (event === null) {
            return setForm(initialValue);
        }

        return setForm({
            ...form,
            [ event.target.name ]: event.target.value,
        });
    };

    const resetForm = () => setForm(initialValue);

    return [ form, handleChange, resetForm ];
};
