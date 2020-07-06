// Core
import styled from 'styled-components';

import topBarBg from '../../assets/images/topBarBg.png';

export const TopbarContainer = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    justify-content: space-between;
    background-image: url(${topBarBg});
    background-size: cover;

    h1 {
        color: #fff;
        font-size: 30px;
        border-radius: 10px;
        background-color: rgba(0,0,0,0.7);
        color: #fff;
        padding: 5px 10px;
    }
`;

export const Logo = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 100%;
`;
