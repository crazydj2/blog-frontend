<Select key={(menu) => `${(menu && menu._id) || ''}`} bind:value={value} label={`${depth + 1}뎁스`} >
	<Option value='선택 안함' />
	{#each menus as menu}
	<Option value={menu}>{menu.name}</Option>
	{/each}
</Select>

<script>
	import Select, { Option } from '@smui/select';
	import { createEventDispatcher } from 'svelte';

	export let depth;
	export let menus;

	// value reset 용
	export let initTime;

	let value;

	const dispatch = createEventDispatcher();

	const changeValue = () => {
		dispatch('change', { value, depth });
	};

	const resetValue = () => {
		value = undefined;
	};

	$: changeValue(value);

	$: resetValue(initTime);
</script>