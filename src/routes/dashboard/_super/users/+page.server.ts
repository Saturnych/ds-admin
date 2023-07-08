import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { postData, getData, deleteData } from '$lib/utils';
import PUBLIC_ENV from '$lib/public';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	const { data } = await getData(event, session.accessToken, 'user');
	return { users: data };
};

export const actions: Actions = {
	create: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		if (PUBLIC_ENV.DEV) console.log('dashboard/_super/users create session:', session); // event.locals?.session?.data

		if (!['SUPER'].includes(session?.user?.role)) {
			throw error(403, { message: 'Unauthorized' });
		}

		let users = [];
		const form_data = await event.request.formData();
		const email = form_data.get('email');
		const password = form_data.get('password');
		const role = form_data.get('role');
		const user = {
			email,
			password,
			role,
		}
	  const added = await postData(event, user, session.accessToken, 'user');
		if (PUBLIC_ENV.DEV) console.log('dashboard/user create:', added);
		if (!!added.email) {
		  const { data } = await getData(event, session.accessToken, 'user');
		  if (PUBLIC_ENV.DEV) console.log('dashboard/user create users:', data);
			if (data) users = data;
		}
		return { users };
	},

	delete: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;

		if (!['SUPER'].includes(session?.user?.role)) {
			throw error(403, { message: 'Unauthorized' });
		}

		let users = [];
		const form_data = await event.request.formData();
		const id = form_data.get('id');

		if (id) {
		  const deleted = await deleteData(event, session.accessToken, 'user', id);
			if (PUBLIC_ENV.DEV) console.log('dashboard/user delete:', deleted);
			if (deleted.data) {
			  const { data } = await getData(event, session.accessToken, 'user');
			  if (PUBLIC_ENV.DEV) console.log('dashboard/user delete users:', data);
				if (data) users = data;
			}
		} else {
			throw error(403, { message: 'USER NOT FOUND' });
		}
		return { users };
	}
};
