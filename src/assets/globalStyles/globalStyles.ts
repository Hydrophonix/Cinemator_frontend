// Core
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Fonts
import TerminatorFont from '../fonts/terminator.ttf';

export const GlobalStyles = createGlobalStyle`
    /* ${reset} */

    /* input, select, button {
      outline: none;
    }

    button {
      cursor:  pointer;
      border:  none;
      padding: 0px;
    } */

    /* .Toastify__toast {
      min-height: auto !important;
      margin-bottom: 0 !important;
    }

    .Toastify__toast-container {
      top: 0 !important;
      padding: 0 !important;
    } */

    @font-face {
      font-family: TerminatorFont;
      src: url('${TerminatorFont}') format('opentype');
    }
`;

export const TableStyles = styled.div`
    .responsiveTable {
        width: 100%;
    }

    .responsiveTable td .tdBefore {
        display: none;
    }

    .responsiveTable tbody tr {
        cursor: pointer;

        &:hover {
            background-color: lightblue;
        }
    }

    @media screen and (max-width: 35em) {
        /*
            Force table elements to not behave like tables anymore
            Hide table headers (but not display: none;, for accessibility)
        */

        .responsiveTable table,
        .responsiveTable thead,
        .responsiveTable tbody,
        .responsiveTable th,
        .responsiveTable td,
        .responsiveTable tr {
            display: block;
        }

        .responsiveTable thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
            border-bottom: 2px solid #333;
        }

        .responsiveTable tbody tr {
            border: 2px solid #216ba5;
            margin: 5px;

            &:hover {
                td {
                    border-bottom: 1px solid #216ba5;
                }
            }
        }

        .responsiveTable td.pivoted {
            /* Behave like a "row" */
            border: none;
            border-bottom: 1px solid lightblue;
            position: relative;
            padding-left: 50%;
            padding-top: 3px;
            padding-bottom: 3px;
            text-align: left;
            white-space: pre-wrap;
            overflow-wrap: break-word;
        }

        .responsiveTable td .tdBefore {
            /* Now like a table header */
            position: absolute;
            display: block;
            /* border-right: 1px solid black; */
            /* Top/left values mimic padding */
            left: 10px;
            width: calc(50% - 20px);
            white-space: pre-wrap;
            overflow-wrap: break-word;
            text-align: left;
            font-weight: 500;
        }
    }

    th {
        padding: 5px;
        text-align: left;
        font-weight: bold;
        white-space: nowrap;
        background: #216ba5;
        color: #fff;
    }
    
    td {
        border-bottom: 1px solid #216ba5;
        padding: 5px;
        text-align: left;
    }
`;

