// Core
import { useMutation } from '@apollo/client';

// GraphQL
import CreateLocationSchema from '../schemas/createLocation.graphql';
import LocationsSchema from '../schemas/locations.graphql';

// Types
import { CreateLocation, CreateLocationVariables, Locations } from '../types';

type OptionsType = {
    projectId: string
}

export const useCreateLocationMutation = ({ projectId }: OptionsType) => {
    return useMutation<CreateLocation, CreateLocationVariables>(CreateLocationSchema, {
        update(cache, { data }) {
            const { locations } = cache.readQuery<Locations>({
                query:     LocationsSchema,
                variables: { projectId },
            })!;

            cache.writeQuery({
                query:     LocationsSchema,
                variables: { projectId },
                data:      {
                    locations: [ data!.createLocation, ...locations ],
                    // TODO: Новая локация при создании должна попадать в начало массива
                },
            });
        },
    });
};
