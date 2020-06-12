// Core
import React, { useEffect, FC, useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

// Data Store
import { client } from '../../apollo';

// Containers
import { Routes } from '../Routes';
import { TopBar } from '../TopBar';

// Hooks
import { useLocalStorage } from '../../hooks';

// Instruments
import { setAccessToken } from '../../tokenStore';
import { TOKEN_URL } from '../../constants';

// Assets
import { GlobalStyles, StylesReset, defaultLight, dark } from '../../assets';
import { AppContainer } from './styles';

const history = createBrowserHistory();

export const App: FC = () => {
    const [ loading, setLoading ] = useState(true);
    const [ isDefaultTheme, setIsDefaultTheme ] = useLocalStorage('isDefaultTheme', true);

    useEffect(() => {
        fetch(TOKEN_URL, { credentials: 'include', method: 'POST' })
            .then(async (res) => {
                const { accessToken, ok } = await res.json();
                console.log('"|_(ʘ_ʘ)_/" =>: App:FC -> ok', ok);
                setAccessToken(accessToken);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log('app rerender');
    });

    if (loading) {
        console.log('"|_(ʘ_ʘ)_/" =>: App:FC -> loading', loading);
        // return <div>Loading...</div>;
    }

    return (
        <ApolloProvider client = { client }>
            <Router history = { history }>
                <ThemeProvider theme = { isDefaultTheme ? defaultLight : dark } >
                    <StylesReset />
                    <GlobalStyles />
                    <AppContainer>
                        <TopBar
                            isDefaultTheme = { isDefaultTheme }
                            setIsDefaultTheme = { setIsDefaultTheme }
                        />
                        <Routes />
                    </AppContainer>
                </ThemeProvider>
            </Router>
        </ApolloProvider>
    );
};
