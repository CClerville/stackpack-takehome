import { WORDS_LIST } from "@/constants";

export const getRandomWord = () => {
  const randomIdx = Math.floor(Math.random() * WORDS_LIST.length);
  return WORDS_LIST[randomIdx];
};
