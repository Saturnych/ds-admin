<script lang="ts">
	import '../app.postcss';
	import { setContext, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { userId, accessToken } from '$lib/stores';
	import PUBLIC_ENV from '$lib/public';

	export let data: LayoutData;
	
	/*
	$: userId.set(data.session?.userId || '');
	// ...and add it to the context for child components to access
	setContext('userId', userId);

	$: accessToken.set(data.session?.accessToken || '');
	// ...and add it to the context for child components to access
	setContext('accessToken', accessToken);
	*/

	if (PUBLIC_ENV.DEV) console.log('layout data.session.userId:', data.session.userId, 'userId:', userId.get());
</script>

<slot />
