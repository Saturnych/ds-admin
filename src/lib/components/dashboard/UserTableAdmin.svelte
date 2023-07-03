<script lang="ts">
	import Time from 'svelte-time';
	import { TrashIcon } from 'svelte-feather-icons';
	import RoleBadge from '$lib/components/dashboard/RoleBadge.svelte';

	export let users: any[] = [];
	let current: any = {};
	function update(usr: any): any {
		current = usr;
	}
</script>

<table class="table w-full">
	<thead>
		<tr>
			<th>email</th>
			<th>role</th>
			<th>firstname</th>
			<th>created</th>
		</tr>
	</thead>
	<tbody>
		{#each users as user}
			<tr>
				<td>{user.email}</td>
				<td>
					<RoleBadge role={user.role} />
				</td>
				<td>
					{#if user.firstname}{user.firstname}{/if}
				</td>
				<td>
					<Time timestamp={user.createdAt} />
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if user.role!=='SUPER'}
					<label
						on:click={update(user)}
						for="delete-modal"
						class="btn btn-ghost btn-circle modal-button"
					>
						<TrashIcon class="stroke-warning" />
					</label>
					{/if}
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
		<p class="py-4">You are going to delete <span class="font-bold">{current?.email}</span></p>
		<form method="POST" action="?/delete">
			<input name="id" value={current?.id} hidden />
			<div class="modal-action">
				<label for="delete-modal" class="btn">CANCEL</label>
				<button class="btn btn-warning">DELETE</button>
			</div>
		</form>
	</div>
</div>
