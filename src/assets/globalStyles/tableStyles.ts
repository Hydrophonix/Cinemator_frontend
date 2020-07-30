import styled, { css } from 'styled-components';

const indexStyles = css`
    th {
      nav {
        text-align: center;
        position: relative;

        input {
          box-sizing: border-box;
          font-family: sans-serif;
        }

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 17px;
          height: 17px;
          top: -1px;
          right: -10px;
          background-color: #fff;
          border-radius: 100%;

          svg {
            cursor: pointer;
            width: 20px;
            height: 20px;
          }

          &:hover {
            background-color: #ff0000;
          }
        }
      }
    }
  `;

export const TableStyles = styled.div`
    width: 100%;

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
      ${indexStyles};
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
    
    .locationsTableHead {
      background-color: ${({ theme }) => theme.scene.primary};
      color: #fff;
      ${indexStyles};
    }

    .locationsTableRow {
      background-color: ${({ theme }) => theme.scene.locationPrimary};
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
      ${indexStyles};
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

    .reqTypesTableHead {
      background-color: ${({ theme }) => theme.requisite.primary};
      color: #fff;
      ${indexStyles};
    }

    .reqTypesTableRow {
      background-color: ${({ theme }) => theme.requisite.typePrimary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${({ theme }) => theme.requisite.primary};

      &:hover {
        background-color: ${({ theme }) => theme.requisite.hoverSecondary};
      }
    }

    .workdaysTableHead {
      background-color: ${({ theme }) => theme.workday.primary};
      color: #fff;
      ${indexStyles};
    }

    .workdaysTableRow {
      background-color: ${({ theme }) => theme.workday.secondary};
      font-family: sans-serif;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid ${({ theme }) => theme.workday.primary};

      &:hover {
        background-color: ${({ theme }) => theme.workday.hoverSecondary};
      }
    }
`;
