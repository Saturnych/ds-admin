<script>
	import FileTableAdmin from '$lib/components/dashboard/FileTableAdmin.svelte';
	import { toast } from '$lib/components/Toast';
	import { PlusIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { isAdmin, isSuper } from '$lib/utils';

	/** @type {import('./$types').PageData} */
	export let data;
	console.log('data:', data);

	/** @type {import('./$types').ActionData} */
	export let form;
	console.log('form:', form);

	const error = data?.error || form?.error || null;
	const message = data?.message || form?.message || '';

	if (error) {
		toast.push(!!message ? message : 'Error!', { classes: ['alert-error'] });
	} else if (!!message) {
		toast.push(message, { classes: ['alert-success'] });
	}

	const role = $page.data.session.user.role ?? '';

	let whisper = '1';
	let filename = '';
	let fileInput;
	let files;
	const getFileData = (file) => {
		if (file) filename = file.name.replaceAll(' ','_');
		//if (!!filename) toast.push(filename, { classes: ['alert-success'] });
	};
</script>

{#if !!message}
<!--
	<div class="toast toast-top z-10">
		<div class="alert alert-success" class:alert-error={error}>
			<div>
				<span>{message}</span>
			</div>
		</div>
	</div>
//-->
{/if}

{#if isAdmin(role) || isSuper(role)}

<!-- The button to open modal -->
<div class="flex justify-end">
	<label for="add-file-modal" class="my-5 btn btn-warning">
		<PlusIcon class="mr-2 h-4 w-4" />
		add file</label
	>
</div>

<div class="card flex-col lg:flex-row bg-base-300 shadow-xl">
	<div class="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 overflow-y-scroll">
		<FileTableAdmin files={data.files} dir={data.dir} />
	</div>
</div>

<!-- ADD FILE MODAL -->
<input type="checkbox" id="add-file-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="?/create" enctype="multipart/form-data">
			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">File Name</span>
				</label>
				<input
					id="filename"
					name="filename"
					class="input input-bordered"
					type="text"
					placeholder="file name"
					bind:value={filename}
				/>
			</div>

			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">File Upload</span>
				</label>
				<input
					id="file"
					name="file"
					class="input input-bordered"
					type="file"
					bind:files bind:this={fileInput} on:change={() => getFileData(files[0])}
					required
				/>
			</div>

			{#if data.dir == 'whisper'}
			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Whisper File</span>
					<input type="checkbox" id="whisper" name="whisper" bind:value={whisper} checked />
				</label>
			</div>
			{/if}

			<div class="form-control mt-6">
				<!-- {#if form}
					<button class="btn loading btn-primary btn-warning" />
				{:else} -->
				<button class="btn btn-primary btn-warning">SUBMIT</button>
				<!-- {/if} -->
			</div>

			<div class="form-control mt-6 modal-action">
				<label for="add-file-modal" class="btn">CANCEL</label>
			</div>
		</form>
	</div>
</div>

{/if}
