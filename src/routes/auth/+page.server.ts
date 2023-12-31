import { error, invalid, fail, redirect } from '@sveltejs/kit';
import { writable, get } from 'svelte/store';
import type { Actions, PageServerLoad } from './$types';
import { postAction, saveSession } from '$lib/utils';
import { userId } from '$lib/stores';
import PUBLIC_ENV from '$lib/public';

export const load: PageServerLoad = async ({ data, locals, parent }) => {
	const session = data?.session || locals?.session?.data || (await parent())?.session;
	if (PUBLIC_ENV.DEV) console.log('auth.server.load session:', session); // event.locals?.session?.data

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
		const post = await postAction({ password, email }, '', 'auth', 'signin');
		if (PUBLIC_ENV.DEV) console.info('signin post:', post);

		if (!post || post?.error || post?.status>399 || !post?.data || !['ADMIN','SUPER'].includes(post.data?.user?.role)) {
			return fail(post?.status || 400, {
				error: post?.statusText || 'Server error',
				values: {
					email
				}
			});
		} else {
			const { accessToken, refreshToken, user } = post.data;
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
