import styled from "styled-components";

export const Main = styled.main`
width: 100vw;
height: 100vh;
padding: 0%;
margin: 0%;
display: flex;
align-items: center;
flex-direction: column;
flex-wrap: nowrap;

// background:
// radial-gradient(black 15%, transparent 16%) 0 0,
// radial-gradient(black 15%, transparent 16%) 8px 8px,
// radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
// radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
// background-color:var(--green1);
// background-size:16px 16px;
`;

export const Container = styled.div`
background-color: var(--fawn);
width: 150px;
height:150px;
margin: 20px;
border-radius: 15%;
&:hover{
    filter: brightness(80%);
}
`;

export const Div = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: center;
`;

export const Div1 = styled.div`
display:flex;
flex-direction: column;
align-items:center;
margin-top:75px;
`;

export const FullContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`