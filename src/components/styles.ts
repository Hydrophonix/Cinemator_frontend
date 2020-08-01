import styled from 'styled-components';

const cellPadding = '5px 3px';

export const TableStyles = styled.table`
    width: 100%;
`;

export const TheadStyles = styled.thead`
    tr {
        th {
            padding: ${cellPadding};
            text-align: left;
            font-weight: bold;
            font-family: sans-serif;
            white-space: nowrap;
        }
    }
`;

export const TbodyStyles = styled.thead`
    tr {
        cursor: pointer;
        font-family: sans-serif;
        font-size: 14px;

        td {
            padding: ${cellPadding};
            text-align: left;
        }
    }
`;

export const NavCellStyles = styled.nav`
    position: relative;
    text-align: center;

    input {
        box-sizing: border-box;
        font-family: sans-serif;
        padding: 0px 3px;
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
        border-radius: 100%;

        svg {
            cursor: pointer;
            width: 20px;
            height: 20px;
        }
    }
`;
