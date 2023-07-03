import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ data, locals, parent }) => {
	const session = data?.session || locals?.session?.data || (await parent())?.session;
	console.log('dashboard/_super load session:', session); // event.locals?.session?.data

	if (!session) {
		console.log('SESSION NOT FOUND');
		throw redirect(303, '/auth');
	}

	if (!session.user) {
		console.log('USER NOT FOUND');
		throw redirect(303, '/auth');
	}

	if (session.user.role !== 'SUPER') {
		console.log('UNAUTHORIZED');
		throw redirect(303, '/dashboard');
	}
};
