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

export const useArrayOfStringsForm = (initialValues: Array<string>): [Array<string>, Function, Function] => {
    const [ arrayOfStrings, setArrayOfStrings ] = useState<Array<string>>(initialValues);

    const arrayOfStringsHandle = (newString: string) => {
        if (arrayOfStrings.includes(newString)) {
            setArrayOfStrings((prevState) => prevState.filter((string) => string !== newString));
        } else {
            setArrayOfStrings((prevState) => [ ...prevState, newString ]);
        }
    };


    const setNewInnitialValues = (newInnitialValues: Array<string>) => {
        setArrayOfStrings(newInnitialValues);
    };

    return [ arrayOfStrings, arrayOfStringsHandle, setNewInnitialValues ];
};
