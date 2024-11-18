<script lang="ts">
	// import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { userId } from '$lib/stores';
	import PUBLIC_ENV from '$lib/public';
	import { toast, Toast } from '$lib/components/Toast';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('dashboard/page session.user.email:', data.location);

	const action = () => {
		toast.push('TOAST!', { classes: ['alert-success'] });
	};
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>


<div class="alert alert-success shadow-lg mb-5">
	<div>
		<span>Welcome to {PUBLIC_ENV.PUBLIC_APP_NAME}!</span>
	</div>
</div>
