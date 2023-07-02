<script lang="ts">
	import GamesTable from '$lib/components/dashboard/GamesTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<GamesTable games={data.games} error={data.error} />
