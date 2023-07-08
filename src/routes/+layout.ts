import type { LayoutLoad } from './$types';
import PUBLIC_ENV from '$lib/public';

export const load: LayoutLoad = async ({ data }) => {
	const session = data?.session;
	if (PUBLIC_ENV.DEV) console.log('layout.load session:', session?.user?.email);
	return { session };
};
