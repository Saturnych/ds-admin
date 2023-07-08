import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import PUBLIC_ENV from '$lib/public';

export const load: LayoutServerLoad = async (event) => {
	const session = event.locals?.session?.data;

	if (!session) {
		if (PUBLIC_ENV.DEV) console.error('SESSION NOT FOUND');
		throw redirect(303, '/');
	}

	if (!session.user) {
		if (PUBLIC_ENV.DEV) console.error('USER NOT FOUND');
		throw redirect(303, '/');
	}

	if (!['ADMIN','SUPER'].includes(session?.user?.role)) {
		throw redirect(303, '/dashboard');
	}
};
