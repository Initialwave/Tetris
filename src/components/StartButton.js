import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";


// the callback logic for the start button in our Tetris.js file.
const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
