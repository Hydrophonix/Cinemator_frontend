// Core
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}

    input, select, button {
      outline: none;
    }

    button {
      cursor:  pointer;
      border:  none;
      padding: 0px;
    }

    /* .Toastify__toast {
      min-height: auto !important;
      margin-bottom: 0 !important;
    }

    .Toastify__toast-container {
      top: 0 !important;
      padding: 0 !important;
    } */
`;
