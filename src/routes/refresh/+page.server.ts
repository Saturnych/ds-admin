import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { refreshSession } from '$lib/utils';

export const actions: Actions = {
	default: async (event) => await refreshSession(event),
	refresh: async (event) => await refreshSession(event),
};
