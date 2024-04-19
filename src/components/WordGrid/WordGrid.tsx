import {
  DEFAULT_GAME_ATTEMPT_STATE,
  DEFAULT_GAME_ATTEMPT_STATE_KEYS,
} from "@/constants";
import LetterBlock from "../TextBlock/LetterBlock";
import styles from "./WordGrid.module.css";

interface IWordGrid {
  gameAttempts: typeof DEFAULT_GAME_ATTEMPT_STATE;
  currentWordAttempt: string;
  currentAttemptIdx: number;
}

const WordGrid = ({
  gameAttempts,
  currentWordAttempt,
  currentAttemptIdx,
}: IWordGrid) => {
  return (
    <div className={styles.container}>
      {DEFAULT_GAME_ATTEMPT_STATE_KEYS.map((key) => {
        return (
          <div className={styles.wordRow} key={key}>
            {gameAttempts?.get?.(key)?.map((blockLetter: any, idx: number) => {
              const isCurrentAttempt =
                key === DEFAULT_GAME_ATTEMPT_STATE_KEYS[currentAttemptIdx];
              return (
                <LetterBlock
                  key={blockLetter.id}
                  letter={
                    isCurrentAttempt
                      ? currentWordAttempt[idx]
                      : blockLetter.letter
                  }
                  status={blockLetter.status}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordGrid;
