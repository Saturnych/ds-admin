import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { logout } from '$lib/utils';
import PUBLIC_ENV from '$lib/public';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	if (PUBLIC_ENV.DEV) console.log('dashboard.server.load session?.user?.email:', session?.user?.email);
	if (!['ADMIN','SUPER'].includes(session?.user?.role)) {
		return logout(event, '/auth');
	}
	return { session };
};
