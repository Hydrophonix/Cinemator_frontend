export const transformStylesObjectToString = (styles: {}): string => {
    return Object.entries(styles)
        .reduce((acc, [ key, value ]) => `${acc} ${key}:${value}`, '');
};

export const transformDateToISO8601 = (date: Date) => {
    return date.toISOString().split('T')[ 0 ];
};
