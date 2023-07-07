<script lang="ts">
	import SvelteTable from 'svelte-table';
	export let users: Array<any> = [];

	const columns = [
		{
			key: 'firstname',
			title: 'Firstname',
			value: (v) => v.firstname,
			sortable: true
		},
		{
			key: 'lastname',
			title: 'Lastname',
			value: (v) => v.lastname,
			sortable: true
		}
	];
</script>

<!-- https://svelte.dev/repl/8b2264e66d9a456abeb5f2b9322605f7?version=3.49.0 -->
<SvelteTable
	{columns}
	rows={users}
	classNameTable={['table table-compact table-zebra']}
	classNameRow="hover cursor-pointer"
/>
