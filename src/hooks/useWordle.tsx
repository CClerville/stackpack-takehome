import {
  DEFAULT_GAME_ATTEMPT_STATE,
  DEFAULT_GAME_ATTEMPT_STATE_KEYS,
  LETTER_COUNT,
  NUM_GAME_ATTEMPS,
  WORDS_LIST,
} from "@/constants";
import { BlockLetter, BlockLetterStatus } from "@/types";
import { getRandomWord } from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bounce, toast } from "react-toastify";

const useWordle = () => {
  const [guessWord, setGuessWord] = useState<string>(getRandomWord());
  const [gameAttempts, setGameAttempts] = useState<
    typeof DEFAULT_GAME_ATTEMPT_STATE
  >(DEFAULT_GAME_ATTEMPT_STATE);
  const [currentWordAttempt, setCurrentWordAttempt] = useState<string>("");
  const [currentAttemptIdx, setCurrentAttemptIdx] = useState<number>(0);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  useEffect(() => {
    if (currentAttemptIdx === NUM_GAME_ATTEMPS && !isGameCompleted) {
      toast.error("YOU LOST! Try again...", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsGameCompleted(true);
    }
  }, [currentAttemptIdx, isGameCompleted]);

  const isInWordsList = useMemo(() => {
    if (currentWordAttempt.length === LETTER_COUNT) {
      return WORDS_LIST.includes(currentWordAttempt);
    }

    return true;
  }, [currentWordAttempt]);

  const validateWord = useCallback(() => {
    const updatedGameAttemps = new Map(gameAttempts);
    const updatedBlockLetters: Array<BlockLetter> = [];
    const currentGameAttempt = updatedGameAttemps.get(
      DEFAULT_GAME_ATTEMPT_STATE_KEYS[currentAttemptIdx]
    );
    if (isInWordsList) {
      let isCorrectWord = true;
      const charsInGuessWord = new Set(guessWord);
      for (let i = 0; i < LETTER_COUNT; i++) {
        if (currentWordAttempt[i] === guessWord[i]) {
          let blockLetter = currentGameAttempt?.[i];
          if (blockLetter) {
            blockLetter = {
              ...blockLetter,
              letter: currentWordAttempt[i],
              status: BlockLetterStatus.POSITION_SUCCESS,
            };
            updatedBlockLetters.push(blockLetter);
          }
        } else {
          isCorrectWord = false;
          let blockLetter = currentGameAttempt?.[i];
          if (blockLetter) {
            blockLetter = {
              ...blockLetter,
              letter: currentWordAttempt[i],
              status: charsInGuessWord.has(currentWordAttempt[i])
                ? BlockLetterStatus.POSITION_WRONG
                : BlockLetterStatus.POSITION_NOT_EXIST,
            };
            updatedBlockLetters.push(blockLetter);
          }
        }
        updatedGameAttemps.set(
          DEFAULT_GAME_ATTEMPT_STATE_KEYS[currentAttemptIdx],
          updatedBlockLetters
        );
      }

      setGameAttempts(() => updatedGameAttemps);
      setCurrentWordAttempt("");
      setCurrentAttemptIdx((prev) => {
        return prev < NUM_GAME_ATTEMPS ? prev + 1 : prev;
      });

      if (isCorrectWord) {
        toast.success("YOU WON! Congratulations!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setIsGameCompleted((prev) => !prev);
      }
    } else {
      toast.error("Not in word list", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [
    currentAttemptIdx,
    currentWordAttempt,
    gameAttempts,
    guessWord,
    isInWordsList,
  ]);

  const handelInput = useCallback(
    (key: string) => {
      if (key === "ENTER") {
        if (currentWordAttempt.length < LETTER_COUNT) {
          toast.error("Not enough letters!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        } else {
          validateWord();
        }
        return;
      }

      if (key === "DELETE") {
        setCurrentWordAttempt((prev) => prev.substring(0, prev.length - 1));
        return;
      }

      if (currentWordAttempt.length < LETTER_COUNT) {
        setCurrentWordAttempt((prev) => prev.concat(key.toLowerCase()));
      }
    },
    [currentWordAttempt, validateWord]
  );

  const reset = () => {
    setGameAttempts(DEFAULT_GAME_ATTEMPT_STATE);
    setIsGameCompleted(false);
    setCurrentAttemptIdx(0);
    setCurrentWordAttempt("");
    setGuessWord(getRandomWord());
  };

  return {
    validateWord,
    gameAttempts,
    currentWordAttempt,
    currentAttemptIdx,
    setCurrentWordAttempt,
    setGameAttempts,
    isGameCompleted,
    reset,
    handelInput,
  };
};

export default useWordle;
