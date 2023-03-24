import { Cache } from './cache';
import { name, version } from '../../../package.json';
interface CacheType {
  TOKEN: string;
}
const cache = new Cache<CacheType>(name, version);

export function getToken() {
  return cache.get('TOKEN');
}

export function setToken(token: string) {
  return cache.set('TOKEN', token);
}

export function removeToken() {
  return cache.remove('TOKEN');
}