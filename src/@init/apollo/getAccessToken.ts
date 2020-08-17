// Utils
import { ValidationError } from '../../utils';

// Instruments
import { setAccessToken } from '../tokenStore';

// Constants
import { TOKEN_URL } from '../constants';

// Types
type RefreshTokenResponse = {
    success?: boolean,
    accessToken?: string
}

type Options = {
    trySideEffect?: Function
    catchSideEffect?: (statusCode: number) => void
    finallySideEffect?: Function
}

export const getAccessToken = async ({
    trySideEffect,
    catchSideEffect,
    finallySideEffect,
}: Options): Promise<boolean> => {
    try {
        const response = await fetch(TOKEN_URL, { credentials: 'include', method: 'POST' });
        const { accessToken, success }: RefreshTokenResponse = await response.json();

        if (!success || !accessToken) {
            throw new ValidationError('', 401);
        }

        setAccessToken(accessToken);

        if (typeof trySideEffect === 'function') {
            trySideEffect();
        }

        return true;
    } catch ({ statusCode }) {
        if (statusCode === 401) {
            setAccessToken('');
        }

        if (typeof catchSideEffect === 'function') {
            catchSideEffect(statusCode);
        }

        return false;
    } finally {
        if (typeof finallySideEffect === 'function') {
            finallySideEffect();
        }
    }
};
