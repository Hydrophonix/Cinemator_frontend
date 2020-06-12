// // Core
// import React, { FC, useMemo } from 'react';

// // Elements
// import { Input, Button } from '../../elements';

// // Hooks
// import * as B from '../../bus';
// import { useForm } from '../../hooks';

// // Instruments
// import { getInputType, formatInputErrors } from '../../utils';

// // Types
// import { AuthInput } from '../../@types/graphql-global-types';

// // Assets
// import { StyledForm } from './styles';

// type MutationType = 'login' | 'register';
// type MutationsMap = { [type in MutationType]: Function };
// type InputsMap = { [type in MutationType]: Object };

// const mutationsMap: MutationsMap = {
//     login:      B.useLoginMutation,
//     register:   B.useRegisterMutation,
// };

// const authInput: AuthInput = {
//     email:    '',
//     password: '',
// };

// const inputsMap: InputsMap = {
//     login:      authInput,
//     register:   authInput,
// };

// interface FormProps {
//     mutation: MutationType;
//     buttonText: string;
//     callback?: (response: any) => void;
// }

// export const Form: FC<FormProps> = ({ mutation, callback, buttonText }) => {
//     const [ mutate, { loading, error }] = mutationsMap[ mutation ]();
//     const [ input, setInput ] = useForm(inputsMap[ mutation ]);

//     const inputErrors = useMemo(() => formatInputErrors(error), [ error ]);

//     if (loading) {
//         console.log('"|_(ʘ_ʘ)_/" =>: loading', loading);
//     }

//     return (
//         <StyledForm onSubmit = { async (event) => {
//             event.preventDefault();

//             const response = await mutate({
//                 variables: { input },
//             });

//             setInput(null);

//             if (callback) {
//                 callback(response.data);
//             }
//         } }>
//             {Object.entries(input).map(([ name, value ]) => (
//                 <Input
//                     withError
//                     error = { inputErrors[ name ] }
//                     key = { name }
//                     name = { name }
//                     placeholder = { `Enter ${name}` }
//                     style = {{ marginBottom: 10 }}
//                     type = { getInputType(name, value) }
//                     value = { value }
//                     onChange = { setInput }
//                 />
//             )) }
//             <Button
//                 style = {{ width: '100%', height: 50 }}
//                 type = 'submit'>
//                 {buttonText}
//             </Button>
//         </StyledForm>
//     );
// };
