<Item href="javascript:void(0)" class="aside-menu-item" on:click={setActive} activated={activeMenuId === menu._id}>
	<span style={`margin-left : ${menu.depth * 25}px; height: 100%;`}></span>

	<Graphic class="material-icons" aria-hidden="true" >
		{#if menu.children.length > 0 && menu.open}
		<MinusCircleOutline></MinusCircleOutline>
		{:else if menu.children.length > 0 && !menu.open}
		<PlusCircleOutline></PlusCircleOutline>
		{/if}
	</Graphic>
	
	<Text>{menu.name}</Text>
</Item>

<script>
	import { Item, Text, Graphic } from '@smui/list';
	import PlusCircleOutline from 'svelte-material-icons/PlusCircleOutline.svelte';
	import MinusCircleOutline from 'svelte-material-icons/MinusCircleOutline.svelte';
	import { location, push } from 'svelte-spa-router';
	import { createEventDispatcher } from 'svelte';

	export let menu;
	export let activeMenuId;

	const dispatch = createEventDispatcher();

	const setActive = () => {
		let url = `/${menu.name}`;
		let temp = menu;
		while (temp.parent) {
			temp = temp.parent;
			url = `/${temp.name}${url}`;
		}

		if (decodeURIComponent($location) === url) {
			if (menu.children.length > 0) {
				dispatch('toggle');
			}
		} else {
			push(url);
		}
	};
</script>

<style>
	:global(.aside-menu-item .material-icons) {
		margin-right: 8px;
	}
	:global(.aside-menu-item .material-icons *) {
		width: 0.7em;
		height: 0.7em;
	}
</style>