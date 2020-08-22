// Core
import { onError } from '@apollo/client/link/error';

// Instruments
import { store } from '../../@init';
import { togglerCreatorAction } from '../../@init/redux/togglers/index';
import { getAccessToken } from './getAccessToken';

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let error of graphQLErrors) {
            switch (error?.extensions?.exception?.response?.statusCode) {
                case 401:
                    getAccessToken({
                        catchSideEffect: (statusCode) => {
                            if (statusCode === 401) {
                                store.dispatch(togglerCreatorAction({ type: 'isLoggedIn', value: false }));
                                window.localStorage.clear();
                            }
                        },
                        finallySideEffect: () => forward(operation),
                    });
                    break;

                default:
                    forward(operation);
            }
        }

        return;
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }

    return void forward(operation);
});

