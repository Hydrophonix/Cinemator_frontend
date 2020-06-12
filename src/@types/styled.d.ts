// Core
import 'styled-components';

// Types
import { Theme } from '../assets';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
