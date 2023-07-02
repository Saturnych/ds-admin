<script>
	import ContentTable from '$lib/components/dashboard/ContentTable.svelte';
	import { Link2Icon } from 'svelte-feather-icons';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ContentTable contents={data.contents} error={data.error} />
