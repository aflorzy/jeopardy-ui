export interface Game {
  gameId: number;
  title: string;
  contestants: Contestant[];
  jeopardy: Round;
  doubleJeopardy: Round;
  finalJeopardy: Final;
}
export interface Round {
  title: string;
  categories: Category[];
  finalScores: Score[];
}
export interface Final {
  title: string;
  categoryName: string;
  categoryComments?: string | null;
  clueText: string;
  correctResponse: string;
  tapeDate: string;
  finalScores: Score[];
}
export interface Category {
  categoryName: string;
  categoryComments?: string | null;
  clues: Clue[];
}
export interface Clue {
  clueValue: string;
  clueOrderNumber: string;
  clueText: string;
  clueMultimediaURL?: string | null;
  correctResponse: string;
  boardPositionX: number;
  boardPositionY: number;
}
export interface Contestant {
  playerFullName: string;
  playerOccupationAndOrigin: string;
  playerId: string;
}
export interface Score {
  scorePlayerNickname: string;
  scorePositive: string;
  scoreRemarks?: string | null;
}
export interface Season {
  seasonNumber: string;
  gameIDs: number[];
}
