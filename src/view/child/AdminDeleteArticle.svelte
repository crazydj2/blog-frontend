
<Content style="display: flex; align-items: center;">
	<Textfield bind:value={name} label="글 제목" required></Textfield>
	<Button style="margin-left: 30px;" on:click={ search } variant="raised"><Label>검색</Label></Button>
</Content>

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
	검색 결과가 읍슴다~
</Content>
{/if}

<Content>
	<Group variant="unelevated" style="display: flex; justify-content: stretch;">
		<Button color="secondary" on:click={ deleteTargets } variant="raised" style="flex-grow: 1;"><Label>글 삭제</Label></Button>
	</Group>
</Content>

<script>
	import Button, { Group, Label } from '@smui/button';
	import { Content } from '@smui/card';
	import Textfield from '@smui/textfield';
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  	import Checkbox from '@smui/checkbox';

	import { getArticle, deleteArticle } from '../../api/article.js';

	import menu from '../../store/menu.js';


	let name = '';

	let articles = [];

	let selected = [];

	const menuMap = new Map();

	const search = async () => {
		const response = await getArticle({keyword: name});

		articles = response?.data || [];
	};

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

	const deleteTargets = async () => {
		console.log(selected);
		if (selected.length === 0) {
			alert('삭제할 글 선택하숑~');
			return;
		}

		const response = await deleteArticle({ _id: selected.map(s => s._id) });

		if (response?.success) {
			alert(`"${name}" 메뉴 생성에 성공하였습니다.`);
			
			search();
		} else {
			alert(`글 삭제에 실패하였습니다.`);
		}
	};


</script>
