<script lang="ts">
	import InfluencerTableAdmin from '$lib/components/dashboard/InfluencerTableAdmin.svelte';
	import { PlusIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { isAdmin, isSuper } from '$lib/utils';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	console.log('influencers data:', data);
	export let form: ActionData;

	const role = $page.data.session.user.role ?? '';
	console.log('influencers role:', role);
</script>

{#if form}
	<div class="toast toast-top z-10">
		<div class="alert alert-success" class:alert-error={form.error}>
			<div>
				<span>{form.message}</span>
			</div>
		</div>
	</div>
{/if}

{#if isSuper(role) || isAdmin(role)}

<!-- The button to open modal -->
<div class="flex justify-end">
	<label for="add-user-modal" class="my-5 btn btn-warning">
		<PlusIcon class="mr-2 h-4 w-4" />
		add influencer</label
	>
</div>

<div class="card flex-col lg:flex-row bg-base-300 shadow-xl">
	<div class="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 overflow-y-scroll">
		<InfluencerTableAdmin influencers={data.influencers?.list || []} />
	</div>
</div>

<!-- ADD USER MODAL -->
<input type="checkbox" id="add-user-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="?/create">

			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Platform</span>
				</label>
				<select id="origin" name="origin" class="select select-bordered">
					<option>Select Platform</option>
					<option value="youtube" selected>youtube</option>
					<option value="instagram">instagram</option>
					<option value="twitter">twitter</option>
				</select>
			</div>

			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Influencer USD Cost</span>
				</label>
				<input
					autocomplete="cost"
					id="cost"
					name="cost"
					class="input input-bordered"
					type="text"
					placeholder="cost"
					required
				/>
			</div>

			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Influencer Name</span>
				</label>
				<input
					autocomplete="name"
					id="name"
					name="name"
					class="input input-bordered"
					type="text"
					placeholder="name"
					required
				/>
			</div>

				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Nickname</span>
					</label>
					<input
						autocomplete="nickname"
						id="nickname"
						name="nickname"
						class="input input-bordered"
						type="text"
						placeholder="nickname"
						required
					/>
				</div>

				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Avatar URI</span>
					</label>
					<input
						autocomplete="avatar"
						id="avatar"
						name="avatar"
						class="input input-bordered"
						type="text"
						placeholder="avatar"
						required
					/>
				</div>

				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Page ID</span>
					</label>
					<input
						autocomplete="id_str"
						id="id_str"
						name="id_str"
						class="input input-bordered"
						type="text"
						placeholder="id_str"
						required
					/>
				</div>

			<div class="form-control mt-6">
				<!-- {#if form}
					<button class="btn loading btn-primary btn-warning" />
				{:else} -->
				<button class="btn btn-primary btn-warning">SUBMIT</button>
				<!-- {/if} -->
			</div>

			<div class="form-control mt-6 modal-action">
				<label for="add-user-modal" class="btn">CANCEL</label>
			</div>
		</form>
	</div>
</div>

{/if}
