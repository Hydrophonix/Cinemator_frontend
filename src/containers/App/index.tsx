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

// Utils
import { ValidationError } from '../../utils';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';
import { TOKEN_URL } from '../../@init/constants';

// Assets
import { GlobalStyles, defaultTheme } from '../../assets';
import { AppContainer } from './styles';

export const App: FC = () => {
    const { resetStore } = useApolloClient();
    const {
        togglersRedux: { isOnline, isLoggedIn },
        setTogglerAction, setIsLoggedIn,
    } = useTogglersRedux();
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ isDefaultTheme ] = useLocalStorage('isDefaultTheme', true);

    const tokenRefreshHandler = async () => {
        try {
            const response = await fetch(TOKEN_URL, { credentials: 'include', method: 'POST' });
            const { accessToken } = await response.json();

            if (!accessToken) {
                throw new ValidationError('', 401);
            }

            setAccessToken(accessToken);
            !isLoggedIn && void setIsLoggedIn(true);
        } catch ({ statusCode }) {
            if (statusCode === 401) {
                setAccessToken('');
                setIsLoggedIn(false);
                window.localStorage.clear();
                resetStore();
            }
        } finally {
            !isInitialized && void setIsInitialized(true);
        }
    };

    const setOnlineStatusHanlder = () => void setTogglerAction({ type: 'isOnline', value: navigator.onLine });

    useEffect(() => {
        isInitialized && isOnline && void tokenRefreshHandler();

        if (!isInitialized) {
            setOnlineStatusHanlder();
            window.addEventListener('online', setOnlineStatusHanlder);
            window.addEventListener('offline', setOnlineStatusHanlder);
            tokenRefreshHandler();
        }
    }, [ isOnline ]);

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
