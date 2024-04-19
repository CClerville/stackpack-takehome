export enum BlockLetterStatus {
  DEFAULT = "default",
  POSITION_SUCCESS = "position_success",
  POSITION_WRONG = "position_wrong",
  POSITION_NOT_EXIST = "position_not_exist",
}

export interface BlockLetter {
  id: string;
  letter: string;
  status:
    | BlockLetterStatus.POSITION_SUCCESS
    | BlockLetterStatus.POSITION_WRONG
    | BlockLetterStatus.POSITION_NOT_EXIST
    | BlockLetterStatus.DEFAULT;
}
