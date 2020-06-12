// Types
import { Theme } from './types';

// Assets
import { grey, red, yellow } from '../colors';

export const defaultLight: Theme = {
    name:                'defaultLight',
    // Main
    primary:             grey[ 400 ],
    primaryVariant:      grey[ 100 ],
    secondary:           yellow.A700,
    secondaryVariant:    yellow.A400,
    // Background
    background:          grey[ 300 ],
    surface:             yellow[ 700 ],
    error:               red[ 200 ],
    errorVariant:        red[ 500 ],
    // Text
    onPrimary:           '#000',
    onSecondary:         '#000',
    onBackground:        '#000',
    onBackgroundVariant: grey[ 600 ],
    onSurface:           '#000',
    onError:             '#000',
};
