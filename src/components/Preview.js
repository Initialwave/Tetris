import { TETROMINOS } from "../tetrominos";
//generate a piece every time a piece is removed from the staging preview area
export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  //make this line a copy starting component for preview
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  console.log("I've made a random tetromino");

  // trigger update of preview, example: updatePreview(randTetromino);
  return TETROMINOS[randTetromino];
};

// use usestate feature
//
{/* <Preview tetromino={currentTetromino} /> */}

export function updatePreview (newTetromino) {
  // update the state of the <Preview /> component
}