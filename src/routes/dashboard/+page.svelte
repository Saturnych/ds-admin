<script lang="ts">
	// import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { userId } from '$lib/stores';
	import PUBLIC_ENV from '$lib/public';
	import WeatherChart from '$lib/components/dashboard/WeatherChart.svelte';
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



<div class="card flex-col bg-base-100 shadow-xl">
	<div class="stats bg-primary text-primary-content">
		<div class="stat">
			<div class="stat-title">You are in</div>
			<div class="stat-value">{data.location?.region} ({data.location?.country_name})</div>
			<div class="stat-actions">
				<button on:click={action} class="btn btn-sm btn-success">Yes I DO!</button>
			</div>
		</div>

		<div class="stat">
			<div class="stat-title">Temperature in {data.location?.city}</div>
			<div class="stat-value">{data.weather?.current_weather?.temperature} ºC</div>
			<div class="stat-actions">
				<button class="btn btn-sm">i feel hot</button>
				<button class="btn btn-sm">i feel cold</button>
			</div>
		</div>
	</div>
</div>
<div class="card mt-5 p-3 bg-neutral shadow-xl">
	<h1 class="text-center text-2xl font-bold">Temperature forecast at {data.location?.city}</h1>
	<div><WeatherChart weather={data.weather} /></div>
</div>
