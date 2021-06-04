import { flow, compact, join, memoize as memoizeFp } from 'lodash/fp';
import { SyntheticEvent } from 'react';
import { flatMap } from 'lodash';

const A_SECOND = 60

export function safelyGet<T>(callback: () => T): T | undefined {
  try {
    return callback();
  } catch (e) {
    return undefined;
  }
}

export async function safelyGetPromise<T>(callback: () => Promise<T>): Promise<T | undefined> {
  try {
    return await callback();
  } catch (e) {
    return undefined;
  }
}

export function https(url: string) {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }

  if (url.startsWith('//')) {
    return url.replace('//', 'https://');
  }

  return url;
}

const from = 'àáäâèéëêìíïîòóöôùúüûñç';
const to   = 'aaaaeeeeiiiioooouuuunc';

export function slugify(text: string) {
  text = text
    // .toLowerCase()
    .replace(/·\/_,:;\./g, '')
    .replace(/\./g, '')
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/,|%|\?/g, '')
    .replace(/-^\./, '')
    .trim();

  for (let i = 0, l = from.length ; i < l ; i++) {
    text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return text.endsWith('-') ? text.substring(0, text.length - 1) : text;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function requeue(callback: Function) {
  setTimeout(() => {
    callback();
  }, 0);
}

export function delay(second: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, second * A_SECOND);
  });
}

export const imagePreloader = (imageUrl: string) => new Promise<string>((resolve, reject) => {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onload = () => resolve(imageUrl);
  img.onerror = reject;
});

export const preloadImageRepeatedly = async (imageUrl: string, tried = 0): Promise<string> => {
  if (tried > 2) {
    throw new Error('TOO_MANY_RETRIES');
  }

  try {
    return await imagePreloader(imageUrl);
  } catch(e) {
    await delay(0.25 * tried + 1);
    return await preloadImageRepeatedly(imageUrl, tried + 1);
  }
};

export function isBrowser() {
  return typeof window === 'object';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function isDisableAPIPrefix() {
  return process.env.API_PREFIX === 'disabled';
}

export function urlify(text?: string) {
  if (!text) return '';

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(urlRegex, (url) => {
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  });
}

export function isMobile(): boolean {
  return isBrowser() && /Mobi|Android|FB_IAB|FBAN|FBAV/i.test(navigator.userAgent);
}

export function isIPhone(): boolean {
  return isBrowser() && /iPhone/i.test(navigator.userAgent);
}

export function isIOS(): boolean {
  return isBrowser() && /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isIE10(): boolean {
  return !isBrowser() && /MSIE 10/i.test(navigator.userAgent);
}

export function smoothScrollTop() {
  if (!isBrowser()) return;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

export function formatBytes(value: number | string, decimals = 2) {
  const bytes = typeof value === 'string' ? Number(value) : value;
  if (!bytes || bytes === 0) return (value && `${value} (0 bytes)`) || undefined;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${bytes} (${parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]})`;
}

export function normalize({ max, min }: { max: number; min: number; }) {
  return (value: number) => {
    if (min === max) return value;

    return (value - min) / (max - min);
  };
}

export const compactJoin = (x: Array<string | number | undefined | null | boolean>, y: string) => {
  return flow(
    compact,
    join(y),
  )(x);
};

type Defined<T, K extends keyof T = keyof T> = {
  [P in K]-?: Exclude<T[P], undefined | null>
}

export function hasDefined<T, K extends keyof T>(argument: T | Defined<T, K>, keys: K[]): argument is Defined<T, K> {
  return keys.every((key) => !!argument[key]);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(callback: any): callback is Function {
  return typeof callback === 'function';
}

export async function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function getTimestamp() {
  return new Date().getTime();
}

export const generateRandomColorByText = memoizeFp(function (text: string) {
  const seed = Math.abs(Math.sin(Number(text.split('').map((x) => x.charCodeAt(0)).join(''))));
  const hue = Math.floor(360 * seed); // 0-360
  const saturation = Math.floor(25 + 70 * seed);  // 25-95%
  const lightness = Math.floor(60 + 10 * seed); // 60-70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});

export function memoize<T>(method: (...args: any[]) => any): (...args: any[]) => T | Promise<T> {
  const cache: { [key: string]: any } = {};

  return async function(this: any, ...arr: any[]) {
    const args = JSON.stringify(arr);
    cache[args] = cache[args] || method.apply(this, arr);
    return cache[args];
  };
}

export function showCallStack() {
  try {
    throw new Error('Dummy');
  } catch (e) {
    console.info(e);
  }
}

export function nullable<T>(value: T | false): T | undefined {
  return value ? value : undefined;
}

export function preventDefault(event: SyntheticEvent | Event) {
  event.preventDefault();
}

export function stopPropagation(event: SyntheticEvent | Event) {
  event.stopPropagation();
}

export function abbreviateString(text: string, length = 50) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function stripHtmlTagsAndLines(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/\n/g, ' ');
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function getKeys<T extends object>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}

export function removeWhiteSpace(value?: string) {
  return value?.replace(/\s/g, '') || '';
}
