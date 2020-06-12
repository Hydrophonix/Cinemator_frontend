export const transformStylesObjectToString = (styles: {}): string => {
    return Object.entries(styles)
        .reduce((acc, [ key, value ]) => `${acc} ${key}:${value}`, '');
};
