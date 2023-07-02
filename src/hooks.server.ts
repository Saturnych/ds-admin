import { handleSession } from 'svelte-kit-cookie-session';

import PRIVATE_ENV from '$lib/private';

// Or pass your handle function as second argument to handleSession
export const handle = handleSession({ secret: PRIVATE_ENV.PRIVATE_ENCRYPT_KEY }, ({ event, resolve }) => {
		// event.locals is populated with the session `event.locals.session`
		// Do anything you want here
		const uid = event.cookies.get('uid');
		console.log('hooks.server cookies.uid:', uid);
		return resolve(event);
});
