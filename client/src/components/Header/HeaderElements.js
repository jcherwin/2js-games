import styled from "styled-components";

export const Header = styled.header`
background: var(--green2);
color: var(--white);
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
width: inherit;

background:
linear-gradient(135deg, var(--green2) 21px, var(--green3) 22px, var(--green3) 24px, transparent 24px, 
    transparent 67px, var(--green3) 67px, var(--green3) 69px, transparent 69px),
linear-gradient(225deg, var(--green2) 21px, var(--green3) 22px, var(--green3) 24px, transparent 24px, 
    transparent 67px, var(--green3) 67px, var(--green3) 69px, transparent 69px)0 64px;
background-color:var(--green2);
background-size: 64px 128px;
`;

export const Right = styled.h3`
display:flex;
justify-content: center;
padding-right: 20px;
width:150px;
cursor: default;
`;

export const Img = styled.img`
width: 50px;
height: 50px;
`;

export const Left = styled.div`
padding-left: 20px;
width:150px;
`;

export const ModalStyle = styled.div`
display: flex;
background: var(--green3);
color: var(--white);
cursor: pointer;
height: 25px;
flex-direction: row;
padding-left:20px;
border:solid black 1px;
// textDecoration: none;
&:hover{
    background: var(--green2);
    border: solid var(--fawn) 1px;
}
`;

export const AccountBtn = styled.button`
background: var(--fawn);
color: var(--green1);
height: 30px;
width: 90px;
&:hover{filter: brightness(90%);
cursor: pointer;
}
`;