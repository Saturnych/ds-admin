import type { LayoutLoad } from './$types';
import { userId, accessToken } from '$lib/stores';
import PUBLIC_ENV from '$lib/public';

export const load: LayoutLoad = async ({ data }) => {
	const session = data?.session;
	userId.set(session?.userId || '');
	accessToken.set(session?.accessToken || '');
	if (PUBLIC_ENV.DEV) console.log('layout.load session:', session?.user?.email, userId.get());
	return { session };
};
