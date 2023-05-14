import styled from "styled-components";

export const Row = styled.div`
display: flex;
background-color:white;
justify-content: center;
`;

export const Cell = styled.div`
border: 1px solid black;
padding: 30px;
&:hover{
    cursor: pointer;
    background-color: var(--white);
    filter: brightness(0.85);
};
`;
