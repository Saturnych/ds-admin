<script lang="ts">
	import PUBLIC_ENV from '$lib/public';
	import { page } from '$app/stores';
	import { AlertTriangleIcon } from 'svelte-feather-icons';
	const role = $page.data.session?.user.role ?? '';
</script>

{#if PUBLIC_ENV.PUBLIC_DEMO_MODE == 'true'}
	{#if role != 'user'}
		<div
			class="w-full alert alert-warning shadow-lg mb-3"
			class:bg-warning={role == 'admin'}
			class:bg-accent={role == 'super'}
		>
			<div>
				<AlertTriangleIcon />
				<span>You are {role.toUpperCase()}!</span>
			</div>
		</div>
	{/if}
{/if}
