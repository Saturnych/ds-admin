import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getData } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
  const { data } = await getData(event, session.accessToken, 'game');
  return { games: data };
}
