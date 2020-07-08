// Core
import React, { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';

// Containers
import { TopBar } from '../TopBar';
import { Routes } from './Routes';

// Hooks
import { useLocalStorage } from '../../hooks';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';
import { TOKEN_URL } from '../../@init/constants';

// Assets
import { GlobalStyles, defaultLight, dark } from '../../assets';
import { AppContainer } from './styles';

export const App: FC = () => {
    const client = useApolloClient();
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ isDefaultTheme ] = useLocalStorage('isDefaultTheme', true);

    useEffect(() => {
        fetch(TOKEN_URL, { credentials: 'include', method: 'POST' })
            .then(async (res) => {
                const { accessToken  } = await res.json();

                if (accessToken) {
                    setAccessToken(accessToken);
                    client.writeData({ data: { isLoggedIn: true }});
                }

                setIsInitialized(true);
            })
            .catch(() => {
                setIsInitialized(true);
            });
    }, []);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme = { isDefaultTheme ? defaultLight : dark }>
            <GlobalStyles />
            <AppContainer>
                <TopBar />
                <Routes />
            </AppContainer>
        </ThemeProvider>
    );
};
