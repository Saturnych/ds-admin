<script lang="ts">
	import SvelteTable from 'svelte-table';
	import PUBLIC_ENV from '$lib/public';

	export let games: Array<any> = [];
	export let error: string = '';
	if (PUBLIC_ENV.DEV) console.log('error:', error);

	let i = 0;
	const columns = [
		{
			key: 'num',
			title: 'num',
			value: (v) => ++i,
			sortable: true
		},
		{
			key: 'name',
			title: 'name',
			value: (v) => v.name,
			sortable: true
		},
		{
			key: 'startDate',
			title: 'startDate',
			value: (v) => v.startDate,
			sortable: true
		},
		{
			key: 'endDate',
			title: 'endDate',
			value: (v) => v.endDate,
			sortable: true
		},
		{
			key: 'credits',
			title: 'credits',
			value: (v) => v.credits,
			sortable: true
		},
	];


</script>

<SvelteTable
	{columns}
	rows={games}
	classNameTable={['table table-compact table-zebra']}
	classNameRow="hover cursor-pointer"
/>
