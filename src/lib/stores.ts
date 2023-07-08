import { get, writable } from 'svelte/store';

const userIdStore = writable('');
export const userId = {
  get: () => get(userIdStore),
  set: (v) => userIdStore.set(v),
  subscribe: (f) => userIdStore.subscribe(f),
};

const accessTokenStore = writable('');
export const accessToken = {
  get: () => get(accessTokenStore),
  set: (v) => accessTokenStore.set(v),
  subscribe: (f) => accessTokenStore.subscribe(f),
};
