import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	console.log('page.load parent data:', data);
	return { session: undefined };
};
