import { includes } from 'lodash';

export const BACKSPACE = 8;
export const TAB = 9;
export const ENTER = 13;
export const NEGATIVE = 189;
export const ESC = 27;

export const LEFT = 37;
export const UP = 38;
export const RIGHT = 39;
export const DOWN = 40;

export function isArrowKey(keyCode: number): boolean {
  return includes([LEFT, UP, RIGHT, DOWN], keyCode);
}

export function isVerticalKey(keyCode: number): boolean {
  return includes([UP, DOWN], keyCode);
}

export function isHorizontalKey(keyCode: number): boolean {
  return includes([LEFT, RIGHT], keyCode);
}

