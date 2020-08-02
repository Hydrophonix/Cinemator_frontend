import styled from 'styled-components';

const CELL_PADDING = '5px 3px';

export const TableStyles = styled.table`
    width: 100%;
`;

export const TheadStyles = styled.thead`
    tr {
        th {
            padding: ${CELL_PADDING};
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
            padding: ${CELL_PADDING};
            text-align: left;
        }
    }
`;
