import styled from "styled-components";

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  };

export const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
}
`;

export const ConnectedPlayersBox = styled.div`
background-color: var(--green1);
border: 1px solid var(--fawn);
width: 200px;
padding-left: 10px;
`;

export const CurrentPlayerBox = styled.div`
background-color: var(--green1);
border: 1px solid var(--fawn);
width: 200px;
padding-left: 10px;
`;

export const Div2 = styled.div`
background-color: var(--green1);
border: 1px solid var(--fawn);
width:150px;
padding: 0px 10px 10px 10px;
`;

export const Container = styled.div`
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

export const Button = styled.button`
background-color: var(--green3);
border: 1px solid var(--green3);
&:hover{
    background-color: var(--green3);
    border: 1px solid var(--fawn);
}
`;

export const Div3 = styled.div`
display: flex;
justify-content: space-between;
`;