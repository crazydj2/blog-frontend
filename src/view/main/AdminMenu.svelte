<h1>메뉴 추가</h1>

<div class="card-container">
	<h3>부모 메뉴 선택</h3>
	<Card variant="outlined">
		<Content>
			<div class="card-content-container">
				{#each parents as parent, i}
				<div>
					<MenuSelect menus={parent.list} depth={i} change={changeParent}></MenuSelect>
				</div>
				{/each}
			</div>
			<pre class="status"><h2>선택된 부모 메뉴 : { selectedParents() }</h2></pre>
		</Content>
		<Actions>
			<Button on:click={ () => init("parent") } variant="raised"><Label>초기화</Label></Button>
		</Actions>
	</Card>
</div>

<div class="card-container">
	<h3>메뉴 정보 입력</h3>
	<Card variant="outlined">
		<Content>
			<div class="card-content-container">
				<div>
					<Textfield bind:value={name} label="메뉴명" required>
						<HelperText slot="helper">메뉴명을 입력해주세용.</HelperText>
					</Textfield>
				</div>
			</div>
		</Content>
		<Actions>
			<Button on:click={ () => init("info") } variant="raised"><Label>초기화</Label></Button>
		</Actions>
	</Card>
</div>

<div class="card-container">
	<Button color="secondary" on:click={ addMenu } variant="raised"><Label>메뉴 추가</Label></Button>
	<Button color="secondary" on:click={ () => push("/admin/article") } variant="raised"><Label>글 추가로 이동</Label></Button>
</div>



<script>
    import { push } from 'svelte-spa-router';
	import Button, { Label } from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	import MenuSelect from './MenuSelect.svelte';

	// temp data
	// const menus = [
	// 	{name: 'menu 1', _id: 'menu 1'},
	// 	{name: 'menu 2', _id: 'menu 2', children: [
	// 		{name: 'menu 2 1', _id: 'menu 2 1', parent: 'menu 2'},
	// 		{name: 'menu 2 2', _id: 'menu 2 2', parent: 'menu 2'},
	// 		{name: 'menu 2 3', _id: 'menu 2 3', parent: 'menu 2', children: [
	// 			{name: 'menu 2 3 1', _id: 'menu 2 3 1', parent: 'menu 2 3'},
	// 			{name: 'menu 2 3 2', _id: 'menu 2 3 2', parent: 'menu 2 3'},
	// 			{name: 'menu 2 3 3', _id: 'menu 2 3 3', parent: 'menu 2 3', children: [
	// 				{name: 'menu 2 3 3 1', _id: 'menu 2 3 3 1', parent: 'menu 2 3 3'},
	// 				{name: 'menu 2 3 3 2', _id: 'menu 2 3 3 2', parent: 'menu 2 3 3'},
	// 				{name: 'menu 2 3 3 3', _id: 'menu 2 3 3 3', parent: 'menu 2 3 3'},
	// 			]},
	// 		]},
	// 	]},
	// 	{name: 'menu 3', _id: 'menu 3'},
	// ];

	// let parents = [{list: menus, select: null}];
	let parents = [];

	let name = '';

	$: selectedParents = () => {
		let str = '';
		parents.map(parent => {
			if (!parent.select || !parent.select.name) {
				return;
			}

			if (str) {
				str += ' > ';
			}

			str += parent.select.name;
		});

		if (!str) {
			str = '없음';
		}

		return str;
	};

	const changeParent = (value, depth) => {
		if (!value) {
			return;
		}

		parents = parents.slice(0, depth + 1);

		parents[depth].select = value;

		if (value.children && value.children.length > 0) {
			parents.push({list: [...value.children], select: null});
		}
		
	};

	const init = value => {
		if (value === 'parent' && parents.length > 0) {
			parents = [{list: menus, select: null}];
		}

		if (value === 'info') {
			name = '';
		}
	};

	const addMenu = () => {
		alert('데이터 유효성 체크 후 ajax 콜');
	};
</script>

<style>
	.card-container {
		margin-bottom: 40px;
	}

	.card-content-container {
		display: flex;
    	flex-wrap: wrap;
	}

	.card-content-container > div {
		flex-basis: 0px;
		min-width: 245px;
		margin-right: 12px;
	}

	.card-content-container > div h2 {
		color: orange;
	}
</style>