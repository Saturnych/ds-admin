import { error, invalid } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	//const { data: contents, error: contents_error } = await supabaseAdminClient.from('content').select('*');
	//console.log('public.content data:', contents);
	//console.log('public.content error:', contents_error);

	//return { contents: contents || [], error: contents_error?.message || '' };
	//if (contents_error)	throw error(400, contents_error.message);
}
