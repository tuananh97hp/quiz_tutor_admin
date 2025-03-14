import http from '@/configs/http.config';

export class BaseService {
  prepareConfigWithToken(accessToken: string) {
    return {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: false,
      params: {},
    };
  }

  apiGet(path: string, accessToken: string, params?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);
    const config = { ...preConfig, params };

    return http.get(path, config);
  }

  apiPut(path: string, accessToken: string, payload?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.put(path, payload, preConfig);
  }

  apiPost(path: string, accessToken: string, payload?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.post(path, payload, preConfig);
  }

  apiDelete(path: string, accessToken: string) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.delete(path, preConfig);
  }
}
