<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { themeChange } from 'theme-change';
	import type { LayoutData } from './$types';
	import DashboardMenu from '$lib/components/dashboard/DashboardMenu.svelte';
	import DashboardNavBar from '$lib/components/dashboard/DashboardNavBar.svelte';
	import { Toast } from '$lib/components/Toast';
	import { navigating } from '$app/stores';
	import { userId, accessToken } from '$lib/stores';
	import { io } from '$lib/io';
	import PUBLIC_ENV from '$lib/public';

	//export let data: LayoutData;

	let messages = [];
	let textfield = '';
  let username = '';

	function sendMessage() {
    const message = textfield.trim();
    if (!message) return;
    textfield = '';
    if (io?.connected) io.emit('message', message);
  }

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
		try {
			if (PUBLIC_ENV.DEV) console.info('io.connected:', io?.connected, `accessToken:`, (accessToken.get() || '').length);
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

<section id="body" class="flex flex-row h-screen">
	<Toast />
	<DashboardMenu />

	<div class="flex flex-col w-full">
		<DashboardNavBar />
		<!-- CONTENT -->
		<div class="w-full h-full p-5 overflow-auto">
			{#if $navigating}
				<div class="flex h-full items-center justify-center">
					<Jumper size="60" unit="px" duration="1s" />
				</div>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</section>
