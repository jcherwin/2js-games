import styled from "styled-components";


const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '990px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const Main = styled.main`
@media (max-width: ${size.mobileM}){
    // height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100vh;
};
@media (max-width: ${size.desktop}){
    // height: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100vh;
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
min-height: 317px;
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
export const Button = styled.button`
  background-color: var(--green3);
  border: 1px solid var(--green3);
  position: relative;

  &:hover {
    background-color: var(--green3);
    border: 1px solid var(--fawn);
  }
`;

export const Popup = styled.span`
  display: ${props => (props.show ? 'block' : 'none')};
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
  opacity: 0;
  transition: opacity 0.3s;
  ${props => props.show && 'opacity: 1;'}
`;
