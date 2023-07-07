import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { refreshSession, postAction, getAction, deleteAction } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	const token = await refreshSession(event);
	const { data } = await getAction(token, 'tariff');
	return { tariffs: data };
};

export const actions: Actions = {
	create: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		if (!session || !['ADMIN', 'SUPER'].includes(session.user.role)) {
			throw error(403, { message: 'Unauthorized' });
		}

		let tariffs: any[] = [];
		const form_data = await event.request.formData();
		const name = form_data.get('name');
		const credits = Math.round(Number(form_data.get('credits')));
		const cents = Math.round(Number(form_data.get('cost'))*100);
		const tariff = {
			name,
			credits,
			cents,
		}
		const token = await refreshSession(event);
	  const added = await postAction({ data: tariff }, token, 'tariff');
		console.log('dashboard/tariff create:', added);
		if (!!added?.data?.name) {
		  const { data } = await getAction(token, 'tariff');
		  console.log('dashboard/tariff create tariffs:', data);
			if (data) tariffs = data;
		}
		return { tariffs };
	},

	delete: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		if (!session || !['ADMIN', 'SUPER'].includes(session.user.role)) {
			throw error(403, { message: 'Unauthorized' });
		}
		let tariffs: any[] = [];
		const form_data = await event.request.formData();
		const id = form_data.get('id');
		if (id) {
			const token = await refreshSession(event);
		  const deleted = await deleteAction(token, 'tariff', id);
			console.log('dashboard/tariff delete:', deleted);
			if (deleted?.data) {
			  const { data } = await getAction(token, 'tariff');
			  console.log('dashboard/tariff delete tariffs:', data);
				if (data) tariffs = data;
			}
		} else {
			throw error(403, { message: 'TARIFF NOT FOUND' });
		}
		return { tariffs };
	}
};
