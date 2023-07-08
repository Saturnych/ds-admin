import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { logout } from '$lib/utils';
import PUBLIC_ENV from '$lib/public';

export const load = async (event) => {
	const session = event.data?.session || event.locals?.session?.data;
	if (PUBLIC_ENV.DEV) console.log('page.server.load session?.user?.email:', session?.user?.email);
	if (!['ADMIN','SUPER'].includes(session?.user?.role)) {
		return logout(event, '/auth');
	} else {
		throw redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
	default: async (event) => {
		//const { counter = 0 } = event.locals.session.data;
		//await event.locals.session.set({ counter: counter + 1 });
		return {};
	},
	updateSession: async (event) => {
		//await event.locals.session.update(({ count }) => ({ count: count ? count + 1 : 0 }));
		return {};
	}
};
