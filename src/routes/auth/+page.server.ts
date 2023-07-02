import { fail, redirect } from '@sveltejs/kit';
import { writable, get } from 'svelte/store';
import type { Actions, PageServerLoad } from './$types';
import { postAction, saveSession } from '$lib/utils';
import { userId } from '$lib/stores';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	console.log('auth.server.load session:', session, event.locals?.session?.data); // event.locals?.session?.data
	// or
	// event.locals.session.data;

	// Already logged in:
	if (session?.userId) {
		throw redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
	signin: async (event) => {
		const formData: FormData = await event.request.formData();
		const password = formData.get('password') as string;
		const email = formData.get('email').toLowerCase() as string;
		const to = formData.get('to') as string;
		console.error('signin formData:', formData);

		const data = await postAction({ password, email });
		console.error('signin data:', data);

		if (!data || data?.error || data.statusCode>399) {
			if (data?.error?.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				});
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		} else {
			const { accessToken, refreshToken, user } = data;
			userId.set(user.id);
			await saveSession(event, { userId: user.id, user, accessToken, refreshToken });
		}

		if (!!to) {
			throw redirect(303, to);
		} else {
			throw redirect(303, '/dashboard');
		}
	},

	signout: async (event) => {
		await event.locals.session.destroy();
		throw redirect(303, '/auth');
	}
};
