{#if articles.length > 0}
<Content>
	<DataTable stickyHeader table$aria-label="User list" style="width: 100%;">
		<Head>
			<Row>
				<Cell checkbox><Checkbox /></Cell>
				<Cell>부모 메뉴</Cell>
				<Cell>Title</Cell>
			</Row>
		</Head>
		<Body>
			{#each articles as article}
			<Row>
				<Cell checkbox><Checkbox bind:group={selected} value={article} valueKey={article._id} /></Cell>
				<Cell>{getAllParentsNames(article.parent)}</Cell>
				<Cell style="width: 100%;">{article.title}</Cell>
			</Row>
			{/each}
		</Body>
	  </DataTable>
</Content>
{:else}
<Content>
	<em>검색 결과가 읍슴다~</em>
</Content>
{/if}

<script>
	import { Content } from '@smui/card';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  	import Checkbox from '@smui/checkbox';
	import { createEventDispatcher } from 'svelte';

	import menu from '../../store/menu.js';

	const dispatch = createEventDispatcher();

	export let articles = [];

	let selected = [];

	const menuMap = new Map();

	const makeMenuMap = () => {
		let arr = [...$menu];

 		while (arr.length > 0) {
			const current = arr.shift();

			menuMap.set(current._id, current);

			arr = [...arr, ...current.children];
		}
	};

	const getAllParentsNames = _id => {
		if (menuMap.size === 0) {
			makeMenuMap();
		}

		const target = menuMap.get(_id);

		if (!target) {
			return '';
		}

		let str = '';

		let temp = target;
		while (temp) {
			str = `${temp.name}${str.length > 0 ? ' > ' : ''}${str}`;
			temp = temp.parent;
		}

		return str;
	};

	$: dispatch('select', { selected: selected });
</script>
