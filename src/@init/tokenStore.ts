let token = '';

export const setAccessToken = (s: string) => {
    // console.log('<<<TESTLOG>>>: getAccessToken -> token', token);
    token = s;
};

export const getAccessToken = () => {
    // console.log('<<<TESTLOG>>>: getToken -> token', token);

    return token;
};
