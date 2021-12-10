import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";


// the Display for game Over when a player loses the game
const Display = ({ gameOver, text, tetromino }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
