import { BlockLetterStatus } from "@/types";
import styles from "./LetterBlock.module.css";

interface ILetterBlock {
  letter: string;
  status: (typeof BlockLetterStatus)[keyof typeof BlockLetterStatus];
}

const LetterBlock = ({ letter, status }: ILetterBlock) => {
  return (
    <div className={`${styles.container}`} data-status={status}>
      {letter}
    </div>
  );
};

export default LetterBlock;
