import { v4 as uuidv4 } from "uuid";
import { BlockLetter, BlockLetterStatus } from "../types";

export const NUM_GAME_ATTEMPS: number = 6;
export const LETTER_COUNT: number = 5;

export const DEFAULT_GAME_ATTEMPT_STATE = new Map<string, Array<BlockLetter>>();
Array(NUM_GAME_ATTEMPS)
  .fill(null)
  .forEach(() => {
    DEFAULT_GAME_ATTEMPT_STATE.set(
      uuidv4(),
      Array(LETTER_COUNT)
        .fill(null)
        .map(() => ({
          id: uuidv4(),
          letter: "",
          status: BlockLetterStatus.DEFAULT,
        }))
    );
  });

export const DEFAULT_GAME_ATTEMPT_STATE_KEYS: Array<string> = [
  ...DEFAULT_GAME_ATTEMPT_STATE.keys(),
];

export const KEYBOARD_KEYS_ROW: Array<Array<string>> = [
  "Q,W,E,R,T,Y,U,I,O,P".split(","),
  "A,S,D,F,G,H,J,K,L".split(","),
  "ENTER,Z,X,C,V,B,N,M,DELETE".split(","),
];

export const ALL_KEYBOARD_KEYS = new Set([
  ...KEYBOARD_KEYS_ROW[0],
  ...KEYBOARD_KEYS_ROW[1],
  ...KEYBOARD_KEYS_ROW[2],
]);

export const WORDS_LIST: Array<string> = [
  "apple",
  "beach",
  "chair",
  "dance",
  "eagle",
  "fancy",
  "giant",
  "happy",
  "image",
  "jelly",
  "kitty",
  "lemon",
  "mango",
  "night",
  "ocean",
  "piano",
  "queen",
  "roast",
  "smile",
  "table",
  "unity",
  "vivid",
  "witty",
  "xenon",
  "young",
  "zebra",
  "angel",
  "badge",
  "crane",
  "dream",
  "enjoy",
  "flame",
  "grape",
  "hatch",
  "ideal",
  "joker",
  "knife",
  "leash",
  "magic",
  "novel",
  "opera",
  "peach",
  "quick",
  "rainy",
  "sound",
  "tiger",
  "under",
  "vault",
  "waltz",
  "abide",
  "bloom",
  "charm",
  "daisy",
  "emote",
  "flair",
  "grace",
  "heart",
  "inlay",
  "joust",
  "kiosk",
  "lunar",
  "mirth",
  "noble",
  "oasis",
  "quiet",
  "rally",
  "sweet",
  "tease",
  "vital",
  "yield",
  "acorn",
  "bliss",
  "chime",
  "dandy",
  "earth",
  "fable",
  "grain",
  "honey",
  "jolly",
  "karma",
  "merry",
  "niche",
  "orbit",
  "quest",
  "rusty",
  "sleek",
  "trend",
  "upper",
  "value",
  "whale",
];
