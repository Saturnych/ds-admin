import { error, fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	throw error(404, { message: 'Not found' });
};
