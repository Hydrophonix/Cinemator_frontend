// Core
import styled from 'styled-components';

export const AppContainer = styled.div`
    height: 100vh;
    width: 100vm;
    display: flex;
    flex-direction: column;

    align-items: center;
    background: ${({ theme: { primary, primaryVariant, background }}) => {
        return `linear-gradient(135deg, ${primary} 0%,${primaryVariant} 50%,${primary} 53%,${background} 76%,${primary} 87%,${primaryVariant} 100%);`;
    } };
`;
