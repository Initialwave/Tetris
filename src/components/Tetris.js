import React, { useState } from "react";

import { checkCollision, createStage } from "../gameHelpers";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris.js";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// this is the constants for the game logic.
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log("re-render");

// this updates the player position in the logic so the tetromino moves with the associated button press
  const movePlayer = dir => {
    updatePlayerPos({
      x: dir,
      y: 0,
      collided: checkCollision(player, stage, { x: dir, y: 0 }),
    });
  };

//what happens when a player clicks Start Game
  const startGame = () => {
    //resets the game
    setStage(createStage());
    resetPlayer();
  };

// when the player hits the up arrow, this will drop our tetromino by one div.
  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

// reiterated above, but we will be building logic to immediately drop the piece x div spaces.
  const dropPlayer = () => {
    drop();
  };

 // the logic for moving the tetromino. had some issues with deprecated dependencies, but overhauled to work with new commands. 
  const move = ({ key }) => {
    if (gameOver) return;

    if (key === "ArrowLeft") {
      movePlayer(-1);
    } else if (key === "ArrowRight") {
      movePlayer(1);
    } else if (key === "ArrowUp") {
      dropPlayer();
    }
  };

// the return when you click the Start Game button to reset tetromino position, reset score, level, and rows completed
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};
export default Tetris;
