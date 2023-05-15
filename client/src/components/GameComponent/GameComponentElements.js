import styled from "styled-components";

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  }

export const Div = styled.div`
@media (max-width: ${size.mobileM}){
    display: flex;
    align-items: center;
    flex-direction: column;
};

@media (min-width: ${size.tablet}){
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
};

`;

export const ConnectedPlayersBox = styled.div`
background-color: var(--green1);
border: 1px solid var(--fawn);
width:150px;
padding-left: 5px;

`;

export const CurrentPlayerBox = styled.div`
background-color: var(--green1);
border: 1px solid var(--fawn);
width:150px;
padding-left: 5px;

`;
