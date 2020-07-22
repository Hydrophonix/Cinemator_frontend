// Core
import { useMutation } from '@apollo/react-hooks';

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
                    locations: locations.concat([ data!.createLocation ]),
                },
            });
        },
    });
};
