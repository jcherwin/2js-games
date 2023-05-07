import styled from "styled-components";

export const Header = styled.header`
background: var(--green2);
// background-image: repeating-linear-gradient(45deg, var(--green3) 15px, var(--green2) 55px),
// repeating-linear-gradient(135deg, var(--green3) 15px, var(--green2) 55px);

// background:
// linear-gradient(27deg, var(--green2) 5px, transparent 5px) 0 5px,
// linear-gradient(207deg, var(--green2) 5px, transparent 5px) 10px 0px,
// linear-gradient(27deg, var(--green1) 5px, transparent 5px) 0px 10px,
// linear-gradient(207deg, var(--green1) 5px, transparent 5px) 10px 5px,
// linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
// linear-gradient(#1d1d1d 25%, var(--green1) 25%, var(--green1) 50%, transparent 50%, transparent 75%, var(--green1) 75%, #242424);
// background-color: #131313;
// background-size: 20px 20px;



color: var(--white);
height: 70px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
width: 100vw;
`;

export const H3 = styled.h3`
padding-right: 20px;
`;