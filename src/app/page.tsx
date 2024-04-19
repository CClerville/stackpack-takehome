"use client";
import Keyboard from "@/components/Keyboard/Keyboard";
import { MouseEvent, useCallback, useEffect } from "react";
import styles from "./page.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WordGrid from "@/components/WordGrid/WordGrid";
import { ALL_KEYBOARD_KEYS } from "@/constants";
import useWordle from "@/hooks/useWordle";

export default function Home() {
  const {
    gameAttempts,
    currentWordAttempt,
    currentAttemptIdx,
    isGameCompleted,
    reset,
    handelInput,
  } = useWordle();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isGameCompleted) return;

      if (e.metaKey) return;

      if (e.keyCode === 8) {
        handelInput("DELETE");
        return;
      }

      if (e?.keyCode === 13) {
        handelInput("ENTER");
        return;
      }

      if (ALL_KEYBOARD_KEYS.has(e.key.toUpperCase())) {
        handelInput(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handelInput, isGameCompleted]);

  const handleOnKeyboardClick = useCallback(
    (e: MouseEvent) => {
      if (isGameCompleted) return;

      if (e.target instanceof HTMLElement) {
        const key = e?.target?.dataset?.keyboardKey ?? "";
        handelInput(key);
      }
    },
    [handelInput, isGameCompleted]
  );

  const handleOnPlayAgain = () => {
    reset();
  };

  return (
    <div className={styles.main}>
      <WordGrid
        gameAttempts={gameAttempts}
        currentWordAttempt={currentWordAttempt}
        currentAttemptIdx={currentAttemptIdx}
      />
      <Keyboard onKeyboardClick={handleOnKeyboardClick} />
      {isGameCompleted && (
        <>
          <button
            className={styles.playAgainButton}
            onClick={handleOnPlayAgain}
          >
            play again
          </button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
