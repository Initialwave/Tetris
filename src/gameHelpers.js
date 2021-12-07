export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// the array for our stage
export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
// the Game logic to prevent players from going through the walls and floor.
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // check we are on a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // check that move is in game area height (y)
          !stage[y + player.pos.y + moveY] ||
          // check that move is in game are width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // check that cell being moved to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
