<script lang="ts">
	import { page } from '$app/stores';
	import { userId } from '$lib/stores';
	import PUBLIC_ENV from '$lib/public';

	let uid;
	userId.subscribe((id) => {
		if (PUBLIC_ENV.DEV) console.log('userId:', id);
		uid = id;
	});

	$: session = $page.data?.session;
	if (PUBLIC_ENV.DEV) console.log('page.svelte $page.data:', $page.data, uid);
</script>

<div class="container mx-auto">
	<div class="navbar bg-neutral">
		<div class="flex-none" />
		<div class="flex-1 ml-5">
			<a href="/" class="text-xl">{PUBLIC_ENV.PUBLIC_APP_NAME}</a>
		</div>
		<div class="flex-none">
			<a href="/auth" role="button" class="btn btn-sm btn-primary">Sign In</a>
		</div>
	</div>
</div>
