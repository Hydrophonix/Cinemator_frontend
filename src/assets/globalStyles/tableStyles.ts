import styled from 'styled-components';

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
      background-color: ${({ theme }) => theme.scene.primary};
      color: #fff;
    }

    .scenesTableRow {
      background-color: ${({ theme }) => theme.scene.secondary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${({ theme }) => theme.scene.primary};

      &:hover {
        background-color: ${({ theme }) => theme.scene.hoverSecondary};
      }
    }

    .requisitesTableHead {
      background-color: ${({ theme }) => theme.requisite.primary};
      color: #fff;
    }

    .requisitesTableRow {
      background-color: ${({ theme }) => theme.requisite.secondary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${({ theme }) => theme.requisite.primary};

      &:hover {
        background-color: ${({ theme }) => theme.requisite.hoverSecondary};
      }
    }
`;
