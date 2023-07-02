<script lang="ts">
	import SvelteTable from 'svelte-table';
	export let cronjobs: Array<any> = [];
	export let error: string = '';

	const columns = [
		{
			key: 'jobname',
			title: 'jobname',
			value: (v) => v.jobname,
			sortable: true
		},
		{
			key: 'command',
			title: 'uri',
			value: (v) => {
				let uri = v.command.split(`http_get(`)[1];
				uri = uri.split(`)`)[0];
				uri = uri.split(`'`)[1];
				return uri;
			},
			sortable: false
		},
		{
			key: 'schedule',
			title: 'schedule',
			value: (v) => {
				let schedule = 'error';
				switch (v.schedule) {
					case '* * * * *':
						schedule = 'every minute';
					break;
					case '0 * * * *':
						schedule = 'every hour';
					break;
					case '0 0 * * *':
						schedule = 'every day';
					break;
					default:
						schedule = 'custom';
					break;
				}
				return schedule;
			},
			sortable: false
		}
	];

	//console.log(cronjobs);
</script>

<SvelteTable
	{columns}
	rows={cronjobs}
	classNameTable={['table table-compact table-zebra']}
	classNameRow="hover cursor-pointer"
/>
