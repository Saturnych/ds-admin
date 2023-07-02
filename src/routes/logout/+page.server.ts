import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { logout } from '$lib/utils';

export const load: PageServerLoad = async (event) => await logout(event);

export const actions: Actions = {
	default: async (event) => await logout(event),
};
