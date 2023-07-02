import { error, invalid } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
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
