<script lang="ts">
	import SvelteTable from 'svelte-table';

	export let contents: Array<any> = [];
	export let error: string = '';
	console.log('error:', error);

	const columns = [
		{
			key: 'jobname',
			title: 'jobname',
			value: (v) => v.jobname,
			sortable: true
		},
		{
			key: 'uri',
			title: 'uri',
			value: (v) => v.uri,
			sortable: true
		},
		{
			key: 'status',
			title: 'status',
			value: (v) => v.status,
			sortable: true
		},
		{
			key: 'created',
			title: 'created',
			value: (v) => v.created_at,
			sortable: true
		}
	];


</script>

<SvelteTable
	{columns}
	rows={contents}
	classNameTable={['table table-compact table-zebra']}
	classNameRow="hover cursor-pointer"
/>
