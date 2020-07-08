// Core
import { useState, ChangeEvent } from 'react';

type HandleChange = (event: ChangeEvent<HTMLInputElement>  | null, isNumber?: boolean) => void;

export const useForm = <T>(initialValue: T): [T, HandleChange, (newInitialValue: T) => void, Function] => {
    const [ form, setForm ] = useState(initialValue);

    const handleChange: HandleChange = (event, isNumber) => {
        if (event === null) {
            return void setForm(initialValue);
        }

        return void setForm({
            ...form,
            [ event.target.name ]: isNumber
                ? parseInt(event.target.value, 10)
                : event.target.value,
        });
    };

    const setInitialForm = (newInitialValue: T) => void setForm(newInitialValue);

    const resetForm = () => void setForm(initialValue);

    return [ form, handleChange, setInitialForm, resetForm ];
};

type ArrayOfStringsForm = (initialValues: Array<string>) => [
    Array<string>,
    (newString: string) => void,
    (newInnitialValues: Array<string>) => void
];

export const useArrayOfStringsForm: ArrayOfStringsForm = (initialValues)  => {
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
