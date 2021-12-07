import styled from "styled-components";

export const StyledDisplay = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
margin: 0 0 20px 0;
padding: 20px;
border: 6px ridge #333;
min-height: 30px;
width: 100%;
border-radius: 20px;
background-color: #000;
color: ${props => (props.gameOver ? "red" : "#000")}
background: #000;
font-family: Pixel, Arial, Helvetica, sans-serif;
font-size: 0.8rem;
`;
