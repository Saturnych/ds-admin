import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	const session = data?.session;
	console.log('layout.load session:', session?.user?.email);
	return { session };
};
