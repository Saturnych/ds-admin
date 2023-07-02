import type { PageServerLoad, Actions } from './$types';
import { error, invalid, redirect } from '@sveltejs/kit';
import PUBLIC_ENV from '$lib/public';

const dir = PUBLIC_ENV.PUBLIC_FILES_CONTENT;

export const load: PageServerLoad = async (event) => {
	console.log(event.url);
	throw redirect(303, `${event.url.pathname}/${dir}`);
};
