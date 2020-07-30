// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateMeSchema from '../schemas/updateMe.graphql';

// Types
import { UpdateMe, UpdateMeVariables } from '../types';

export const useUpdateMeMutation = () => {
    return useMutation<UpdateMe, UpdateMeVariables>(UpdateMeSchema);
};
