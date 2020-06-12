// Core
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body, button, input, div {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.onBackground};
    font-size: 16px;
}
`;
