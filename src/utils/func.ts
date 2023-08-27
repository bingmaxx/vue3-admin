import { LSKey } from '@/utils/public';

export const getSS = (key: string): any => JSON.parse(sessionStorage.getItem(key) || 'null');
export const setSS = (key: string, value: any): void => sessionStorage.setItem(key, JSON.stringify(value));
export const removeSS = (key: string): void => sessionStorage.removeItem(key);

export const getLS = (key: string): any => JSON.parse(localStorage.getItem(key) || 'null');
export const setLS = (key: string, value: any): void => localStorage.setItem(key, JSON.stringify(value));
export const removeLS = (key: string): void => localStorage.removeItem(key);

export const getToken = (): string => getLS(LSKey.token);
export const setToken = (value: string): void => setLS(LSKey.token, value);
export const removeToken = (): void => removeLS(LSKey.token);
