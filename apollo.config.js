module.exports = {
    client: {
        // Add env ENGINE_API_KEY
        service:  'Cinemator',
        url:      'http://localhost:4000/graphql',
        includes: [ './src/bus/**/*.graphql' ],
        excludes: [ '**/__tests__/**' ],
    },
};
