import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore(score + linePoints[rowsCleared - 1] * (level + 1));
      setRows(rows + rowsCleared);
    }
  }, [level, linePoints, rowsCleared, rows, score]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
