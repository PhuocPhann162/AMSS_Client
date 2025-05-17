import { User } from '@/interfaces';

class AuthStorage {
  public readonly STORAGE_KEYS = {
    ACCESS_TOKEN: 'access-token',
    REFRESH_TOKEN: 'refresh-token',
    USER_KEY: 'user',
  } as const;

  public setAccessToken(accessToken: string) {
    localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  public setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  public setUser(user: User) {
    localStorage.setItem(this.STORAGE_KEYS.USER_KEY, JSON.stringify(user));
  }

  public getAccessToken() {
    return localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN) ?? undefined;
  }

  public getRefreshToken() {
    return localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN) ?? undefined;
  }

  public getUser() {
    const user = localStorage.getItem(this.STORAGE_KEYS.USER_KEY);

    if (!user) return undefined;

    try {
      return JSON.parse(user) as User;
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      return undefined;
    }
  }

  // TODO: consider deleting
  // public removeItem(
  //   key: (typeof this.STORAGE_KEYS)[keyof typeof this.STORAGE_KEYS],
  // ) {
  //   localStorage.removeItem(key);
  // }

  public clearAll() {
    Object.values(this.STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

export const authStorage = new AuthStorage();
