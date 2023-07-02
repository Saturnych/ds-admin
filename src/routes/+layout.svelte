<script lang="ts">
	import '../app.postcss';
	import { setContext, onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
  import { userId } from '$lib/stores';

	export let data: LayoutData;
	console.log('layout data:', data.session?.user?.email);

  $: userId.set(data.userId);
	// ...and add it to the context for child components to access
	setContext('userId', userId);

	onMount(() => {
		try {
			//const {	data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
			//	invalidate('supabase:auth');
			//});
			//return () => {
			//	subscription.unsubscribe();
			//};
		} catch (err) {
			console.error(err);
		}
	});
</script>

<slot />
