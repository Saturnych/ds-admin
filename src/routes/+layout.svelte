<script lang="ts">
	import '../app.postcss';
	import { setContext, onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { userId, accessToken } from '$lib/stores';
	import { io } from '$lib/io';
	import PUBLIC_ENV from '$lib/public';

	export let data: LayoutData;
	if (PUBLIC_ENV.DEV) console.log('layout data:', data.session, 'io.connected:', io?.connected);

  $: userId.set(data.session?.userId || '');
	// ...and add it to the context for child components to access
	setContext('userId', userId);

	$: accessToken.set(data.session?.accessToken || '');
	// ...and add it to the context for child components to access
	setContext('accessToken', accessToken);

	let messages = [];
	let textfield = '';
  let username = '';

	function sendMessage() {
    const message = textfield.trim();
    if (!message) return;
    textfield = '';
    if (io?.connected) io.emit('message', message);
  }

	onMount(() => {
		try {
			if (PUBLIC_ENV.DEV) console.info('io.connected:', io?.connected, `accessToken:`, accessToken.get());
			if (io?.connected) {
				io.on('message', (message) => {
					if (PUBLIC_ENV.DEV) console.info(`io.on('message'):`, message);
					messages = [...messages, message];
	      });
	      io.on('name', (name) => {
	        if (PUBLIC_ENV.DEV) console.info(`io.on('name'):`, name);
					username = name;
	      });
			}
		} catch (err) {
			console.error(err);
		}
	});
</script>

<slot />
