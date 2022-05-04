<h1>메뉴 추가</h1>

<div class="card-container">
	<h3>부모 메뉴 선택</h3>
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

	import { getMenu, postMenu, patchMenu, deleteMenu } from '../../api/api.js';

	import menu from '../../store/menu.js';

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

	const addMenu = async () => {
		if (!name) {
			alert('메뉴명 입력하숑~');
			return;
		}

		let parent = null;

		for (let i = parents.length - 1; i >= 0; i--) {
			if (!!parents[i].select?._id) {
				parent = parents[i].select._id;
			}
		}
		
		const response = await postMenu({name, parent});

		if (response?.success) {
			alert(`${name} 메뉴 생성에 성공하였습니다.`);
			
			menu.reset();
			name = '';
		} else {
			alert(`${name} 메뉴 생성에 실패하였습니다.`);
		}
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