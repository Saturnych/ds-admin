import type { PageServerLoad, Actions } from './$types';
import { postAction, saveSession } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.locals?.session?.data;
	const user = session?.user;
	console.log('/profile session.user:', user);
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

		const data = await postAction({ id: session.userId, data: { firstname, lastname } }, session.accessToken, 'user', session.userId);
		console.error('user.update data:', data);

		if (data)	{
			session.user.firstName = firstname;
			session.user.lastname = lastname;
			await saveSession(event, session);
		}

		//const { data, error } = await supabaseClient.auth.updateUser({ data: { name: user_name } });
		//console.log(data, error);
	}
};
