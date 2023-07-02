<script lang="ts">
	import { page } from '$app/stores';
	import PUBLIC_ENV from '$lib/public';
</script>

<svelte:head>
	<title>{$page.status}: {$page.error.message}</title>
</svelte:head>

<h1>{$page.status}: {$page.error.message}</h1>
