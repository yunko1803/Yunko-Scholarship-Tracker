import request from 'superagent';
import { stringify } from 'query-string';

import { compactJoin, isBrowser, isDisableAPIPrefix, isProduction } from '../utils/misc';

const BASE_URL = process.env.BASE_API_URL || (isProduction()
  ? 'https://qwer.gg'
  : 'http://localhost:4000'
);

export const DEFAULT_HEADERS_FOR_SSR = {
  'X-Requested-From': 'SSR',
};

export class HttpError extends Error {
  public status: string;
  public code: number;

  constructor(json: any) {
    super(json.message);
    this.status = json.status;
    this.code = json.code;
  }
}

const handleResult = async (result: Response) => {
  const json = await result.json();
  if (!result.ok) {
    throw new HttpError(json);
  }

  return json;
};

export function getApiUrl(url: string): string {
  const path = _getApiPath(url);
  return isBrowser() ? path : [BASE_URL, path].join('');
}

function _getApiPath(path: string): string {
  return isDisableAPIPrefix() ? path : ['/api', path].join('');
}

// export const get = async <T>(url: string, query?: any, options: RequestInit = {}): Promise<T> => {
export async function get<T>(url: string, query?: any, options: RequestInit = {}): Promise<T> {
  // const requestUri = compactJoin([getApiUrl(url), query && `?${stringify(query)}`], '');

  const result = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  return await handleResult(result);
}

// export const post = async <T>(url: string, data: any = {}, options: RequestInit = {}): Promise<T> => {
export async function post<T>(url: string, data: any = {}, options: RequestInit = {}): Promise<T> {
  const result = await fetch(getApiUrl(url), {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  return handleResult(result);
}

export async function postData<T>(url: string, body: FormData, progressCallback?: (event: ProgressEvent) => void): Promise<T> {
  const deferred = request
    .post(getApiUrl(url))
    .send(body);

  if (progressCallback) {
    deferred.on('progress', progressCallback);
  }

  try {
    return (await deferred).body;
  } catch (e) {
    throw new Error(e.response.body.message);
  }
}

// export const put = async <T>(url: string, data: any, options: RequestInit = {}): Promise<T> => {
export async function put<T>(url: string, data: any = {}, options: RequestInit = {}): Promise<T> {
  const result = await fetch(getApiUrl(url), {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  return handleResult(result);
}

// export const remove = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
export async function remove<T>(url: string, data: any = {}, options: RequestInit = {}): Promise<T> {
  const result = await fetch(getApiUrl(url), {
    method: 'DELETE',
    ...options,
    headers: {
      ...options.headers,
    },
  });

  return handleResult(result);
}

const Request = {
  get,
  post,
  postData,
  put,
  delete: remove,
};

export default Request;
