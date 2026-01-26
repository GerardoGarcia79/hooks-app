interface ScrambleWordsState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWords: number;
  guess: string;
}

export type ScrambleWordsAction =
  | { type: "GUESS_SUBMIT"; payload: string }
  | { type: "SKIP" }
  | { type: "PLAY_AGAIN"; payload: ScrambleWordsState }
  | { type: "SET_GUESS"; payload: string };

export const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getScrambleWordsInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray(GAME_WORDS);

  return {
    words: shuffledWords,
    currentWord: shuffledWords[0],
    scrambledWord: scrambleWord(shuffledWords[0]),
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
    totalWords: shuffledWords.length,
    guess: "",
  };
};

export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction,
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };

    case "GUESS_SUBMIT": {
      if (action.payload === state.currentWord) {
        const updatedWords = state.words.slice(1);

        return {
          ...state,
          points: state.points + 1,
          words: updatedWords,
          currentWord: updatedWords[0],
          scrambledWord: scrambleWord(updatedWords[0]),
          guess: "",
        };
      }

      const newErrorCounter = state.errorCounter + 1;

      return {
        ...state,
        errorCounter: newErrorCounter,
        isGameOver: newErrorCounter >= state.maxAllowErrors,
        guess: "",
      };
    }

    case "SKIP": {
      const updatedWords = state.words.slice(1);

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guess: "",
      };
    }

    case "PLAY_AGAIN": {
      // ! No es una buena idea usar la fn asi, ya que nuestro reducer no debe usar código externo,
      // ! En este caso, la fn se manda en el payload al llamar la action
      // return getScrambleWordsInitialState();
      return action.payload;
    }

    default:
      return state;
  }
};
