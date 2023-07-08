import { error, invalid, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { postData, getData, deleteData } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
	const { data } = await getData(event, session.accessToken, 'influencer');
	return { influencers: data };
};

export const actions: Actions = {
	create: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		if (!['ADMIN', 'SUPER'].includes(session?.user?.role)) {
			throw error(403, { message: 'Unauthorized' });
		}

		let influencers: any[] = [];
		const form_data = await event.request.formData();
		const name = form_data.get('name');
		const cents = Math.round(Number(form_data.get('cost'))*100);
		const origin = form_data.get('origin');
		const nickname = form_data.get('nickname');
		const id_str = form_data.get('id_str');
		const influencer = {
			name,
			cents,
			platforms: [
				{
					origin,
					id_str,
					name: nickname,
					screen_name: nickname,
				}
			]
		}
	  const added = await postData(event, { data: influencer }, session.accessToken, 'influencer');
		console.log('dashboard/influencer create:', added);
		if (!!added?.data?.name) {
		  const { data } = await getData(event, session.accessToken, 'influencer');
		  console.log('dashboard/influencer create influencers:', data);
			if (data) influencers = data;
		}
		return { influencers };
	},

	delete: async (event) => {
		const session = event.data?.session || event.locals?.session?.data || (await event.parent())?.session;
		if (!['ADMIN', 'SUPER'].includes(session?.user?.role)) {
			throw error(403, { message: 'Unauthorized' });
		}
		let influencers: any[] = [];
		const form_data = await event.request.formData();
		const id = form_data.get('id');
		if (id) {
		  const deleted = await deleteData(event, session.accessToken, 'influencer', id);
			console.log('dashboard/influencer delete:', deleted);
			if (deleted?.data) {
			  const { data } = await getData(event, session.accessToken, 'influencer');
			  console.log('dashboard/influencer delete influencers:', data);
				if (data) influencers = data;
			}
		} else {
			throw error(403, { message: 'INFLUENCER NOT FOUND' });
		}
		return { influencers };
	}
};
