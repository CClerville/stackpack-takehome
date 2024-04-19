import { KEYBOARD_KEYS_ROW } from "@/constants";
import styles from "./Keyboard.module.css";
import { MouseEvent } from "react";

interface IKeyboard {
  onKeyboardClick: (e: MouseEvent) => void;
}

const Keyboard = ({ onKeyboardClick }: IKeyboard) => {
  const handleOnKeyboardClick = (e: MouseEvent) => {
    onKeyboardClick?.(e);
  };

  return (
    <div className={styles.container} onClick={handleOnKeyboardClick}>
      {KEYBOARD_KEYS_ROW.map((row: Array<string>, idx: number) => {
        return (
          <div className={styles.keysContainer} key={idx}>
            {row.map((key: string) => {
              return (
                <div className={styles.key} key={key} data-keyboard-key={key}>
                  {key}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
