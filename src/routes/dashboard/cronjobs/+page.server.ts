import { error, invalid, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ data, locals, parent }) {
  const session = data?.session || locals?.session?.data || (await parent())?.session;
	console.log('dashboard/cronjobs load session:', session); // event.locals?.session?.data

	//const { session, supabaseClient } = await getSupabase(event);
	//console.log('cron.job supabaseClient.rest:', supabaseClient.rest);
	//console.log('cron.job session:', session);

	//const supabaseCronClient = supabaseCreateClient('cron');
	//const { data: cronjobs, error: cronjobs_error } = await supabaseCronClient.from('job').select('*');
	//console.log('cron.job data:', cronjobs);
	//console.log('cron.job error:', cronjobs_error);

	//return { cronjobs: cronjobs || [], error: cronjobs_error?.message || '' };
	//if (cronjobs_error)	throw error(400, cronjobs_error.message);
}
