<script lang="ts">
	import CronjobTable from '$lib/components/dashboard/CronjobTable.svelte';
	import { Link2Icon } from 'svelte-feather-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<CronjobTable cronjobs={data.cronjobs} error={data.error} />
