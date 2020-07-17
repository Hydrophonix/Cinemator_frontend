import { Resolvers } from 'apollo-client';
import { ApolloCache } from 'apollo-cache';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    test(id: ID!): String!
  }
`;

type ResolverFn = (
    parent: any,
    args: any,
    { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
    [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
    Mutation: ResolverMap;
}

export const resolvers: AppResolvers = {
    Mutation: {
        test: (_, args, { cache }): string => {
            return '1';
        },
    },
};
