<script lang="ts">
	import type { PageData } from './$types';
	import { toast, Toast } from '$lib/components/Toast';
	import RoleBadge from '$lib/components/dashboard/RoleBadge.svelte';

	export let data: PageData;
	// console.log(data);

	const user = data.session?.user;

	const action = () => {
		toast.push('SAVED!', { classes: ['alert-success'] });
	};
</script>

<form class="w-full max-w-sm" method="POST" action="?/save">
	<div class="md:flex md:items-center mb-6 form-control">
		<label class="input-group">
			<span class="md:w-1/3 mr-1">Email</span>
			<input type="text" value={user?.email} disabled class="input input-bordered md:w-2/3 " />
		</label>

		<label class="input-group pt-2 pb-5">
			<span class="md:w-1/3 mr-1">First Name</span>
			<input
				type="text"
				name="firstname"
				value={user?.firstname}
				class="input input-bordered md:w-2/3"
			/>
		</label>

		<label class="input-group pt-2 pb-5">
			<span class="md:w-1/3 mr-1">Last Name</span>
			<input
				type="text"
				name="lastname"
				value={user?.lastname}
				class="input input-bordered md:w-2/3"
			/>
		</label>

		<input type="submit" value="SAVE" class="btn btn-primary w-full" on:click={action} />
	</div>
</form>
