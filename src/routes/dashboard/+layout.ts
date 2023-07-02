import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, parent }) => {
	const { session } = data || await parent();
	console.log('dashboard/layout.load session:', session?.user?.email);
	return { session };
};
