// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import UpdateProjectSchema from '../schemas/updateProject.graphql';

// Types
import { UpdateProject, UpdateProjectVariables } from '../types';

export const useUpdateProjectMutation = () => {
    return useMutation<UpdateProject, UpdateProjectVariables>(UpdateProjectSchema);
};
