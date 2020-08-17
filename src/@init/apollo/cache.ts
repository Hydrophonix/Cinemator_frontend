// Core
import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                ownedProjects: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                workdays: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                scenes: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                requisites: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                locations: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                reqTypes: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
            },
        },
        Workday: {
            fields: {
                scenes: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
            },
        },
        Scene: {
            fields: {
                workdays: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                requisites: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                locations: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
            },
        },
        Requisite: {
            fields: {
                scenes: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
                reqTypes: {
                    merge(_ignored, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});
