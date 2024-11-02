export function getRandomCharacter(): string {
  // Generate a random number between 0 and 25 to represent the alphabet's 26 letters
  const randomNumber: number = Math.floor(Math.random() * 26);
  // Use the character code for 'a' (97) and add the random number to it
  const randomCharacter: string = String.fromCharCode(97 + randomNumber);
  return randomCharacter;
}

export function getRandomMathCharacter(): string {
  const mathCharacters: string = "0123456789";
  const randomIndex: number = Math.floor(Math.random() * mathCharacters.length);
  return mathCharacters[randomIndex];
}

export function getRandomNumber(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min - 1)) + min + 1;
}
