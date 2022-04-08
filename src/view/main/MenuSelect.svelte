<Select key={(menu) => `${(menu && menu._id) || ''}`} bind:value={value} label={`${depth + 1}뎁스`} >
	<Option value='선택 안함' />
	{#each menus as menu}
	<Option value={menu}>{menu.name}</Option>
	{/each}
</Select>

<script>
	import Select, { Option } from '@smui/select';

	export let menus;

	export let depth;

	export let change;

	let value;

	$: change(value, depth);
</script>