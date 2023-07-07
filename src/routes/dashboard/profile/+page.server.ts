import { postAction, saveSession } from '$lib/utils';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ data, locals, parent }) => {
	const session = data?.session || locals?.session?.data || (await parent())?.session;
	console.log('dashboard/profile load session:', session); // event.locals?.session?.data
	const user = session?.user;
	return user;
};

export const actions: Actions = {
	save: async (event: any) => {
		const session = event.locals?.session?.data;
		if (!!!session.accessToken) return;
		console.log('profile session:', session);

		const form_data = await event.request.formData();
		const firstname = form_data.get('firstname');
		const lastname = form_data.get('lastname');
		console.log('profile SAVING:', firstname, lastname);

		const updated = await postAction({ id: session.userId, data: { firstname, lastname } }, session.accessToken, 'user', session.userId);
		console.error('user.update:', updated);

		if (updated?.data)	{
			session.user.firstname = firstname;
			session.user.lastname = lastname;
			await saveSession(event, session);
		}

		const user = session?.user;
		return user;
	}
};
