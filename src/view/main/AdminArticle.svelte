<h1>글 추가</h1>

<div class="card-container">
	<h3>메뉴 선택</h3>
	<Card variant="outlined">
		<Content>
			<div class="card-content-container">
				{#each parents as parent, i}
				<div>
					<MenuSelect menus={parent.list} depth={i} on:change={changeParent} initTime={parents.initTime}></MenuSelect>
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
	<Button color="secondary" on:click={ addArticle } variant="raised"><Label>글 추가</Label></Button>
	<Button color="secondary" on:click={ () => push("/admin/menu") } variant="raised"><Label>메뉴 추가로 이동</Label></Button>
</div>

<script>
    import { push } from 'svelte-spa-router';
	import Button, { Label } from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';

	import MenuSelect from '../child/MenuSelect.svelte';

	import menu from '../../store/menu.js';

	let parents = [];

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

	const changeParent = (event) => {
		const { value, depth } = event.detail;

		if (!value) {
			return;
		}

		const initTime = parents.initTime;

		parents = parents.slice(0, depth + 1);
		parents.initTime = initTime;
		parents[depth].select = value;

		if (value.children && value.children.length > 0) {
			parents.push({list: [...value.children], select: null});
		}
		
	};

	const init = value => {
		if (value === 'parent') {
			parents = [{list: $menu, select: null}];
			parents.initTime = (new Date()).getTime();
		}

		if (value === 'info') {
			name = '';
		}
	};

	menu.subscribe(value => {
		init('parent');
	});

	const addArticle = () => {
		alert('잇힝~');
	}
</script>


