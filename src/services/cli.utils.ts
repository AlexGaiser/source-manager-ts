import { VALID_YES_ANSWERS } from '../config';

export function isYesAnswer(str: string): boolean {
  return VALID_YES_ANSWERS.includes(str.trim());
}

export function unformat(str: string) {
  return str.toLowerCase().trim();
}
