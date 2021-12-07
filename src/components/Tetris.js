import React, { useState } from "react";

import { createStage, checkCollision } from "../gameHelpers.js";

import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris.js";

// custom hooks
import { useInterval } from "../hooks/useInterval.js";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// this is the constants for the game logic.
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log("re-render");

  // this updates the player position in the logic so the tetromino moves with the associated button press
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  //what happens when a player clicks Start Game
  const startGame = () => {
    //resets the game
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  // when the player hits the up arrow, this will drop our tetromino by one div.
  const drop = () => {
    // increases level and speed after clearing 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ key }) => {
    if (!gameOver) {
      if (key === "ArrowUp") {
        console.log("interval on");
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  // reiterated above, but we will be building logic to immediately drop the piece x div spaces.
  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
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
    } else if (key === "ArrowDown") {
      playerRotate(stage, 1);
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  // the return when you click the Start Game button to reset tetromino position, reset score, level, and rows completed
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};
export default Tetris;
