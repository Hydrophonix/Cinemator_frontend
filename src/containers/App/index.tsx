// Core
import React, { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApolloClient } from '@apollo/client';

// Containers
import { TopBar } from '../TopBar';
import { Routes } from './Routes';

// Hooks
import { useLocalStorage } from '../../hooks';
import { useTogglersRedux } from '../../@init/redux/togglers';

// Assets and Styles
import { GlobalStyles, defaultTheme } from '../../assets';
import { AppContainer } from './styles';

// Instruments
import { getAccessToken } from '../../@init';

export const App: FC = () => {
    const { resetStore } = useApolloClient();
    const { setTogglerAction, setIsLoggedIn } = useTogglersRedux();
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ isDefaultTheme ] = useLocalStorage('isDefaultTheme', true);

    useEffect(() => {
        const setOnlineStatusHanlder = () => void setTogglerAction({
            type:  'isOnline',
            value: navigator.onLine,
        });

        setOnlineStatusHanlder();
        window.addEventListener('online', setOnlineStatusHanlder);
        window.addEventListener('offline', setOnlineStatusHanlder);

        getAccessToken({
            trySideEffect:   () => void setIsLoggedIn(true),
            catchSideEffect: (statusCode) => {
                if (statusCode === 401) {
                    window.localStorage.clear();
                }
            },
            finallySideEffect: () => void setIsInitialized(true),
        });
    }, []);

    if (!isInitialized) {
        return null;
    }

    return (
        <ThemeProvider theme = { isDefaultTheme ? defaultTheme : defaultTheme }>
            <GlobalStyles />
            <AppContainer>
                <TopBar />
                <Routes />
            </AppContainer>
        </ThemeProvider>
    );
};
