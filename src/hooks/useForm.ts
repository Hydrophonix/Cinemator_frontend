// Core
import { useState, ChangeEvent } from 'react';

type HandleChange = (event: ChangeEvent<HTMLInputElement>  | null) => void;

export const useForm = <InititalValue>(initialValue: InititalValue): [ InititalValue, HandleChange, Function ] => {
    const [ value, setValue ] = useState(initialValue);

    const handleChange: HandleChange = (event) => {
        if (event === null) {
            return setValue(initialValue);
        }

        return setValue({
            ...value,
            [ event.target.name ]: event.target.value,
        });
    };

    const resetForm = () => setValue(initialValue);

    return [ value, handleChange, resetForm ];
};
