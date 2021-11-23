import React from "react";
import { StyledStage } from "./styles/StyledStage.js";

import Cell from "./Cell";

// the logic to the Stage. 12x and 20y is the board here.
const Stage = ({ stage }) => (
  <StyledStage width={12} height={20}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
