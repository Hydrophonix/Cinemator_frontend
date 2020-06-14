// Core
import styled from 'styled-components';

export const ScenesContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;

    header {
        display: flex;
        justify-content: space-between;
        padding:  5px 10px;
        box-sizing: border-box;

        section {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }

    main {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
`;
