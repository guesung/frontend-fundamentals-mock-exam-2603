import Axios from 'axios';
const axios = Axios.create();

export class HttpError extends Error {
  constructor(public readonly serverMessage?: string) {
    super(serverMessage ?? 'Request failed');
  }
}

function isFailedResponse(data: unknown): data is { ok: false; message?: string } {
  return typeof data === 'object' && data !== null && 'ok' in data && data.ok === false;
}

axios.interceptors.response.use(
  response => {
    if (isFailedResponse(response.data)) throw new HttpError(response.data.message);
    return response;
  },
  error => {
    throw new HttpError(error.response?.data?.message);
  }
);

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then(res => res.data);
  },
  post: async function post<Request = unknown, Response = unknown>(url: string, data?: Request) {
    return axios.post<Response>(url, { data });
  },
  delete: function del<Response = unknown>(url: string) {
    return axios.delete<Response>(url).then(res => res.data);
  },
};

export type CommonPostResponse = { ok: boolean };
