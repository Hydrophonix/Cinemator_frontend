/* eslint-disable init-declarations */
declare module '*.graphql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;

    export = Schema
}
