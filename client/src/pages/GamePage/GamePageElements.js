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

export const Main = styled.main`
@media (max-width: ${size.mobileM}){
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    // height: 100vh;
};
@media (max-width: ${size.desktop}){
    height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    // height: 100vh;
};
`;

export const Div1 = styled.div`
@media (max-width: ${size.tablet}){
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 40px;
};
@media (min-width: ${size.tablet}){
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px;
}
`;

export const Div = styled.div`
background: var(--green2);
display: flex;
align-items: center;
flex-direction: column;
width:60vw;
padding:20px;
// height:325px
`;

export const H5 = styled.h5`
display: flex;
justify-content: flex-end;
margin-right:5%;
`;

export const Div2 = styled.div`
@media (max-width: ${size.mobileM}){
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
};
`