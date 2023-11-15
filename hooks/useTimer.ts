import { useEffect, useState } from "react";

enum GameStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

interface useTimerProps {
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
}

export const useTimer = ({ gameStatus, setGameStatus }: useTimerProps) => {
  const [timer, setTimer] = useState(15);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (gameStatus === GameStatus.STARTED) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(
        () => setTimer((prevTime) => prevTime - 1),
        1000
      );

      setTimeoutId(newTimeoutId);

      if (timer === 0) {
        setGameStatus(GameStatus.COMPLETED);
        return clearTimeout(newTimeoutId);
      }
    }
  }, [timer, gameStatus]);

  return { timer, setTimer };
};
