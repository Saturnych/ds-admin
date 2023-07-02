import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = event.locals?.session?.data;
	console.log('layout.server.load session?.user?.email:', session?.user?.email);
	return { session };
};
