// Core
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

// Instruments
import { getAccessToken, setAccessToken } from '../tokenStore';
import { TOKEN_URL } from  '../constants';

export const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField:        'accessToken',
    isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
            return true;
        }

        try {
            const { exp } = jwtDecode(token);

            if (Date.now() >= exp * 1000) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    },
    fetchAccessToken: async () => {
        const result = await fetch(TOKEN_URL, {
            method:      'POST',
            credentials: 'include',
        });

        return result;
    },
    handleFetch: (accessToken) => {
        // const accessTokenDecrypted = jwtDecode(accessToken);
        setAccessToken(accessToken);
    // setExpiresIn(parseExp(accessTokenDecrypted.exp).toString());
    },
    handleError: (error) => {
    // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(error);

        // your custom action here
        setAccessToken('');
    },
});
