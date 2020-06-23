// Core
import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

// Containers
import { TopBar } from '../TopBar';
import { Routes } from './Routes';

// Hooks
import { useLocalStorage } from '../../hooks';
import { useReduxTogglers } from '../../redux/togglers';

// Instruments
import { setAccessToken } from '../../@init/tokenStore';
import { TOKEN_URL } from '../../@init/constants';

// Assets
import { GlobalStyles, defaultLight, dark } from '../../assets';
import { AppContainer } from './styles';

export const App: FC = () => {
    const { togglerCreator } = useReduxTogglers();
    // const [ isDefaultTheme, setIsDefaultTheme ] = useLocalStorage('isDefaultTheme', true);
    const [ isDefaultTheme ] = useLocalStorage('isDefaultTheme', true);

    useEffect(() => {
        fetch(TOKEN_URL, { credentials: 'include', method: 'POST' })
            .then(async (res) => {
                const { accessToken } = await res.json();
                setAccessToken(accessToken);
                togglerCreator('isAuthenticated', true);
            })
            .catch(() => {
                togglerCreator('isAuthenticated', false);
            });
    }, []);

    // useEffect(() => {
    //     console.log('app rerender');
    // });

    // if (loading) {
    //     console.log('"|_(ʘ_ʘ)_/" =>: App:FC -> loading', loading);

    //     // return <div>Loading...</div>;
    // }

    return (
        <ThemeProvider theme = { isDefaultTheme ? defaultLight : dark } >
            <AppContainer>
                <GlobalStyles />
                <TopBar />
                <Routes />
            </AppContainer>
        </ThemeProvider>
    );
};
