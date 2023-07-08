import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import PUBLIC_ENV from '$lib/public';

export const load: LayoutServerLoad = async ({ data, locals, parent }) => {
	const session = data?.session || locals?.session?.data || (await parent())?.session;
	console.log('dashboard/_super load session:', session); // event.locals?.session?.data

	if (!session) {
		if (PUBLIC_ENV.DEV) console.error('SESSION NOT FOUND');
		throw redirect(303, '/');
	}

	if (!session.user) {
		if (PUBLIC_ENV.DEV) console.error('USER NOT FOUND');
		throw redirect(303, '/');
	}

	if (!['SUPER'].includes(session?.user?.role)) {
		throw redirect(303, '/dashboard');
	}
};
