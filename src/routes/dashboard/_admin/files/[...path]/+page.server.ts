import type { PageServerLoad, Actions } from './$types';
//import type { User } from '@supabase/supabase-js';
//import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, invalid, redirect } from '@sveltejs/kit';
//import { supabaseAdminClient as supabaseClient } from '$lib/server/supabase';
import { createHash, postWhisperTranscript } from '$lib/utils';
import PUBLIC_ENV from '$lib/public';

const bucket = PUBLIC_ENV.PUBLIC_FILES_BUCKET;

const createSignedUrls = async (filePaths, ts = 600) => { // 10 minutes
	try {
		return await supabaseClient.storage.from(bucket)
			.createSignedUrls([].concat(filePaths), ts);
	} catch (err) {
		console.error(err);
	}
};

const getPublicUrl = async (filePath) => {
	try {
		return await supabaseClient.storage.from(bucket)
			.getPublicUrl(filePath);
	} catch (err) {
		console.error(err);
	}
};

const getFiles = async (dir, search = '', offset = 0, limit = 100, sortBy = { column: 'updated_at', order: 'desc' }) => {
	try {
		const {	data, error } = await supabaseClient.storage.from(bucket)
			.list(dir, { limit, offset, sortBy, search });
		const files = data.filter((file) => file.name!=='.emptyFolderPlaceholder') //.map((file) => { publicUrl: (await getPublicUrl(`${dir}/${file.name}`)), ...file });
		return { files, error };
	} catch (err) {
		console.error(err);
	}
};

const uploadFile = async (filePath, fileBuffer) => {
	try {
		return await supabaseClient.storage.from(bucket)
			.upload(filePath, fileBuffer, { cacheControl: '3600',	upsert: false	});
	} catch (err) {
		console.error(err);
	}
};

const deleteFiles = async (filePaths) => {
	try {
		return await supabaseClient.storage.from(bucket)
			.remove([].concat(filePaths));
	} catch (err) {
		console.error(err);
	}
};

export const load: PageServerLoad = async (event) => {
	try {
		const dir = event.params?.path || PUBLIC_ENV.PUBLIC_FILES_CONTENT;
		const { session } = await getSupabase(event);
		if (!session) { // the user is not signed in
			throw error(403, { message: 'Unauthorized' });
		}
		// console.log(session)
		//const org = session?.user.org;
		//const role = session?.user.role;
		// console.log(org)
		const { files, error } = await getFiles(dir);
		return { message: '', error, files, bucket, dir };
	} catch (err) {
		console.error(err);
		const { files } = await getFiles(dir);
		return { message: 'Error getting files!', error: true, files, bucket, dir };
	}
};

export const actions: Actions = {
	create: async (event) => {
		let dir = event.params?.path || PUBLIC_ENV.PUBLIC_FILES_CONTENT;
		let error = false;
		const errors = [];
		try {
			const { session } = await getSupabase(event);
			if (!session) { // the user is not signed in
				throw error(403, { message: 'Unauthorized' });
			}

			const sizeLimit = Number(PUBLIC_ENV.PUBLIC_ASR_FILESIZE_LIMIT || '50000000');
			const fileTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a']; //

			const form_data = await event.request.formData();
			const file = form_data.get('file');
			if (file?.size > 0) {
				const fileBuffer = new Uint8Array(await file.arrayBuffer());
				const hash = createHash(fileBuffer);
				console.log('hash:', hash, 'file:', file);

				const whisper = form_data.get('whisper') || false;
				const filename = form_data.get('filename').replaceAll(' ','_').replaceAll('-','_');

				const { files: found } = await getFiles(dir, hash);
				console.log('found:', found?.length);

				if (found?.length>0) {
					const { files } = await getFiles(dir);
					return { message: 'FILE DUPLICATE!', error: true, files, bucket, dir };
				}

				if (!!whisper) {
					if (file.size > sizeLimit) {
						const { files } = await getFiles(dir);
						return { message: 'FILE IS TOO BIG!', error: true, files, bucket, dir };
					}

					if (!fileTypes.includes(file.type)) {
						const { files } = await getFiles(dir);
						return { message: 'FILE TYPE IS NOT SUPPORTED', error: true, files, bucket, dir };
					}

					dir = PUBLIC_ENV.PUBLIC_FILES_WHISPER;
					const format = PUBLIC_ENV.PUBLIC_ASR_FORMAT || 'json';
					const form = new FormData();
					form.append('audio_file', file);
					postWhisperTranscript(form, async function(res) {
						console.log('postWhisperTranscript res:', res?.text);
						if (res?.text) {
							const { data, error: upload_error } = await uploadFile(`${dir}/${hash}-${filename}.${format}`, Buffer.from(JSON.stringify(res)));
							console.log('upload json:', data, upload_error);
							if (!upload_error) throw redirect(303, event.url.pathname);
						}
					});
				}

				const { data, error: upload_error } = await uploadFile(`${dir}/${hash}-${filename}`, fileBuffer);
				if (upload_error) {
					error = true;
					errors.push(upload_error);
				}
				console.log('upload file:', data, upload_error);
				const { files } = await getFiles(dir);
				return { message: data?.path ? `File '${filename}' uploaded!` : '', error, files, bucket, dir };
			} else {
				return { message: 'EMPTY FILE!', error: true, files, bucket, dir };
				//throw error(403, { message: 'EMPTY FILE' });
			}
		} catch (err) {
			console.error(err);
			const { files } = await getFiles(dir);
			return { message: errors.length>0 ? errors.join('<br>') : err.message, error: true, files, bucket, dir };
		}
	},

	delete: async (event) => {
		try {
			let dir = event.params?.path || PUBLIC_ENV.PUBLIC_FILES_CONTENT;
			const { session } = await getSupabase(event);
			if (!session) { // the user is not signed in
				throw error(403, { message: 'Unauthorized' });
			}
			const form_data = await event.request.formData();
			const path = form_data.get('path');
			console.log('delete path:', path);
			if (path) {
				const { data, error } = await deleteFiles(path);
				console.log('delete file:', data, error);
				const { files } = await getFiles(dir);
				return { message: data?.path ? `File deleted!` : '', error, files, bucket, dir };
			} else {
				return { message: 'PATH NOT FOUND!', error: true, files, bucket, dir };
				//throw error(403, { message: 'PATH NOT FOUND' });
			}
		} catch (err) {
			console.error(err);
			const { files } = await getFiles(dir);
			return { message: err.message, error: true, files, bucket, dir };
		}
	},
};
