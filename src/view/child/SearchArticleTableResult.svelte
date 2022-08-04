{#if articles.length > 0}
<Content>
	<DataTable table$aria-label="User list" style="width: 100%;">
		<Head>
			<Row>
				{#if isRadio}
				<Cell></Cell>
				{:else}
				<Cell checkbox><Checkbox /></Cell>
				{/if}
				<Cell>제목</Cell>
				<Cell>부모 메뉴</Cell>
				<Cell>생성일시</Cell>
			</Row>
		</Head>
		<Body>
			{#each articles as article, i}
			<Row>
				{#if isRadio}
				<Cell><Radio bind:group={selected} value={article} /></Cell>
				{:else}
				<Cell checkbox><Checkbox bind:group={selected} value={article} valueKey={article._id}
					/></Cell>
				{/if}
				<Cell style="width: 100%;">{article.title}</Cell>
				<Cell>{getAllParentsNames(article.parent)}</Cell>
				<Cell>{getCreatedString(article.created)}</Cell>
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
	import Radio from '@smui/radio';
	import { createEventDispatcher } from 'svelte';

	import menu from '../../store/menu.js';

	const dispatch = createEventDispatcher();

	export let articles = [];
	export let isRadio = false;

	let selected = isRadio ? null : [];

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

	const getCreatedString = created => {
		const date = new Date(created);

		return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
	};

	$: dispatch('select', { selected: selected });

	export function reset() {
		selected = isRadio ? null : [];
	}
</script>
