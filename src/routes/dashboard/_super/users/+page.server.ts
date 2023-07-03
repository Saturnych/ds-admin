import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { refreshSession, postAction, getAction, deleteAction } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	console.log('dashboard/_super/users load session:', session); // event.locals?.session?.data
	const token = await refreshSession(event);
	const { data } = await getAction(token, 'user');
	return { users: data };
};

export const actions: Actions = {
	create: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		console.log('dashboard/_super/users create session:', session); // event.locals?.session?.data

		if (!session || !['SUPER'].includes(session.user.role)) {
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
		const token = await refreshSession(event);
	  const added = await postAction(user, token, 'user');
		console.log('dashboard/user create:', added);
		if (!!added.email) {
		  const { data } = await getAction(token, 'user');
		  console.log('dashboard/user create users:', data);
			if (data) users = data;
		}
		return { users };
	},

	delete: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		console.log('dashboard/_super/users delete session:', session); // event.locals?.session?.data

		if (!session || !['SUPER'].includes(session.user.role)) {
			throw error(403, { message: 'Unauthorized' });
		}

		let users = [];
		const form_data = await event.request.formData();
		const id = form_data.get('id');

		if (id) {
			const token = await refreshSession(event);
		  const deleted = await deleteAction(token, 'user', id);
			console.log('dashboard/user delete:', deleted);
			if (deleted.data) {
			  const { data } = await getAction(token, 'user');
			  console.log('dashboard/user delete users:', data);
				if (data) users = data;
			}
		} else {
			throw error(403, { message: 'USER NOT FOUND' });
		}
		return { users };
	}
};
