import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { refreshSession, postAction, getAction } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	console.log('dashboard/games load session:', session); // event.locals?.session?.data

  const token = await refreshSession(event);
  const { data } = await getAction(token, 'game');
  console.log('dashboard/games load games:', data);

  return { games: data };
}
