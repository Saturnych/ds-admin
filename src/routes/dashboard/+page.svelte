<script lang="ts">
	// import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { userId } from '$lib/stores';
	import PUBLIC_ENV from '$lib/public';
	import WeatherChart from '$lib/components/dashboard/WeatherChart.svelte';
	import { toast, Toast } from '$lib/components/Toast';
	import type { PageData } from './$types';

	export let data: PageData;
	$: session = data?.session;
	console.log('dashboard/page session.user.email:', session?.user?.email);

	const action = () => {
		toast.push('TOAST!', { classes: ['alert-success'] });
	};
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<!--
<div class="alert alert-success shadow-lg mb-5">
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Welcome to {PUBLIC_ENV.PUBLIC_APP_NAME}!</span>
	</div>
</div>
//-->
