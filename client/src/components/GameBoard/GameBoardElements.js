import styled from "styled-components";

export const Row = styled.div`
display: flex;
background-color:white;
justify-content: center;
`;

export const Cell = styled.div`
border: 1px solid black;
width: 60px;
height: 60px;
display: flex;
align-items: center;
justify-content: center;
&:hover{
    cursor: pointer;
    background-color: var(--white);
    filter: brightness(0.85);
};

`;
