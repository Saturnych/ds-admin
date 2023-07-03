<script lang="ts">
	import Time from 'svelte-time';
	import { TrashIcon } from 'svelte-feather-icons';
	
	export let influencers: any[] = [];
	let current: any = {};
	function update(usr: any): any {
		current = usr;
	}
</script>

<table class="table w-full">
	<thead>
		<tr>
			<th>name</th>
			<th>cost</th>
			<th>created</th>
			<th>platforms</th>
		</tr>
	</thead>
	<tbody>
		{#each influencers as influencer}
			<tr>
				<td>
					{influencer.name}
				</td>
				<td>
					${Math.round(influencer.cents/100)}
				</td>
				<td>
					<Time timestamp={influencer.createdAt} />
				</td>
				<td>
					{@html influencer.platforms}
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<label
						on:click={update(influencer)}
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
		<p class="py-4">You are going to delete <span class="font-bold">{current?.name}</span></p>
		<form method="POST" action="?/delete">
			<input name="id" value={current?.id} hidden />
			<div class="modal-action">
				<label for="delete-modal" class="btn">CANCEL</label>
				<button class="btn btn-warning">DELETE</button>
			</div>
		</form>
	</div>
</div>
