import { get, writable } from 'svelte/store';
import { genAccessToken } from '$lib/utils';

const userIdStore = writable('');
export const userId = {
  get: () => get(userIdStore),
  set: (v) => userIdStore.set(v),
  subscribe: (f) => userIdStore.subscribe(f),
};

const refreshTokenStore = writable('');
export const refreshToken = {
  get: () => get(refreshTokenStore),
  set: (v) => refreshTokenStore.set(v),
  subscribe: (f) => refreshTokenStore.subscribe(f),
};

const accessTokenStore = writable('');
export const accessToken = {
  get: () => get(accessTokenStore),
  set: (v) => accessTokenStore.set(v),
  subscribe: (f) => accessTokenStore.subscribe(f),
  generate: async () => {
    const at = await genAccessToken(refreshToken.get());
    if (!!at) accessTokenStore.set(at);
    return at;
  },
};
