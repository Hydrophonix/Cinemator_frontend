// Core
import { useMutation } from '@apollo/react-hooks';

// GraphQL
import CreateReqTypeSchema from '../schemas/createReqType.graphql';
import ReqTypesSchema from '../schemas/reqTypes.graphql';

// Types
import { CreateReqType, CreateReqTypeVariables, ReqTypes } from '../types';

type Options = {
    projectId: string
}

export const useCreateReqTypeMutation = ({ projectId }: Options) => {
    return useMutation<CreateReqType, CreateReqTypeVariables>(CreateReqTypeSchema, {
        update(cache, { data }) {
            const { reqTypes } = cache.readQuery<ReqTypes>({
                query:     ReqTypesSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     ReqTypesSchema,
                variables: { projectId },
                data:      {
                    reqTypes: [ data!.createReqType, ...reqTypes ],
                    // TODO: Новый тип при создании должен попадать в начало массива
                },
            });
        },
    });
};
