import styled from 'styled-components';

// Instruments
import { BLUE, ORANGE } from './colors';

export const TableStyles = styled.div`
    .responsiveTable {
        width: 100%;
        background-color: #fff;
    }

    .responsiveTable td .tdBefore {
        display: none;
    }

    .responsiveTable thead th {
        padding: 5px;
        text-align: left;
        font-weight: bold;
        font-family: sans-serif;
        white-space: nowrap;
    }

    .responsiveTable tbody tr {
      cursor: pointer;
    }

    .responsiveTable tbody td {
      padding: 5px;
      text-align: left;
    }

    .scenesTableHead {
      background-color: ${BLUE.main};
      color: #fff;
    }

    .scenesTableRow {
      background-color: ${BLUE.secondary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${BLUE.main};

      &:hover {
        background-color: ${BLUE.hoverSecondary};
      }
    }

    .requisitesTableHead {
      background-color: ${ORANGE.main};
      color: #fff;
    }

    .requisitesTableRow {
      background-color: ${ORANGE.secondary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${ORANGE.main};

      &:hover {
        background-color: ${ORANGE.hoverSecondary};
      }
    }
`;
