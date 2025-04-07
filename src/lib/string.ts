export const getFirstTwoCharacters = (input: string) => {
  const words = input
    .trim()
    .split(' ')
    .filter((word) => !!word.length);

  if (!words.length) return '';

  const firstWord = words[0];

  const result = firstWord
    .substring(0, Math.min(2, firstWord.length))
    .toUpperCase();

  return result;
};
