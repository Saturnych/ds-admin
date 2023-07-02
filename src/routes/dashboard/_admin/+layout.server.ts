import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const session = event.locals?.session?.data;

	if (!session) {
		console.log('SESSION NOT FOUND');
		throw redirect(303, '/');
	}

	if (!session.user) {
		console.log('USER NOT FOUND');
		throw redirect(303, '/');
	}

	// console.log(session.user)

	if (session.user.role == 'user') {
		console.log('UNAUTHORIZED');
		throw redirect(303, '/dashboard');
	}
};
