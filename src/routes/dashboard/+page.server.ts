import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { session } = await event.parent();
	console.log('dashboard.server.load session?.user?.email:', session?.user?.email);
	return { session };
};
