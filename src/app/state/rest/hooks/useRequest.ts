import { useCallback } from 'react';
import axios, { Method, AxiosError } from 'axios';

export type { Method } from 'axios';
export type RequestError = AxiosError

export default () => useCallback(
  async <Schema>(method: Method, url: string, data?: any, headers = {}) => // TODO any used to be Schema | unknown
    await axios.request<Schema>({
      method,
      url,
      headers,
      data,
    }),
  [],
);
