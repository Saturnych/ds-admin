<script lang="ts">
	import UserTableAdmin from '$lib/components/dashboard/UserTableAdmin.svelte';
	import { PlusIcon } from 'svelte-feather-icons';
	import { page } from '$app/stores';
	import { isAdmin, isSuper } from '$lib/utils';

	export let data: PageData;
	export let form: ActionData;

	const role = $page.data.session.user.role ?? '';
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

{#if isSuper(role)}

<!-- The button to open modal -->
<div class="flex justify-end">
	<label for="add-user-modal" class="my-5 btn btn-warning">
		<PlusIcon class="mr-2 h-4 w-4" />
		add user</label
	>
</div>

<div class="card flex-col lg:flex-row bg-base-300 shadow-xl">
	<div class="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 overflow-y-scroll">
		<UserTableAdmin users={data.users?.list || []} />
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
					<span class="label-text">Email</span>
				</label>
				<input
					autocomplete="email"
					id="email"
					name="email"
					class="input input-bordered"
					type="email"
					placeholder="email"
					required
				/>
			</div>

			<div class="form-control">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<!-- <input type="text" placeholder="password" class="input input-bordered" /> -->
				<input
					autocomplete="current-password"
					id="password"
					name="password"
					class="input input-bordered"
					type="password"
					placeholder="password"
					required
				/>
			</div>

			<!-- ONLY SUPER CAN ADD USERS TO ANY ORG -->
			{#if role == 'SUPER'}
				<div class="form-control">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="label-text">Role</span>
					</label>
					<select id="role" name="role" class="select select-bordered">
						<option>Select Role</option>
						<option value="USER" selected>User</option>
						<option value="ADMIN">Admin</option>
					</select>
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
				<label for="add-user-modal" class="btn">CANCEL</label>
			</div>
		</form>
	</div>
</div>

{/if}
