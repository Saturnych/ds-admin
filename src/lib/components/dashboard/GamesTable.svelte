<script lang="ts">
	import SvelteTable from 'svelte-table';

	export let games: Array<any> = [];
	export let error: string = '';
	console.log('error:', error);

	const columns = [
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
