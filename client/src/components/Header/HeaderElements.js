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

export const H3 = styled.h3`
padding-right: 20px;
`;

export const Img = styled.img`
width: 50px;
height: 50px;
`;

export const Left = styled.div`
padding-left: 20px;
`;