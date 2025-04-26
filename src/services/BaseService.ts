import http from '@/configs/http.config';

export class BaseService {
  prepareConfigWithToken(accessToken: string, otherHeaders?: any) {
    return {
      headers: { Authorization: `Bearer ${accessToken}`, ...otherHeaders },
      withCredentials: false,
      params: {},
    };
  }

  apiGet(path: string, accessToken: string, params?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);
    const config = { ...preConfig, params };

    return http.get(path, config);
  }

  apiGetFile(path: string, accessToken: string, params?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);
    const config = { ...preConfig, params };

    return http.get(path, { ...config, responseType: 'blob' });
  }

  apiPut(path: string, accessToken: string, payload?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.put(path, payload, preConfig);
  }

  apiPost(path: string, accessToken: string, payload?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.post(path, payload, preConfig);
  }

  apiPostFile(path: string, accessToken: string, payload?: any) {
    let preConfig = this.prepareConfigWithToken(accessToken, {
      'Content-Type': 'multipart/form-data',
    });

    return http.post(path, payload, preConfig);
  }

  apiDelete(path: string, accessToken: string) {
    let preConfig = this.prepareConfigWithToken(accessToken);

    return http.delete(path, preConfig);
  }
}
