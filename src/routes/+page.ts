import type { PageLoad } from './$types';
import PUBLIC_ENV from '$lib/public';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	if (PUBLIC_ENV.DEV) console.log('page.load parent data:', data);
	return { session: undefined };
};
