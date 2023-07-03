import type { PageServerLoad, Actions } from './$types';
import PUBLIC_ENV from '$lib/public';

export const load: PageServerLoad = async ({ data, parent }) => {
	const { session } = data || await parent();

	let users: User[] = [];
	if (session?.user?.role === 'SUPER') {
		//users = users_all;
	} else {
		//users = users_all.filter((user) => user.org == org);
	}
	// console.log(users)

	return { users };
};

export const actions: Actions = {
	create: async (event) => {
		const { session } = await getSupabase(event);

		if (!session) {
			// the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}

		const form_data = await event.request.formData();
		const email = form_data.get('email');
		// console.log(email)
		const password = form_data.get('password');
		// console.log(password)

		const organization = form_data.get('organization');
		// console.log(organization)

		const role = form_data.get('role');
		// console.log(role)

		if (PUBLIC_ENV.PUBLIC_DEMO_MODE == 'true') {
			return { error: true, message: 'USER CREATION DISABLED IN DEMO MODE!' };
		}

		/*
		const { data, error: create_error } = await supabaseClient.auth.admin.createUser({
			email,
			password,
			app_metadata: { org: organization, role: role }
		});
		*/
		// console.log(data, error)

		// console.log(data, create_error)
	},

	delete: async (event) => {
		if (PUBLIC_ENV.PUBLIC_DEMO_MODE == 'true') {
			return { error: true, message: 'USER DELETION DISABLED IN DEMO MODE!' };
		}

		const form_data = await event.request.formData();
		const user = form_data.get('user');

		if (user) {
			//const { data, error } = await supabaseClient.auth.admin.deleteUser(user.toString());
		} else {
			throw error(403, { message: 'USER NOT FOUND' });
		}
	}
};
