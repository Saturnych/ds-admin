<script lang="ts">
	import Time from 'svelte-time';
	import { TrashIcon } from 'svelte-feather-icons';
	import type { AnyObject } from 'chart.js/types/basic';
	import PUBLIC_ENV from '$lib/public';

	export let files: Array<any>;
	export let bucket = PUBLIC_ENV.PUBLIC_FILES_BUCKET; // 'buzzpublicbucket';
	export let dir = PUBLIC_ENV.PUBLIC_FILES_CONTENT; // 'content';

	const bucketUri = `${PUBLIC_ENV.PUBLIC_SUPABASE_URL}${PUBLIC_ENV.PUBLIC_FILES_BASEPATH}/${bucket}/${dir}`;

	let current_file: AnyObject = {};

	const updateFile = (file: AnyObject) => {
		current_file = file;
		if (PUBLIC_ENV.DEV) console.log('current_file:', current_file);
	}

	const cleanFilename = (filename?: string): string => {
		return !!filename ? filename.split('-').slice(1).join('-') : filename;
	}
</script>

<table class="table w-full">
	<thead>
		<tr>
			<th>num</th>
			<th>filename</th>
			<th>filesize</th>
			<th>created at</th>
			<th>updated at</th>
			<th>&nbsp;</th>
		</tr>
	</thead>
	<tbody>
		{#each files as file, i}
			<tr>
				<td>
					{i+1}
				</td>
				<td>
					<a id="{file.id}" href="{bucketUri}/{file.name}" target="_blank">{cleanFilename(file.name)}</a>
				</td>
				<td>
					{file.metadata.size}
				</td>
				<td>
					<Time timestamp={file.created_at} />
				</td>
				<td>
					<Time timestamp={file.updated_at} />
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<label
						on:click={updateFile(file)}
						for="delete-modal"
						class="btn btn-ghost btn-circle modal-button"
					>
						<TrashIcon class="stroke-warning" />
					</label>
				</td>
			</tr>
		{/each}
	</tbody>
	<!-- foot -->
	<tfoot />
</table>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="delete-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Are you sure?</h3>
		<p class="py-4">You are going to delete <span class="font-bold">{cleanFilename(current_file?.name)}</span></p>
		<form method="POST" action="?/delete">
			<input name="path" value="{dir}/{current_file?.name}" hidden />
			<div class="modal-action">
				<label for="delete-modal" class="btn">CANCEL</label>
				<button class="btn btn-warning">DELETE</button>
			</div>
		</form>
	</div>
</div>
