import Axios from 'axios';
const axios = Axios.create();

export const http = {
  get: function get<Response = unknown>(url: string) {
    return axios.get<Response>(url).then(res => res.data);
  },
  post: async function post<Request = unknown, Response = unknown>(url: string, data?: Request) {
    const response = axios.post<Response>(url, { data }).then(res => res.data);

    if ('ok' in response && !response.ok) {
      throw new Error(`${url} 요청에 실패했습니다. data: ${JSON.stringify(data)}`);
    }

    return response;
  },
  delete: function del<Response = unknown>(url: string) {
    return axios.delete<Response>(url).then(res => res.data);
  },
};

export type CommonPostResponse = { ok: boolean };
