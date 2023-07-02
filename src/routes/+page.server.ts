import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async (event) => {
	const session = event.locals?.session?.data;
	console.log('page.server.load session?.user?.email:', session?.user?.email);
	throw redirect(303, '/auth');
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
