// Types
import { Theme } from './types';

// Assets
import { grey, red, blue } from '../colors';

export const dark: Theme = {
    name:                'dark',
    // Main
    primary:             grey[ 900 ],
    primaryVariant:      grey[ 600 ],
    secondary:           blue.A700,
    secondaryVariant:    blue.A400,
    // Background
    background:          grey[ 800 ],
    surface:             blue[ 900 ],
    error:               red.A700,
    errorVariant:        red.A400,
    // Text
    onPrimary:           '#FFF',
    onSecondary:         '#FFF',
    onBackground:        '#FFF',
    onBackgroundVariant: grey[ 400 ],
    onSurface:           '#FFF',
    onError:             '#FFF',
};
