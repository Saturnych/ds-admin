<script>
	import CronjobTable from '$lib/components/dashboard/CronjobTable.svelte';
	import { Link2Icon } from 'svelte-feather-icons';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<CronjobTable cronjobs={data.cronjobs} error={data.error} />
